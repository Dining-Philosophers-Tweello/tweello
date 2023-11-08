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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestOptions } from "@/hooks/requestOptions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkspaceName(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      "http://localhost:8000/api/workspaces",
      requestOptions("POST", { name: newWorkspaceName }),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        router.push(`/workspaces/${data._id}`);
        setNewWorkspaceName("");
      })
      .catch((error) => {
        console.error("Error creating workspace:", error);
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setNewWorkspaceName("");
      }}
    >
      <DialogTrigger>
        <Button>Create New Workspace</Button>
      </DialogTrigger>
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
