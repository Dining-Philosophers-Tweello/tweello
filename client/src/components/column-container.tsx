import TaskCard from "@/components/task-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Column, Task } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusIcon, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, name: string) => void;

  createTask: (columnId: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
  tasks: Task[];
}
function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task._id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-80 min-h-[25rem] bg-secondary border-2 border-primary opacity-40"
      ></div>
    );
  }
  return (
    <Card
      className="w-80 min-h-[25rem] bg-secondary flex flex-col"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex flex-col ">
        {/*Header*/}
        <CardHeader
          className=" flex flex-row items-center justify-between bg-card cursor-grab rounded rounded-b-none p-3 border-2 border-secondary"
          {...attributes}
          {...listeners}
        >
          <CardDescription onClick={() => setEditMode(true)}>
            <span className="text-muted-foreground px-2 py-1 items-center justify-center">
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
          <Button
            variant="ghost"
            size="sm"
            className="!mt-0"
            onClick={() => deleteColumn(column._id)}
          >
            <Trash2 color="grey" size={24} />
          </Button>
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
      {/*Footer*/}
      <CardFooter>
        <Button
          size="lg"
          variant="ghost"
          className="hover:bg-primary-foreground w-full"
          onClick={() => createTask(column._id)}
        >
          <PlusIcon />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}
export default ColumnContainer;
