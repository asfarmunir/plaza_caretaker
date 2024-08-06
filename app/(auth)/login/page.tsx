"use client";
import React, { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { fetchEmployeeDetails } from "@/lib/cruds/employeeCrud";
import { IEmployee } from "@/lib/types";

const formSchema = z.object({
  password: z.string().min(3, {
    message: "Please enter a valid password.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

interface IUser {
  email: string;
  password: string;
}

const page = () => {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "matt@gmail.com",
      password: "password",
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    const { email, password } = values;
    setLoading(true);
    setValidation("");
    try {
      const loggedinUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🚀 ~ onSubmit ~ loggedinUser:", loggedinUser);
      if (loggedinUser.user) {
        const userData = await fetchEmployeeDetails(loggedinUser.user.uid!);
        console.log("🚀 ~ onSubmit ~ userData:", userData);
        if (userData?.employeeType === "ceo") {
          Cookies.set("userRole", "CEO");
          Cookies.set("isLoggedIn", "true");
          setLoading(false);
          toast.success(`Welcome ${userData?.employeeType}!`);
          router.push("/");
        } else if (userData?.employeeType === "manager") {
          Cookies.set("userRole", "manager");
          Cookies.set("isLoggedIn", "true");
          setLoading(false);
          toast.success(`Welcome ${userData?.employeeType}!`);
          router.push("/");
        } else {
          Cookies.set("userRole", "careworker");
          Cookies.set("isLoggedIn", "true");
          setLoading(false);
          toast.success(`Welcome ${userData?.employeeType}!`);
          router.push("/careworker/assigned-customers");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setValidation("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <div className=" min-h-screen bg-gradient-to-tr from-blue-100 to-emerald-100 flex items-center justify-center">
      <div className=" max-w-5xl h-[28rem]    items-center justify-center   overflow-hidden w-full flex ">
        <Image
          src="/hero.png"
          className="hidden md:block object-cover h-full   "
          width={300}
          height={300}
          alt="login"
        />
        <div className=" px-12  shadow-md bg-white h-full ">
          <Form {...form}>
            <div
              id="first"
              className="flex flex-col  items-center justify-center w-full gap-4  my-6"
            >
              <form
                id="container"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full"
              >
                <Image
                  src="/logo.png"
                  width={250}
                  height={250}
                  alt="login"
                  className="mb-6"
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="block 2xl:text-lg  text-blue-600 font-thin  mb-2">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          className="w-72 h-10 border-2 mb-0.5 border-gray-300 rounded-lg p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="block 2xl:text-lg  text-blue-600 font-thin  mb-2">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          className="w-72 h-10 border-2 mb-0.5 border-gray-300 rounded-lg p-2"
                        />
                      </FormControl>
                      <p className="text-sm text-red-400 font-semibold">
                        {validation}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href={"/"}
                  className=" text-sm mb-5 text-blue-500 underline"
                >
                  Forget password?
                </Link>
                <div className="flex flex-col w-full mt-2 items-center justify-center">
                  <Button
                    type="submit"
                    className="bg-blue-600  w-full rounded-full hover:bg-slate-700 mt-4 text-white font-semibold py-4 2xl:py-6  px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
                  >
                    {loading ? (
                      <ColorRing
                        visible={true}
                        height="35"
                        width="35"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                        ]}
                      />
                    ) : (
                      <span className=" capitalize">Login</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Form>{" "}
        </div>
      </div>
    </div>
  );
};

export default page;
