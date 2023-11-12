import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className=" min-h-[8rem] bg-card border-2 border-primary p-6 opacity-30"
      >
        <CardTitle className="flex justify-start pt-6">
          {task.content}
        </CardTitle>
      </Card>
    );
  }

  if (editMode) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="min-h-[8rem]"
      >
        <CardTitle className="justify-center flex items-center  align-middle w-full p-6">
          <textarea
            className=" min-h-[5rem] w-full border-none my-auto h-[90%] overflow-y-auto overflow-x-hidden whitespace-pre-wrap rounded bg-transparent resize-none "
            value={task.content}
            autoFocus
            placeholder="Enter a title for this card..."
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                toggleEditMode();
              }
            }}
            onChange={(e) => {
              updateTask(task._id, e.target.value);
            }}
          />
        </CardTitle>
      </Card>
    );
  }

  return (
    <Card
      className="min-h-[8rem]"
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardContent
        className="flex items-center flex-row justify-between min-h-[6rem]
        my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        <CardTitle className="justify-center flex items-center align-middle pt-6">
          {task.content}
        </CardTitle>
        {mouseIsOver && (
          <Button
            variant="ghost"
            size="sm"
            className="!mt-0 pt-6"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 size={20} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskCard;
