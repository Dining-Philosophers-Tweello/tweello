import ColumnContainer from "@/components/column-container";
import CreateColumnDialog from "@/components/create-column-dialog";
import TaskCard from "@/components/task-card";
import { Column, Task } from "@/types";
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
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

export default function KanbanBoard({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column._id),
    [columns],
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <div className="overflow-x-auto flex gap-2">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-2">
            {columns.map((column) => (
              <ColumnContainer
                key={column._id}
                column={column}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createNewTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === column._id)}
              />
            ))}
          </div>
          <div>
            <CreateColumnDialog params={params}></CreateColumnDialog>
          </div>
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createNewTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn._id,
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );

  function deleteColumn(id: string) {
    const filteredColumns = columns.filter((column) => column._id !== id);
    setColumns(filteredColumns);

    const filteredTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(filteredTasks);
  }
  function updateColumn(id: string, name: string) {
    const newColumns = columns.map((column) => {
      if (column._id !== id) return column;
      return { ...column, name };
    });
    setColumns(newColumns);
  }
  function createNewTask(columnId: string) {
    const newTask: Task = {
      _id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }
  function updateTask(id: string, content: string) {
    const newTasks = tasks.map((task) => {
      if (task._id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }
  function deleteTask(id: string) {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
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

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // dropping a task over another task
    if (isActiveTask && isOverATask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task._id === activeId,
        );
        const overTaskIndex = tasks.findIndex((task) => task._id === overId);

        if (tasks[activeTaskIndex].columnId != tasks[overTaskIndex].columnId) {
          tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;
          return arrayMove(tasks, activeTaskIndex, overTaskIndex - 1);
        }

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "column";

    // dropping a task over a column
    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task._id === activeId,
        );

        tasks[activeTaskIndex].columnId = overId as string;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  }
}

function generateId() {
  // Generate a random number between 1 and 10_000
  return (Math.floor(Math.random() * 10_000) + 1).toString();
}
