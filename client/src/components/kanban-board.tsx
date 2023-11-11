import ColumnContainer from "@/components/column-container";
import { Button } from "@/components/ui/button";
import { Column } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column._id),
    [columns],
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  return (
    <>
      <div className="overflow-x-auto flex gap-2">
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="flex gap-2">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column._id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>

          <Button
            className="w-80 min-w-[20rem] hover:bg-blend-lighten"
            onClick={createNewColumn}
          >
            <Plus />
            Add column
          </Button>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      createdAt: "",
      tasks: [],
      updatedAt: "",
      _id: generateId(),
      name: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }
  function deleteColumn(id: string) {
    const filteredColumns = columns.filter((column) => column._id !== id);
    setColumns(filteredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column._id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column._id === overColumnId,
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
}

function generateId() {
  // Generate a random number between 1 and 10_000
  return (Math.floor(Math.random() * 10_000) + 1).toString();
}
