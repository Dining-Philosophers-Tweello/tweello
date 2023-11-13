import DeleteDialog from "@/components/delete-dialog";
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
import { PlusIcon } from "lucide-react";
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
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column._id,
      data: {
        type: "column",
        column,
      },
      disabled: editMode,
    });

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
          <DeleteDialog
            componentName={column.name}
            handleDelete={() => deleteColumn(column._id)}
            variant="ghost"
            size="icon"
            className="!mt-0"
            color="grey"
          ></DeleteDialog>
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
