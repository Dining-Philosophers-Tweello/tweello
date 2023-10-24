import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  name: string;
}

export default function WorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkspaceName(e.target.value);
  };

  const handleSubmit = () => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newWorkspaceName }),
    };

    fetch("http://localhost:8000/api/workspaces", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setWorkspaces([...workspaces, { id: data._id, name: data.name }]);
        router.push(`/workspace/${data._id}`);
        setNewWorkspaceName("");
      })
      .catch((error) => {
        console.error("Error creating workspace:", error);
      });
  };

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
          })),
        );
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setNewWorkspaceName("");
      }}
    >
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid  items-center gap-4">
              <Label htmlFor="name" className="text-left text-sm">
                Workspace Name
              </Label>
              <Input
                id="workspace-name"
                name="workspace-name"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                onChange={handleChange}
                className="col-span-3"
                placeholder="Enter workspace name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="mr-2" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={newWorkspaceName == ""}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
