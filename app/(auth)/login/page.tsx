"use client";
import React, { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: IUser) {
    console.log(values);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                    {/* {loading ? (
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
                    ) : ( */}
                    <span className=" capitalize">Add Customer</span>
                    {/* )} */}
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
