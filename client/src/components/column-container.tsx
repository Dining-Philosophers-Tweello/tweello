import DeleteDialog from "@/components/delete-dialog";
import TaskCard from "@/components/task-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { requestOptions } from "@/hooks/requestOptions";
import { Column, Task } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import CreateTaskDialog from "./create-task-dialog";
import EditColumnDialog from "./edit-column-dialog";

interface Props {
  params: { workspaceId: string; boardId: string };
  column: Column;
  updateColumn: (id: string, name: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
  tasks: Task[];
}

function ColumnContainer(props: Props) {
  const { params, column, updateColumn, tasks, deleteTask, updateTask } = props;

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task._id);
  }, [tasks]);
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column._id,
      data: {
        type: "column",
        column,
      },
      disabled: editMode,
    });

  const handleDelete = () => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}/columns/${column._id}`,
      requestOptions("DELETE"),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .catch((error) => {
        console.error("Error deleting column:", error);
      });
  };

  return (
    <Card
      className="w-80 min-h-[25rem] bg-secondary flex flex-col"
      ref={setNodeRef}
    >
      <div className="flex flex-col ">
        {/*Header*/}
        <CardHeader className=" flex flex-row items-center justify-between bg-card rounded rounded-b-none p-3 border-2 border-secondary">
          <CardDescription onClick={() => setEditMode(true)}>
            <span className="text-muted-foreground text-base px-2 py-1 items-center justify-center">
              {!editMode && `${column.name}`}
              {editMode && (
                <input
                  className="w-full bg-transparent border-none focus:outline-none"
                  value={column.name}
                  onChange={(e) => updateColumn(column._id, e.target.value)}
                  autoFocus
                  onBlur={() => {
                    setEditMode(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") {
                      return;
                    }
                    setEditMode(false);
                  }}
                />
              )}
            </span>
          </CardDescription>
          <div>
            <EditColumnDialog params={props.params} columnData={column} />
            <DeleteDialog
              componentName={"Column"}
              handleDelete={handleDelete}
              variant="ghost"
              size="icon"
              className="!mt-0"
              color="grey"
            ></DeleteDialog>
          </div>
        </CardHeader>
      </div>
      {/*Content*/}
      <CardContent className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </CardContent>
      <CreateTaskDialog params={params} columnId={column._id} />
    </Card>
  );
}
export default ColumnContainer;
