import { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Register",
  description: "Register a new account",
};

export default function Register() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center border border-gray-300 rounded-2xl w-96 h-fit p-5 ">
          <div className="text-3xl p-6">Register</div>
          <Input
            className="m-2"
            id="email"
            placeholder="Enter your email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
          <Input
            id="password"
            className="m-2"
            placeholder="Enter your password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
          />

          <div className="flex items-center">
            <Icons.infocircle className=" w-[1.5rem]" />
            <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
              Minimum 6 characters, at least one number, and special character.
            </div>
          </div>

          <Input
            id="password"
            className="m-2"
            placeholder="Enter your password again"
            type="new-password"
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect="off"
          />
          <Button className="w-full m-2">Register</Button>
          <div className="m-2">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-500 underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
