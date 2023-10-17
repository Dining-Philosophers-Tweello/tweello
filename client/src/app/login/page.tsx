"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, useFormik } from "formik";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { object, string } from "yup";

export default function AuthenticationPage() {
  const [error, setError] = useState(null);
  // const router = useRouter();
  const handleSubmit = async (values: FormValues) => {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/home",
    }).then((response) => {
      if (response?.error) {
        setError("Response:" + response.error);
      } else {
        setError(null);
      }
    });
  };
  const validationSchema = object({
    name: string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is a required field."),
    // line
    email: string()
      .email("Email must be a valid email.")
      .required("Email is a required field."),
    password: string()
      .required("Required")
      .min(
        6,
        "Minimum 6 characters, at least one number, and special character.",
      )
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        "Minimum 6 characters, at least one number, and special character.",
      ),
  });
  type FormValues = {
    email: string;
    password: string;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center bg-card text-card-foreground shadow-sm border-2 border-border rounded-2xl w-fit px-8 gap-6 h-fit">
          <div className="text-3xl p-6">Sign In</div>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form method="POST" className="w-80 grid gap-y-4 transition-all">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="flex items-center">
                      <Icons.infocircle className="w-[1.5rem]" />
                      <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                        {formik.errors.email}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="flex items-center">
                      <Icons.infocircle className="w-[1.5rem]" />
                      <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                        {formik.errors.password}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="text-red-400 text-md text-center rounded p-2">
                  {error}
                </div>
                <Button
                  type="submit"
                  className="w-full hover:bg-foreground m-2"
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
          <div className="m-2">
            Don't have an account?{" "}
            <Link href={"/register"} className="text-gray-500 underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
