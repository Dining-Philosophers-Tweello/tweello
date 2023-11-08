"use client";

import CreateWorkspaceDialog from "@/components/create-workspace-dialog";
import { Icons } from "@/components/icons";
import { WorkspaceBoardCard } from "@/components/workspace-board-card";
import { requestOptions } from "@/hooks/requestOptions";
import { Workspace } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [workspaces, setWorkspaces] = useState<Workspace[] | null>();

  useEffect(() => {
    fetch("http://localhost:8000/api/workspaces", requestOptions("GET"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorkspaces(data.workspaces);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  }, []);

  if (!workspaces) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex gap-5 flex-wrap">
        {workspaces.length === 0 ? (
          <div className="flex items-center justify-center w-screen h-[calc(100vh-200px)]">
            <div className="text-2xl text-gray-400">
              No workspaces found. Create one to get started!
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-row gap-3">
              <div className="text-4xl font-bold">Your Workspaces</div>
              <CreateWorkspaceDialog />
            </div>
            <div className="flex flex-row w-screen h-fit flex-wrap gap-5">
              {workspaces.map((workspace) => (
                <WorkspaceBoardCard
                  key={workspace._id}
                  link={`/workspaces/${workspace._id}`}
                  title={workspace.name}
                  updatedAt={workspace.updatedAt}
                  createdAt={workspace.createdAt}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
