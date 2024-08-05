"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { FaAngleDown } from "react-icons/fa6";
import { PiWarningOctagonLight } from "react-icons/pi";
import { ThreeDots } from "react-loader-spinner";
import { IEmployee } from "@/lib/types";
import { fetchAllEmployees } from "@/lib/cruds/employeeCrud";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const data = await fetchAllEmployees();
      setEmployees(data);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full  ">
      <div className="  p-5 px-3 md:px-6 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-xl border-b pb-3 w-full 2xl:text-2xl mb-5">
          List of Registered Customers
        </h2>
        <Table>
          {!employees.length && !loading && (
            <TableCaption className=" py-3"> No employees added</TableCaption>
          )}
          <TableHeader className=" bg-blue-500/80">
            <TableRow>
              <TableHead className=" text-white font-bold text-center">
                PID
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Fullname
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Email
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Phone Number
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Date of Birth
              </TableHead>
              <TableHead className=" text-center text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Employee Type
              </TableHead>

              <TableHead className=" text-center  text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Gender
              </TableHead>
              <TableHead className=" text-center  text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell className="font-thin border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] text-center text-slate-500 border-slate-200">
                  #{index + 1}
                </TableCell>
                <TableCell className="font-thin capitalize border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.fullname}
                </TableCell>
                <TableCell className="font-thin  border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.email}
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.phoneNumber}
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.dateOfBirth}
                </TableCell>
                <TableCell className="font-semibold capitalize text-center border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.employeeType}
                </TableCell>
                <TableCell className="font-thin capitalize border-b pb-6 pt-6 text-xs 2xl:text-sm truncate max-w-[100px] border-slate-200">
                  {employee.gender}
                </TableCell>

                <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="bg-slate-50 my-1 font-semibold text-slate-900 text-center w-full px-8 py-3">
                        Restrict
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="bg-red-100 my-1 font-semibold text-red-700 text-center w-full px-8 py-3">
                        Delete
                      </DropdownMenuItem>
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
