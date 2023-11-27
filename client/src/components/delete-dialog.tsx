import { Button, ButtonProps } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";

interface DeleteDialogProps extends ButtonProps {
  componentName: string;
  handleDelete: () => void;
  onOpenCloseDialog?: () => void;
}
const DeleteDialog = ({
  componentName,
  handleDelete,
  variant = "destructive",
  className,
  size = "icon",
  color,
  onOpenCloseDialog = () => {},
}: DeleteDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenCloseDialog}>
      <DialogTrigger>
        <Button variant={variant} className={className} size={size}>
          <Trash2 color={color} size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Delete ${componentName}`}</DialogTitle>
          <DialogDescription className="pt-[20px]">
            {`Are you sure you want to delete this ${componentName.toLowerCase()}? This action cannot be undone.`}
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
