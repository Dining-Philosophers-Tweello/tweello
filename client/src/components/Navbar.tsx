import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full p-6 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex justify-center items-center space-x-8">
          <li>
            <Link className="text-2xl font-bold" href="/">
              Tweello
            </Link>
          </li>
          <li>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <p className="text-xl">Workspaces</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Workspace 1</DropdownMenuItem>
                  <DropdownMenuItem>Workspace 2</DropdownMenuItem>
                  <DropdownMenuItem>Workspace 3</DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Create New Workspace</DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Workspace</DialogTitle>
                  <DialogDescription>Update this dialog</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
          <li>
            <Dialog>
              <DialogTrigger>
                <p className="text-xl">Workspace Settings</p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Workspace Settings</DialogTitle>
                  <DialogDescription className="pt-[20px]">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Share with" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diego@gmail.com">
                          diego@gmail.com
                        </SelectItem>
                        <SelectItem value="jordan@gmail.com">
                          jordan@gmail.com
                        </SelectItem>
                        <SelectItem value="daniel@gmail.com">
                          daniel@gmail.com
                        </SelectItem>
                        <SelectItem value="grant@gmail.com">
                          grant@gmail.com
                        </SelectItem>
                        <SelectItem value="sarah@gmail.com">
                          sarah@gmail.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div>
                      <p>Delete workspace</p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary">Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        </ul>

        <ul className="flex space-x-6">
          <li>
            <Dialog>
              <DialogTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Profile</DialogTitle>
                  <DialogDescription>Update this dialog</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Log Out</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
