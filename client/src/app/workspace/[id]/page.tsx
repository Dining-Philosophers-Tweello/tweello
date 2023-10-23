"use client";

import { BoardCard } from "@/components/board-card";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";

interface BoardCardData {
  link: string;
  title: string;
  description: string;
}

const boardsData: BoardCardData[] = [
  {
    link: "/",
    title: "Project A",
    description:
      "Ut enim ad minim veniam, exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    link: "/",
    title: "Project B",
    description:
      "Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua.",
  },
  {
    link: "/",
    title: "Project C",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisci, sed do eiusmod tempor incididunt ut.",
  },
  {
    link: "/",
    title: "Project D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    link: "/",
    title: "Project E",
    description:
      "Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat.",
  },
  {
    link: "/",
    title: "Project F",
    description: "Lorem ipsum dolor sit amet.",
  },
];

interface Workspace {
  _id: string;
  name: string;
  boards: string[]; // TODO: Will be Board[] once Board integration is done
  members: string[];
  creator: string;
}

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [workspace, setWorkspace] = useState<Workspace | null>();

  console.log(workspace);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8000/api/workspaces/${params.id}`, requestOptions)
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
        console.error("Error fetching workspaces:", error);
      });
  }, []);

  if (!workspace) {
    return (
      <div className="flex items-center justify-center w-screen h-screen border border-red-500">
        <Icons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 p-5 w-screen h-screen">
        <div className="flex flex-row gap-5">
          <div className="text-3xl">{workspace.name}</div>
          <Dialog>
            <DialogTrigger>
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Create Board
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new board</DialogTitle>
                <DialogDescription>Create new board</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-5 flex-wrap">
          {boardsData.map((board) => (
            <BoardCard
              key={board.title}
              link={board.link}
              title={board.title}
              description={board.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
