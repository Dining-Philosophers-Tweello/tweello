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

const DeleteWorkspaceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-xl">Delete Workspace</p>
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
            <Button className="w-1/2 mr-2" variant="destructive" type="submit">
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceDialog;
