"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { SlLocationPin } from "react-icons/sl";
import { ICustomer, IEmployee } from "@/lib/types";
import { getCustomersAssignedToCareworker } from "@/lib/cruds/customerCrud";
import { MutatingDots, ColorRing } from "react-loader-spinner";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BsClipboard2CheckFill } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  addWorkHoursForCareworker,
  fetchEmployeeDetails,
} from "@/lib/cruds/employeeCrud";
import { FcAlarmClock } from "react-icons/fc";
import toast from "react-hot-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
const page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [submission, setSubmission] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  const [checkInCustomerId, setCheckInCustomerId] = useState<string>("");
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [workTime, setWorkTime] = useState<number>(0);
  const modalRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const fetchCustomer = async (id: string) => {
    const data = await getCustomersAssignedToCareworker(id);
    const employee = await fetchEmployeeDetails(id);
    console.log("🚀 ~ fetchCustomer ~ employee:", data);
    setEmployee(employee);
    setCustomer(data);
    setLoading(false);
  };
  useEffect(() => {
    if (user && user.uid) {
      fetchCustomer(user.uid);
    } else {
      setLoading(false);
    }
  }, [user]);

  const getTodaysDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${year}-${month}-${date}`;
  };

  const handleSubmit = async (minutes: string, id: string) => {
    setSubmission(true);
    console.log("🚀 ~ minutes", id, minutes);
    setCheckInCustomerId(id);
    setWorkTime(parseInt(minutes));
    const response = await fetch("/api/sendsms/send-otp");
    const data = await response.json();
    if (data.send) {
      if (modalRef.current) {
        modalRef!.current.click();
      }
    }
    if (!data.send) {
      toast.error("Failed to send OTP, please try again later");
    }
    setSubmission(false);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setSubmission(true);
    const response = await fetch("/api/sendsms/verify-otp?otp=" + data.pin);
    const res = await response.json();
    if (res.verified) {
      const data = {
        date: getTodaysDate(),
        customerId: checkInCustomerId,
        workHours: workTime,
      };
      const result = await addWorkHoursForCareworker(user.uid!, data);
      if (result) {
        toast.success("Checked in successfully");
        // if (closeRef.current) {
        //   closeRef!.current.click();
        // }
      }
    } else {
      toast.error("Invalid Check-In Passcode!");
    }
    setSubmission(false);
  }
  return (
    <div className="relative w-full p-4">
      {loading && (
        <div className="absolute inset-0  bg-white bg-opacity-10 backdrop-blur-sm flex items-start justify-center  z-50">
          <div className="text-2xl pt-16 md:pt-48 font-semibold">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#3A8BEB"
              secondaryColor="#34D399"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      )}
      {customer.map((customer, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-5 items-center bg-gradient-to-bl from-emerald-50 to-blue-50 justify-between w-full rounded-2xl border shadow p-6 mb-4"
        >
          <div className="flex items-center md:items-start flex-col gap-1">
            <h2 className=" text-lg inline-flex items-center gap-1 font-semibold text-black">
              {customer.fullname}{" "}
              <span className=" mt-0.5 bg-slate-100 flex items-center text-slate-600 font-thin italic text-xs px-3 py-1">
                <FcAlarmClock className=" text-lg mr-2" />{" "}
                {customer.totalTimeRequired} minutes per day
              </span>
            </h2>
            <p className=" font-semibold text-sm text-slate-600 mb-2">
              {customer.email}
            </p>
            <p className=" font-thin inline-flex mb-2 items-center gap-1 italic text-xs text-slate-600">
              <SlLocationPin />
              {customer.address}
            </p>
            <h3 className=" text-lg text-blue-600 font-bold capitalize ">
              {customer.serviceType}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                handleSubmit(customer.totalTimeRequired, customer.uid);
              }}
              className=" text-white  inline-flex items-center gap-3 hover:text-slate-100 transition-all border-2 bg-blue-600 rounded-xl py-3 font-semibold px-8"
            >
              {submission ? (
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
                <>
                  <BsClipboard2CheckFill className=" text-xl text-white" />
                  Check In for {getTodaysDate()}{" "}
                </>
              )}
            </button>
            <AlertDialog>
              <AlertDialogTrigger
                ref={modalRef}
                className=" text-white hidden items-center gap-3 hover:text-slate-100 transition-all border-2 bg-blue-600 rounded-xl py-3 font-semibold px-8"
              >
                <BsClipboard2CheckFill className=" text-xl text-white" />
                Check In for today
              </AlertDialogTrigger>
              <AlertDialogContent className=" z-30">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-full space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full items-center gap-3">
                          <FormLabel className=" mx-auto text-center w-full text-xl pb-2 border-b border-slate-200 font-bold">
                            Check In Pass
                          </FormLabel>
                          <FormControl className="">
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Please enter the check in passcode sent to your
                            assigned client
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center flex-wrap items-center gap-3 w-full ">
                      <AlertDialogCancel
                        ref={closeRef}
                        className=" px-8 rounded-full"
                      >
                        Cancel
                      </AlertDialogCancel>

                      {submission ? (
                        <Button
                          type="submit"
                          disabled
                          className="  rounded-full px-8 bg-blue-600"
                        >
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
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
                        >
                          Check In
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
      {!customer.length && (
        <div className="flex items-center flex-col justify-center w-full gap-5 py-4">
          <Image src="/avatar.png" alt="Empty" width={50} height={50} />

          <p className="text-lg font-semibold italic text-slate-500">
            No customers assigned to you yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
