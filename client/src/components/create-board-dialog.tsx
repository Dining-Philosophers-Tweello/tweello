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

export default function CreateBoardDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create New Board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="text-left text-sm">
              Workspace Name
            </Label>
            <Input
              id="board-name"
              name="board-name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              className="col-span-3"
              placeholder="Enter board name"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="mr-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
