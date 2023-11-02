"use client";

import { Icons } from "@/components/icons";
import { WorkspaceBoardCard } from "@/components/workspace-board-card";
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export default function Home() {
  const [workspaces, setWorkspaces] = useState<Workspace[] | null>();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8000/api/workspaces", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorkspaces(
          data.workspaces.map((workspace) => ({
            id: workspace._id,
            name: workspace.name,
            updatedAt: workspace.updatedAt,
            createdAt: workspace.createdAt,
          })),
        );
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
            {workspaces.map((workspace) => (
              <WorkspaceBoardCard
                key={workspace.id}
                link={`/workspaces/${workspace.id}`}
                title={workspace.name}
                updatedAt={workspace.updatedAt}
                createdAt={workspace.createdAt}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
