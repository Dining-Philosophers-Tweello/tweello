"use client";

import DeleteDialog from "@/components/delete-dialog";
import EditBoardDialog from "@/components/edit-board-dialog";
import { Icons } from "@/components/icons";
import { requestOptions } from "@/hooks/requestOptions";
import { Board, nullBoard } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Board({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) {
  const router = useRouter();

  const [board, setBoard] = useState<Board | null>();

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}`,
      requestOptions("GET"),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBoard(data);
      })
      .catch((error) => {
        setBoard(nullBoard);
        console.error("Error fetching board:", error);
      });
  });

  const handleDelete = () => {
    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}/boards/${params.boardId}`,
      requestOptions("DELETE"),
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

  const handleColumnDelete = () => {
    console.log("Deleted column");
  };

  if (!board) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {board === nullBoard ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="text-2xl text-gray-400">Board not found</div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-5 w-screen h-screen">
          <div className="flex flex-row gap-5">
            <div className="text-4xl font-bold">{board.name}</div>
            <EditBoardDialog
              boardName={board.name}
              boardDescription={board.description}
              params={params}
            />
            <DeleteDialog componentName={"Board"} handleDelete={handleDelete} />
          </div>
          <div className="font-light text-gray-500">{board.description}</div>
          <div className="flex gap-5 flex-wrap">
            Insert Columns Here
            <DeleteDialog
              componentName={"Column"}
              handleDelete={handleColumnDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
