import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { requestOptions } from "@/hooks/requestOptions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  name: string;
}

export default function WorkspaceDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/workspaces", requestOptions("GET"))
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
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="text-xl">Workspaces</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              router.push("/home");
              setOpen(false);
            }}
          >
            <div className="flex flex-row gap-1 font-bold">Home</div>
          </DropdownMenuItem>
          {workspaces.length > 0 && <DropdownMenuSeparator />}
          {workspaces.map((workspace) => {
            return (
              <Link href={`/workspaces/${workspace.id}`} key={workspace.id}>
                <DropdownMenuItem key={workspace.id}>
                  {workspace.name}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
