"use client";

import DeleteDialog from "@/components/delete-dialog";
import EditBoardDialog from "@/components/edit-board-dialog";

export default function Board() {
  const handleDelete = () => {
    console.log("Deleted board");
  };
  const handleEdit = () => {
    console.log("Edited board");
  };

  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <div className="text-3xl">Insert board name here</div>
        <EditBoardDialog componentName="board" handleEdit={handleEdit} />
        <DeleteDialog componentName={"Board"} handleDelete={handleDelete} />
      </div>
      <div className="flex gap-5 flex-wrap">Insert Columns Here</div>
    </div>
  );
}
