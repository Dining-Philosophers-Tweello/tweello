import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { requestOptions } from "@/hooks/requestOptions";
import { Task } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DeleteDialog from "./delete-dialog";
import EditTaskDialog from "./edit-task-dialog";

interface Props {
  params: { workspaceId: string; boardId: string };
  columnId: string;
  task: Task;
}

function TaskCard({ params, columnId, task }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    isDragging,
  } = useDraggable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = () => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}/columns/${columnId}/tasks/${task._id}`,
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

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="  bg-card border-2 border-primary opacity-30 flex items-center flex-row justify-start min-h-[8rem]
         w-full whitespace-pre-wrap max-h-32"
      >
        <CardTitle className="flex justify-start p-6">{task.name}</CardTitle>
      </Card>
    );
  }

  return (
    <Card
      className="min-h-[8rem]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardContent
        className="pt-6 flex items-center flex-row justify-between min-h-[6rem]
        my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
      >
        <CardTitle className="justify-center flex items-center align-middle">
          {task.name}
          <div>
            <EditTaskDialog params={params} columnId={columnId} task={task} />
            <DeleteDialog
              componentName={"Task"}
              handleDelete={handleDelete}
              variant="ghost"
              size="icon"
              className="!mt-0"
              color="grey"
            />
          </div>
        </CardTitle>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
