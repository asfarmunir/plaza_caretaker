"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { SlLocationPin } from "react-icons/sl";
import { ICustomer } from "@/lib/types";
import { getCustomersAssignedToCareworker } from "@/lib/cruds/customerCrud";
import { MutatingDots } from "react-loader-spinner";
import Image from "next/image";
import { BsClipboard2CheckFill } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { addWorkHoursForCareworker } from "@/lib/cruds/employeeCrud";
import { FcAlarmClock } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const page = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  const [workHours, setWorkHours] = useState<number>(0);
  const [validation, setValidation] = useState<boolean>(false);
  const fetchCustomer = async (id: string) => {
    const data = await getCustomersAssignedToCareworker(id);
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

  const handleSubmit = async (minutes: string) => {
    setLoading(true);
    setValidation(false);
    const data = {
      workHours: parseInt(minutes),
      date: getTodaysDate(),
    };
    await addWorkHoursForCareworker(user.uid, data);
    setLoading(false);
    window.location.reload();
  };
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
            <AlertDialog>
              <AlertDialogTrigger className=" text-white  inline-flex items-center gap-3 hover:text-slate-100 transition-all border-2 bg-blue-600 rounded-xl py-3 font-semibold px-8">
                <BsClipboard2CheckFill className=" text-xl text-white" />
                Check In for today
              </AlertDialogTrigger>
              <AlertDialogContent className=" z-30">
                <div className=" pb-5 border-b  w-full">
                  <AlertDialogTitle>
                    Check in for{" "}
                    <span className=" bg-slate-100 text-slate-500 px-3 py-2 rounded-md mx-2">
                      {" "}
                      {getTodaysDate()}{" "}
                    </span>
                  </AlertDialogTitle>
                </div>

                <div className="flex w-full justify-center items-center pb-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={() => handleSubmit(customer.totalTimeRequired)}
                    className=" bg-blue-600"
                  >
                    Check In
                  </Button>
                </div>
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
