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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useState } from "react";

type CreateColumnDialogProps = {
  onCreate: (columnName: string) => void;
  children?: ReactNode; // Add this line to accept children
};

export default function CreateColumnDialog({
  onCreate,
}: CreateColumnDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [newColumnName, setNewColumnName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setNewColumnName("");
      }}
    >
      <DialogTrigger>
        <Button className="w-80 min-w-[20rem] hover:bg-blend-lighten">
          Add Column
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            onCreate(newColumnName);
          }}
        >
          <DialogHeader>
            <DialogTitle>Create New Column</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid  items-center gap-4">
              <Label htmlFor="name" className="text-left text-sm">
                Column Name
              </Label>
              <Input
                id="column-name"
                name="column-name"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                onChange={handleChange}
                className="col-span-3"
                placeholder="Enter column name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="mr-2" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={newColumnName == ""}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
