"use client";

import ColumnContainer from "@/components/column-container";
import CreateColumnDialog from "@/components/create-column-dialog";
import DeleteDialog from "@/components/delete-dialog";
import EditBoardDialog from "@/components/edit-board-dialog";
import { Icons } from "@/components/icons";
import TaskCard from "@/components/task-card";
import { requestOptions } from "@/hooks/requestOptions";
import { Board, Task, nullBoard } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Board({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) {
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}`,
      requestOptions("GET"),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBoard(data);
      })
      .catch((error) => {
        setBoard(nullBoard);
        console.error("Error fetching board:", error);
      });
  });

  const handleDelete = () => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}`,
      requestOptions("DELETE"),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then(() => {
        router.replace(`/workspaces/${params.workspaceId}`);
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      const taskToMove = active.data.current.task;
      const targetColumn = over.data.current.column;

      fetch(
        `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}/columns/${taskToMove.columnId}/tasks/${taskToMove._id}`,
        requestOptions("PATCH", { newColumnId: targetColumn._id }),
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("Error moving task:", error);
        });
    }

    return;
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {board === nullBoard ? (
        <div className="flex items-center justify-center w-screen ">
          <div className="text-2xl text-gray-400">Board not found</div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-5 w-screen  ">
          <div className="flex flex-row gap-5">
            <div className="text-4xl font-bold">{board.name}</div>
            <EditBoardDialog
              boardName={board.name}
              boardDescription={board.description}
              params={params}
            />
            <DeleteDialog componentName={"Board"} handleDelete={handleDelete} />
          </div>
          <div className="font-light text-gray-500">{board.description}</div>
          <div className="flex gap-5">
            <div className="overflow-x-auto flex gap-2">
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <div className="flex gap-2">
                  {board.columns.map((column) => (
                    <ColumnContainer
                      params={params}
                      key={column._id}
                      column={column}
                    />
                  ))}
                </div>
                <div>
                  <CreateColumnDialog params={params}></CreateColumnDialog>
                </div>
                <DragOverlay>
                  {activeTask && (
                    <TaskCard
                      params={params}
                      columnId={"-1"}
                      task={activeTask}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
