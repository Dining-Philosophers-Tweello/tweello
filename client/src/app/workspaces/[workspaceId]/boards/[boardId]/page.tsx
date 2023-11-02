"use client";

import DeleteDialog from "@/components/delete-dialog";
import EditBoardDialog from "@/components/edit-board-dialog";
import { useRouter } from "next/navigation";

export default function Board({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) {
  const router = useRouter();

  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}`,
      requestOptions,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then(() => {
        router.replace(`/workspaces/${params.workspaceId}`);
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <div className="text-3xl">Insert board name here</div>
        <EditBoardDialog />
        <DeleteDialog componentName={"Board"} handleDelete={handleDelete} />
      </div>
      <div className="flex gap-5 flex-wrap">Insert Columns Here</div>
    </div>
  );
}
