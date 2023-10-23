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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShareBoardDialogProps {
  emails: string[];
}

const ShareBoardDialog = ({ emails }: ShareBoardDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Share Board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Board</DialogTitle>
          <div className="text-sm text-muted-foreground pt-[20px]">
            <p className="pb-[5px]">Share with</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an email" />
              </SelectTrigger>
              <SelectContent>
                {emails.map((email) => (
                  <SelectItem key={email} value={email}>
                    {email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        <DialogFooter className="flex justify-between w-full pt-[20px]">
          <DialogClose asChild>
            <Button className="w-1/2 mr-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-1/2 mr-2" type="submit">
              Share
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareBoardDialog;
