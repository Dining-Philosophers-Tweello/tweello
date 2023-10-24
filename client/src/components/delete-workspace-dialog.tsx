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
import { useRouter } from "next/navigation";

const DeleteWorkspaceDialog = ({ workspaceId }: { workspaceId: string }) => {
  const router = useRouter();
  const handleSubmit = () => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch(`http://localhost:8000/api/workspaces/${workspaceId}`, requestOptions)
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

  return (
    <Dialog>
      <DialogTrigger>
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-700	 text-primary-foreground hover:bg-red-800 h-10 px-4 py-2">
          Delete Workspace
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription className="pt-[20px]">
            Are you sure you want to delete this workspace?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between w-full pt-[20px]">
          <DialogClose asChild>
            <Button className="w-1/2 mr-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-1/2 mr-2"
              variant="destructive"
              type="submit"
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceDialog;
