"use client"
import Head from 'next/head';
import {Field, Formik, useFormik} from 'formik';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {string, object, ref} from "yup";
import {Label} from "@/components/ui/label";






export default function Register() {
  type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const apiUrl =  "http://localhost:8000/api/users";

  const validationSchema = object({
    name: string().min(2, 'Name must be at least 2 characters').required('Name is a required field.'),
    // line
    email: string().email('Email must be a valid email.').required('Email is a required field.'),
    password: string()
        .required('Required')
        .min(6, 'Minimum 6 characters, at least one number, and special character.')
        .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
            'Minimum 6 characters, at least one number, and special character.'
        ),
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required('Required'),
  });
  const handleSubmit = async (values: FormValues) => {
    try {
      console.log(JSON.stringify(values))
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error("Error: ", error);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        console.log(JSON.stringify(values))
        const response = await fetch(`${apiUrl}`, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
      }
      catch (error) {
        console.error("Error: ", error);
      }
    }
  });
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register a new account" />
      </Head>
      <div className="flex justify-center m-7  h-auto  items-center overflow-auto">
        <div className="flex flex-col  items-center bg-card text-card-foreground shadow-sm border-2 border-border rounded-2xl w-fit px-8 gap-6  h-fit ">
          <div className="flex flex-col space-y-1.5 gap-6 p-6">
            <div className="text-3xl leading-none tracking-tight">Register</div>
          </div>
          <div className="py-6 pt-0 grid gap-3">
            <Formik initialValues={formik.initialValues}  validationSchema={validationSchema} onSubmit={handleSubmit}>
              {(formik) => (
                  <form className="w-80 grid gap-y-4 transition-all " onSubmit={formik.handleSubmit}>
                    <div className="grid gap-2">
                      <Label>First Name</Label>
                      <Input
                          id="name"
                          name="name"
                          placeholder=""
                          type="text"
                          autoCapitalize="none"
                          autoComplete="name"
                          autoCorrect="off"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                          <div className="flex items-center">
                            <Icons.infocircle className="w-[1.5rem]" />
                            <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                              {formik.errors.name}
                            </div>
                          </div>
                      ) : null}
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input
                          className=" "
                          id="email"
                          placeholder=""
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                          <div className="flex items-center">
                            <Icons.infocircle className=" w-[1.5rem]" />
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
                          name = "password"
                          className=" "
                          placeholder=""
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                          <div className="flex items-center">
                            <Icons.infocircle className=" w-[1.5rem]" />
                            <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                              {formik.errors.password}
                            </div>
                          </div>
                      ) : null}
                    </div>
                    <div className="grid gap-2">
                      <Label>Confirm Password</Label>
                      <Input
                          id="confirmPassword"
                          name = "confirmPassword"
                          className=""
                          placeholder=""
                          type="password"
                          autoCapitalize="none"
                          autoComplete="new-password"
                          autoCorrect="off"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                      />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                          <div className="flex items-center">
                            <Icons.infocircle className=" w-[1.5rem]" />
                            <div className="text-[.8rem] text-gray-500 m-2 no-wrap">
                              {formik.errors.confirmPassword}
                            </div>
                          </div>
                      ) : null}
                    </div>
                    <Button className="w-full  hover:bg-foreground m-2">Register</Button>
                  </form>
              )}

            </Formik>
          </div>
          <div className="mb-6">
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
