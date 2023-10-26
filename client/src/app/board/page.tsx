"use client";

import DeleteDialog from "@/components/delete-dialog";

export default function Board() {
  const handleDelete = () => {
    console.log("Deleted board");
  };

  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <div className="text-3xl">Insert board name here</div>
        <DeleteDialog componentName={"Board"} handleDelete={handleDelete} />
      </div>
      <div className="flex gap-5 flex-wrap">Insert Columns Here</div>
    </div>
  );
}
