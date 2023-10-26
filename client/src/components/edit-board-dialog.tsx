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
import { Textarea } from "@/components/ui/textarea";

export default function EditBoardDialog({
  componentName,
  handleEdit,
}: {
  componentName: string;
  handleEdit: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{`Edit ${componentName}`}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Edit ${componentName}`}</DialogTitle>
          <DialogDescription></DialogDescription>
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
          <Button onClick={handleEdit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
