"use client";
import React, { useEffect } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { createNewEmployee } from "@/lib/cruds/employeeCrud";
import { ColorRing } from "react-loader-spinner";
import Cookies from "js-cookie";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUser {
  fullname: string;
  email: string;
  dateOfBirth: string;
  employeeType: string;
  phoneNumber: string;
  password: string;
  gender: string;
}

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Please enter a valid fullname.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  dateOfBirth: z.string().min(5, {
    message: "Please enter a valid date.",
  }),
  employeeType: z.string().min(3, {
    message: "Please enter a valid employee type.",
  }),
  gender: z.string().min(3, {
    message: "Please enter gender",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
});

const page = () => {
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState<string | undefined>();
  console.log("🚀 ~ page ~ currUser:", currUser);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      dateOfBirth: "2001-01-01",
      employeeType: "",
      gender: "",
      phoneNumber: " 08012345678",
    },
  });

  const router = useRouter();
  useEffect(() => {
    const user = Cookies.get("userRole");
    setCurrUser(user);
  }, []);
  async function onSubmit(values: IUser) {
    setLoading(true);
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (createdUser) {
        const newValues = {
          ...values,
          uid: createdUser.user?.uid,
        };
        await createNewEmployee(newValues);

        setLoading(false);
        toast.success("Employee added successfully");
        router.push("/employees"); // Navigate to the home page
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error signing up:", error);
      toast.error(error.message);
    }
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start p-6 2xl:p-8 px-4 md:px-16">
      <h1 className=" text-blue-500 font-bold text-3xl text-center w-full">
        Register New Employee
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
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="enter account password"
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Date of Birth
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="date of birth"
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="gender"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="employeeType"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className="block 2xl:text-lg text-blue-600 font-semibold  mb-2">
                    Employee Type
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline">
                        <SelectValue placeholder="rank" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="ceo">Ceo</SelectItem> */}
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="careworker">Careworker</SelectItem>
                        {currUser === "ceo" && (
                          <SelectItem value="ceo">Ceo</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormControl>
                      <Input
                        placeholder="type"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6 placeholder:text-blue-600  rounded-lg 2xl:rounded-xl bg-emerald-300/70 w-full py-5 2xl:py-8 px-6 text-blue-700 2xl:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-full mt-2 items-center justify-center">
              <Button
                type="submit"
                className="bg-gradient-to-br from-blue-600 to-emerald-400 w-full rounded-lg hover:bg-slate-700 mt-6 text-white font-semibold py-6 2xl:py-7  px-10 2xl:text-lg   focus:outline-none focus:shadow-outline"
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
                  <span className=" capitalize">Add Employee</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default page;
