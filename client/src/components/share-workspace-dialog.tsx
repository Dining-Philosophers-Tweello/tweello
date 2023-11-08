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
import { requestOptions } from "@/hooks/requestOptions";
import { useEffect, useState } from "react";

const ShareWorkspaceDialog = ({ workspaceId }: { workspaceId: string }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sharedUsers, setSharedUsers] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/workspaces/${workspaceId}`,
      requestOptions("GET"),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSharedUsers(data.members);
      })
      .catch((error) => {
        console.error("Error fetching workspace:", error);
      });
    fetch("http://localhost:8000/api/users", requestOptions("GET"))
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
    fetch("http://localhost:8000/api/users/profile", requestOptions("GET"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentUserId(data._id);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
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
    try {
      const response = await fetch(
        `http://localhost:8000/api/workspaces/${workspaceId}`,
        requestOptions("PUT", { memberId: selectedUser }),
      );
      setSharedUsers([...sharedUsers, selectedUser]);
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
            {sharedUsers.length > 0 && (
              <div className="flex flex-col">
                <div className="py-1">Already shared with:</div>
                <div className="flex flex-row gap-2 flex-wrap">
                  {sharedUsers.map((user) => (
                    <div
                      className="bg-blue-100 rounded-xl px-2 py-1"
                      key={user}
                    >
                      {users.find((u) => u._id === user).email}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="py-2">Share with</p>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an email" />
              </SelectTrigger>
              <SelectContent>
                {users
                  .filter((user) => user._id !== currentUserId)
                  .filter((user) => !sharedUsers.includes(user._id))
                  .map((user) => (
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
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWorkspaceDialog;
