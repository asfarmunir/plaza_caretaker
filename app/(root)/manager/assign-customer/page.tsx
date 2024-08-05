"use client";
import { assignCareworker, fetchAllCustomers } from "@/lib/cruds/customerCrud";
import { getAllCareworkers } from "@/lib/cruds/employeeCrud";
import { ICustomer, IEmployee } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

import { Bars } from "react-loader-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  const [careworker, setCareworker] = useState<IEmployee[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  useEffect(() => {
    const fetchcustomer = async () => {
      setLoading(true);
      const data = await fetchAllCustomers();
      setCustomer(data);
      setLoading(false);
    };
    fetchcustomer();
  }, []);

  useEffect(() => {
    const fetchCareworkers = async () => {
      setLoading(true);
      const data = await getAllCareworkers();
      setCareworker(data);
      setLoading(false);
    };
    fetchCareworkers();
  }, []);

  const router = useRouter();

  const assignCareworkerToCustomer = async (
    customerId: string,
    careworkerId: string
  ) => {
    toast.loading("Assigning Careworker to Customer");
    await assignCareworker(customerId, careworkerId);
    toast.dismiss();
    toast.success("Careworker Assigned  Successfully");
    router.refresh();
  };

  return (
    <section className="flex flex-col px-8 w-full ">
      <div className=" w-full flex items-center justify-between">
        {!selectedCustomer ? (
          <div className="flex flex-col">
            <h2 className=" text-2xl 2xl:text-3xl font-bold mb-1  ">
              Assign Customer
            </h2>
            <p className=" text-sm font-thin pb-3 w-full border-b mb-6">
              {" "}
              Please select a customer to assign a careworker
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className=" text-2xl 2xl:text-3xl font-bold mb-1  ">
              Select Care worker
            </h2>
            <p className=" text-sm font-thin pb-3 w-full border-b mb-6">
              {" "}
              Please select the careworker to assign to{" "}
              <span className=" text-base font-bold text-blue-600">
                {selectedCustomer.fullname}
              </span>
            </p>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <p className=" text-slate-700 font-thin">Available Careworkers:</p>
          <p className=" font-semibold">
            {careworker.length < 10 && careworker.length > 0
              ? `0${careworker.length}`
              : careworker.length}
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center w-full py-4">
          <Bars
            height="30"
            width="30"
            color="blue"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {!selectedCustomer ? (
        customer.map((customer, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-5 items-center bg-gradient-to-bl from-emerald-50 to-blue-50 justify-between w-full rounded-2xl border shadow p-6 mb-4"
          >
            <div className="flex items-center md:items-start flex-col gap-1">
              <h2 className=" text-lg font-semibold text-black">
                {customer.fullname}
              </h2>
              <p className=" font-semibold text-sm text-slate-600 mb-2">
                {customer.email}
              </p>
              <p className=" font-thin inline-flex items-center gap-1 italic text-xs text-slate-600">
                <SlLocationPin />
                {customer.address}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className=" text-lg text-blue-600 font-bold capitalize ">
                {customer.serviceType}
              </h3>
              <button
                onClick={() => setSelectedCustomer(customer)}
                className=" text-blue-600 text-sm hover:bg-blue-500 hover:text-white transition-all border-2 border-blue-500 rounded-full py-1 font-semibold px-3"
              >
                {" "}
                Select
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {careworker.map((careworker, index) => (
            <div
              key={index}
              className="flex gap-2 items-center flex-col bg-gradient-to-tr from-emerald-100 to-blue-100 justify-between  rounded-2xl border shadow px-4 py-5 mb-4"
            >
              <div className="w-[50px] rounded-full 2xl:w-[60px] h-[50px] 2xl:h-[60px] bg-white">
                <Image
                  src="/avatar.png"
                  width={80}
                  height={80}
                  className=" bg-white w-[50px] rounded-full 2xl:w-[60px] h-[50px] 2xl:h-[60px]  object-cover object-center  "
                  alt="icon"
                />
              </div>
              <h3 className=" text-lg capitalize font-bold mb-3 ">
                {careworker.fullname}
              </h3>
              <div className="flex flex-col items-start  w-full gap-3">
                <p className=" inline-flex items-center gap-2 text-xs text-slate-600">
                  <AiFillClockCircle className=" text-lg" />
                  Total Work Hours: <strong>20</strong>
                </p>
                <p className=" inline-flex items-center gap-2 text-xs text-slate-600">
                  <IoPerson className=" text-lg" />
                  Assigned Customers: <strong>2</strong>
                </p>
                <p className=" pb-4 border-b border-slate-300 w-full inline-flex items-center gap-2 text-xs text-slate-600">
                  <MdPhone className=" text-lg " />
                  Phone Number: {careworker.phoneNumber}
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger className=" mx-auto text-blue-600 text-sm mt-2 hover:bg-blue-500 hover:text-white transition-all border-2 border-blue-500 rounded-lg py-1 font-semibold px-6">
                  Assign
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" text-2xl font-semibold mb-1">
                      Assign {careworker.fullname} to{" "}
                      {selectedCustomer!.fullname}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This careworker will be assigned on imediate basis.
                      Neccessary details will be sent to the careworker.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        assignCareworkerToCustomer(
                          selectedCustomer!.uid,
                          careworker.uid
                        )
                      }
                      className=" bg-blue-600"
                    >
                      Assign
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default page;
