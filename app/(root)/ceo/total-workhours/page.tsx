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
import { FaAngleDown } from "react-icons/fa6";
import { PiWarningOctagonLight } from "react-icons/pi";
import { ThreeDots } from "react-loader-spinner";
import { IEmployee } from "@/lib/types";
import { getAllCareworkers } from "@/lib/cruds/employeeCrud";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const data = await getAllCareworkers();
      setEmployees(data);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full  ">
      <div className="  p-5 px-3 md:px-6 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-xl border-b pb-3 w-full 2xl:text-2xl mb-5">
          Total Workhours
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
                Shifts Worked
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Number of Clients
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap 2xl:text-sm font-bold">
                Total Workhours
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell className="font-thin border-b pb-6 pt-6 text-sm 2xl:text-base truncate max-w-[100px] text-center text-slate-500 border-slate-200">
                  #{index + 1}
                </TableCell>
                <TableCell className="font-bold text-blue-600 capitalize border-b pb-6 pt-6 text-base 2xl:text-lg truncate max-w-[200px] border-slate-200">
                  {employee.fullname}
                </TableCell>
                <TableCell className="font-thin  border-b pb-6 pt-6  truncate max-w-[100px] border-slate-200">
                  {employee.workTime ? employee.workTime.length : 0} Shifts
                </TableCell>
                <TableCell className="font-thin border-b pb-6 pt-6 truncate max-w-[100px] border-slate-200">
                  {employee.assignedCustomers
                    ? employee.assignedCustomers.length
                    : 0}{" "}
                  {""} Clients
                </TableCell>
                <TableCell className="font-semibold border-b pb-6 pt-6  truncate max-w-[100px] border-slate-200">
                  {employee.workTime
                    ? employee.workTime.reduce(
                        (acc, curr) => acc + curr.minutes,
                        0
                      )
                    : 0}{" "}
                  minutes <br />
                  <span className="text-base font-semibold text-blue-600">
                    or
                  </span>{" "}
                  <br />
                  {employee.workTime
                    ? employee.workTime.reduce(
                        (acc, curr) => acc + curr.minutes / 60,
                        0
                      )
                    : 0}{" "}
                  hours
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
