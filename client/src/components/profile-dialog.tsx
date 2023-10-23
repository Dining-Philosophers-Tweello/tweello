import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { signOut } from "next-auth/react";

const ProfileDialog = () => {
  const handleSignout = async () => {
    localStorage.removeItem("jwt");
    await signOut({ callbackUrl: "/" });
  };

  const handleSubmit = async () => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/profile",
        requestOptions,
      );

      if (response.ok) {
        await handleSignout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" />
            <AvatarFallback>
              <AvatarImage src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>Delete Profile</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleSignout}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Profile</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this profile?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-[20px]">
          <DialogClose asChild>
            <Button className="w-1/2 mr-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-1/2 mr-2" type="submit" onClick={handleSubmit}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
