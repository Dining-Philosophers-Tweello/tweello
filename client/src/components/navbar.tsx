"use client";
import { ModeToggle } from "@/components/mode-toggle";
import WorkspaceDialog from "@/components/workspace-dialog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfileDialog from "./profile-dialog";
import ProfileSettingsDialog from "./profile-settings-dialog";

const Navbar = () => {
  const { status } = useSession();
  if (status !== "authenticated") {
    return <div></div>;
  }
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
            <WorkspaceDialog />
          </li>
        </ul>
        <ul className="flex space-x-6">
          <li>
            <ProfileSettingsDialog />
          </li>
          <li>
            <ProfileDialog />
          </li>
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
