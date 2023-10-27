import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBoardDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create New Board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="text-left text-sm">
              Board Info
            </Label>
            <Input
              id="board-name"
              name="board-name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="one-time-code"
              className="col-span-3"
              placeholder="Enter board name"
            />

            <Textarea
              id="board-description"
              name="board-description"
              autoCapitalize="none"
              autoCorrect="off"
              className="col-span-3"
              placeholder="Enter board description"
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
