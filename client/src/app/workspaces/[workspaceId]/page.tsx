"use client";

import CreateBoardDialog from "@/components/create-board-dialog";
import DeleteDialog from "@/components/delete-dialog";
import { Icons } from "@/components/icons";
import ShareWorkspaceDialog from "@/components/share-workspace-dialog";
import { WorkspaceBoardCard } from "@/components/workspace-board-card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Workspace {
  _id: string;
  name: string;
  boards: string[]; // TODO: Will be Board[] once Board integration is done
  members: string[];
  creator: string;
}

const nullWorkspace = {
  _id: "-1",
  name: "",
  boards: [],
  members: [],
  creator: "",
};

export default function WorkspacePage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const [workspace, setWorkspace] = useState<Workspace | null>();
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}`,
      requestOptions,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorkspace(data);
      })
      .catch((error) => {
        setWorkspace(nullWorkspace);
        console.error("Error fetching workspaces:", error);
      });
  }, []);

  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch(
      `http://localhost:8000/api/workspaces/${params.workspaceId}`,
      requestOptions,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then(() => {
        router.replace("/home");
      })
      .catch((error) => {
        console.error("Error deleting workspace:", error);
      });
  };

  if (!workspace) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {workspace === nullWorkspace ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="text-2xl text-gray-400">Workspace not found</div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-5 w-screen h-screen">
          <div className="flex flex-row gap-5">
            <div className="text-3xl">{workspace.name}</div>
            <CreateBoardDialog />
            <ShareWorkspaceDialog workspaceId={params.workspaceId} />
            <DeleteDialog
              componentName={"Workspace"}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex gap-5 flex-wrap">
            {workspace.boards.length === 0 ? (
              <div className="flex items-center justify-center w-screen h-[calc(100vh-200px)]">
                <div className="text-2xl text-gray-400">
                  There are no boards in this workspace
                </div>
              </div>
            ) : (
              <>
                {workspace.boards.map((board) => (
                  <WorkspaceBoardCard
                    key={board["_id"]}
                    link={`/workspaces/${params.workspaceId}/boards/${board["_id"]}`}
                    title={board["name"]}
                    description={board["description"]}
                    updatedAt={board["updatedAt"]}
                    createdAt={board["createdAt"]}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
