"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICustomer } from "@/lib/types";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  getCustomersWithPendingPayments,
  updatePaymentStatus,
} from "@/lib/cruds/customerCrud";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ICustomer[]>([]);

  useEffect(() => {
    const fetchcustomer = async () => {
      setLoading(true);
      const data = await getCustomersWithPendingPayments();
      setCustomer(data);
      setLoading(false);
    };
    fetchcustomer();
  }, []);

  const updateStatus = async (customerId: string) => {
    toast.promise(updatePaymentStatus(customerId, true), {
      loading: "Updating Payment Status",
      success: "Payment Status Updated",
      error: "Failed to Update Payment Status",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <main className="flex flex-col items-center justify-between w-full  ">
      <div className="  p-5 px-3 md:px-6 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-xl border-b pb-3 w-full 2xl:text-2xl mb-3 2xl:mb-5">
          Pending Payments of Customers
        </h2>
        <Table>
          {!customer.length && !loading && (
            <TableCaption className=" py-3"> No Pending Payment</TableCaption>
          )}{" "}
          <TableHeader className=" ">
            <TableRow className="">
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg text-nowrap text-center font-bold">
                Customer Name
              </TableHead>
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg  text-nowrap text-center font-bold">
                Required Service Time
              </TableHead>
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg text-nowrap text-center font-bold">
                Amount
              </TableHead>
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg text-nowrap text-center font-bold">
                Status
              </TableHead>
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg text-nowrap text-center font-bold">
                payable Amount
              </TableHead>
              <TableHead className=" text-blue-600 capitalize   2xl:text-lg text-nowrap text-center font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-thin border-b capitalize pb-6 pt-6 text-sm 2xl:text-base text-center truncate max-w-[90px] border-slate-200">
                  {customer.fullname}
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 text-sm 2xl:text-base text-center truncate max-w-[90px] border-slate-200">
                  <span className="font-semibold mr-1.5">
                    {customer.totalTimeRequired}
                  </span>
                  minutes a day
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 text-sm 2xl:text-base text-center truncate max-w-[90px] border-slate-200">
                  {customer.amount}
                </TableCell>

                <TableCell className="border-b pb-6 pt-6 flex items-center justify-center border-slate-200">
                  <p className=" py-1.5 px-4 text-xs rounded-3xl bg-yellow-100 text-yellow-600 font-semibold">
                    pending
                  </p>
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 text-sm 2xl:text-base text-center truncate max-w-[90px] border-slate-200">
                  {parseInt(customer.amount) *
                    parseInt(customer.totalTimeRequired) *
                    30}{" "}
                  £
                </TableCell>
                <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" mr-8">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <button
                        onClick={() => updateStatus(customer.uid)}
                        className="bg-green-100 my-1 text-xs font-semibold text-green-700 text-center w-full px-6 py-2"
                      >
                        Mark as Paid
                      </button>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className=" w-full flex py-4 justify-center">
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#00000"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {/* <div className=" w-full flex items-center justify-between mt-3 gap-4">
          <p className=" font-semibold text-xs md:text-sm text-slate-800">
            Total Post: {count}
          </p>
          <div className="hidden md:flex items-center gap-2">
            <p className=" font-semibold text-sm text-nowrap text-slate-800 mr-2">
              1 - {Math.ceil(count / pageLimit)} of Pages
            </p>

            <button
              disabled={page === 1}
              onClick={handlePrevious}
              className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
            >
              <FaArrowLeft />
            </button>
            <div className="flex gap-2">
              {Array.from(
                { length: Math.ceil(count / pageLimit) },
                (_, index) => (
                  <button
                    key={index}
                    className={`border disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-300  disabled:cursor-not-allowed border-slate-500  w-10 h-10 font-thin flex items-center justify-center    rounded-lg ${
                      page === index + 1
                        ? "bg-primary  text-white"
                        : "bg-white  text-black"
                    }`}
                    // disabled={page === index + 1}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
            <button
              disabled={page >= Math.ceil(count / pageLimit)}
              onClick={handleNext}
              className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
            >
              <FaArrowRight />
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
