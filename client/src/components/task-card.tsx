import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requestOptions } from "@/hooks/requestOptions";
import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
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
        className="min-h-[3rem] flex flex-col bg-card border-2 border-primary opacity-30"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex flex-col">
          <CardHeader className="pl-4 pr-1 flex items-center flex-row justify-between h-[90%] w-full whitespace-pre-wrap">
            <CardTitle>
              {task.name.length <= 15
                ? task.name
                : task.name.slice(0, 15) + "..."}
            </CardTitle>
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
          </CardHeader>
        </div>
        <CardContent className="pl-4 flex items-center flex-row justify-between min-h-[6rem] my-auto h-[90%] w-full whitespace-pre-wrap">
          {task.description.length <= 90
            ? task.description
            : task.description.slice(0, 90) + "..."}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="min-h-[3rem] flex flex-col"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col">
        <CardHeader className="pl-4 pr-1 flex items-center flex-row justify-between h-[90%] w-full whitespace-pre-wrap">
          <CardTitle>
            {task.name.length <= 15
              ? task.name
              : task.name.slice(0, 15) + "..."}
          </CardTitle>
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
        </CardHeader>
      </div>
      <CardContent className="pl-4 flex items-center flex-row justify-between min-h-[6rem] my-auto h-[90%] w-full whitespace-pre-wrap">
        {task.description.length <= 90
          ? task.description
          : task.description.slice(0, 90) + "..."}
      </CardContent>
    </Card>
  );
}

export default TaskCard;
