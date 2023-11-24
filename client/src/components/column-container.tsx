import DeleteDialog from "@/components/delete-dialog";
import TaskCard from "@/components/task-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { requestOptions } from "@/hooks/requestOptions";
import { Column } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import CreateTaskDialog from "./create-task-dialog";
import EditColumnDialog from "./edit-column-dialog";

interface Props {
  params: { workspaceId: string; boardId: string };
  column: Column;
}

function ColumnContainer(props: Props) {
  const { params, column } = props;
  const { setNodeRef } = useDroppable({
    id: column._id,
    data: {
      type: "Column",
      column,
    },
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
      <div className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-card rounded rounded-b-none p-3 border-2 border-secondary">
          <CardDescription>
            <span className="text-muted-foreground text-base px-2 py-1 items-center justify-center">
              {column.name}
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
      <CardContent className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {column.tasks.map((task) => (
          <TaskCard
            key={task._id}
            params={params}
            columnId={column._id}
            task={task}
          />
        ))}
      </CardContent>
      <CreateTaskDialog params={params} columnId={column._id} />
    </Card>
  );
}

export default ColumnContainer;
