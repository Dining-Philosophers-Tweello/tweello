import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  name: string;
}

export default function WorkspaceDialog() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

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
          })),
        );
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  }, []);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="text-xl">Workspaces</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {workspaces.map((workspace) => {
            return (
              <Link href={`/workspace/${workspace.id}`} key={workspace.id}>
                <DropdownMenuItem key={workspace.id}>
                  {workspace.name}
                </DropdownMenuItem>
              </Link>
            );
          })}
          <DialogTrigger asChild>
            <DropdownMenuItem>Create New Workspace</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="text-left text-sm">
              Workspace Name
            </Label>
            <Input id="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
