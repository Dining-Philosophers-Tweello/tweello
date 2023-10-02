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
import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import ProfileDialog from "./profile-dialog";
import ProfileSettingsDialog from "./profile-settings-dialog";
import ShareWorkspaceDialog from "./share-workspace-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import WorkspaceDialog from "@/components/workspace-dialog";

const emails = [
  "diego@gmail.com",
  "jordan@gmail.com",
  "sarah@gmail.com",
  "grant@gmail.com",
  "daniel@gmail.com",
];

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
              <WorkspaceDialog/>
            </li>
            <li>
              <ShareWorkspaceDialog emails={emails}/>
            </li>
            <li>
              <DeleteWorkspaceDialog/>
            </li>
          </ul>
          <ul className="flex space-x-6">
            <li>
              <ProfileSettingsDialog/>
            </li>
            <li>
              <ProfileDialog/>
            </li>
            <ModeToggle/>
          </ul>
        </div>
      </nav>
  );

};

export default Navbar;
