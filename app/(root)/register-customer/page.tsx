"use client";
import React from "react";
import { useState } from "react";
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
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: " Please enter a valid name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  dateOfBirth: z.string().min(5, {
    message: "Please enter a valid date.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address",
  }),
  serviceType: z.string().min(3, {
    message: "Please enter a valid service",
  }),
  totalTimeRequired: z.string().min(1, {
    message: "Please enter a valid time",
  }),
  amount: z.string().min(1, {
    message: "Please enter a valid amount",
  }),
});

interface IEmployee {
  fullname: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  totalTimeRequired: string;
  amount: string;
}

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      dateOfBirth: "",
      serviceType: "",
      phoneNumber: "",
      address: "",
      totalTimeRequired: "",
      amount: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: IEmployee) {
    console.log(values);
    router.push("/businessDashboard/news/add/success");
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start  2xl:p-8 px-4 md:px-16">
      <h1 className=" text-blue-500 font-bold text-3xl text-center w-full">
        Register New Customer
      </h1>
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
            <div className="flex flex-col md:flex-row items-center justify-evenly  gap-6 w-full ">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Fullname
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="fullname"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-evenly  gap-6 w-full ">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="phone number"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Date of Birth
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="date of birth"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-evenly  gap-6 w-full ">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="address"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Service Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="service type"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-evenly  gap-6 w-full ">
              <FormField
                control={form.control}
                name="totalTimeRequired"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Total Time Required
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="time ( mention details )"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="amount"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full mt-2 items-center justify-center">
              <Button
                type="submit"
                className="bg-gradient-to-br from-blue-600 to-emerald-400 w-full rounded-lg hover:bg-slate-700 mt-6 text-white font-semibold py-6 2xl:py-7  px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
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
      </Form>
    </div>
  );
};

export default page;
