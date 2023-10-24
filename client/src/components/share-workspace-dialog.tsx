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
import { useEffect, useState } from "react";

const ShareWorkspaceDialog = ({ workspaceId }: { workspaceId: string }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8000/api/users", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleOpenChange = () => {
    setOpen(!open);
    setSelectedUser(null);
  };

  const handleValueChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleSubmit = async () => {
    const body = {
      memberId: selectedUser,
    };
    const jwt = localStorage.getItem("jwt");
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/workspaces/${workspaceId}`,
        requestOptions,
      );

      if (response.ok) {
        setOpen(false);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Share Workspace
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Workspace</DialogTitle>
          <div className="text-sm text-muted-foreground pt-[20px]">
            <p className="pb-[5px]">Share with</p>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an email" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.email}
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
          <Button
            className="w-1/2 mr-2"
            type="submit"
            disabled={!selectedUser}
            onClick={handleSubmit}
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWorkspaceDialog;
