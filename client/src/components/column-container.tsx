import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
}
function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
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
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div className="w-80 h-96 bg-secondary border-2 border-primary opacity-40"></div>
    );
  }

  return (
    <Card
      className="w-80 h-96 bg-secondary flex flex-col"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex flex-col ">
        <CardHeader
          className=" flex flex-row items-center justify-between bg-card cursor-grab rounded rounded-b-none p-3 border-2 border-secondary"
          {...attributes}
          {...listeners}
        >
          <CardTitle>
            <span className="text-muted-foreground px-2 py-1 items-center justify-center">
              {`${column.name} `}0
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="!mt-0"
            onClick={() => deleteColumn(column._id)}
          >
            <Trash2 size={24} />
          </Button>
        </CardHeader>
      </div>
      <CardContent className="flex flex-grow">Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
export default ColumnContainer;
