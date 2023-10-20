"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { object, string } from "yup";

export default function AuthenticationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if the user is authenticated. If so, redirect to the home page.
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status, router]);
  const [error, setError] = useState(null);
  type FormValues = {
    email: string;
    password: string;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/auth", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.token);

        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/home",
        });

        if (res.error) {
          setError(res.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = object({
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
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
              <form
                method="POST"
                className="w-80 grid gap-y-4 transition-all"
                onSubmit={formik.handleSubmit}
              >
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
