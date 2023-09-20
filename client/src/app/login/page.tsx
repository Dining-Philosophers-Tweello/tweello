import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center border border-gray-300 rounded-2xl w-96 h-96 p-5 bg-gray-50">
          <div className="text-3xl p-6">Sign In</div>
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
          <Button className="w-full m-2">Sign In</Button>
          <div className="m-2">
            Don't have an account?{" "}
            <Link href="/register" className="text-gray-500 underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
