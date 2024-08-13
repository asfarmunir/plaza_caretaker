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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ThreeDots } from "react-loader-spinner";
import { IEmployee } from "@/lib/types";
import { getAllCareworkers, payCareworker } from "@/lib/cruds/employeeCrud";
import { BsClipboard2CheckFill } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const data = await getAllCareworkers();
      setEmployees(data);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const getMonthAndYear = () => {
    const today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    return `${month} ${year}`;
  };

  const submitHandler = async (id: string) => {
    const date = getMonthAndYear();
    const data = {
      month: date,
      salary: amount,
    };
    toast.promise(payCareworker(id, data), {
      loading: "Paying Careworker",
      success: "Careworker Paid",
      error: "Salary has been paid for this month",
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <main className="flex flex-col items-center justify-between w-full  ">
      <div className="  p-5 px-3 md:px-6 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-xl border-b pb-3 w-full 2xl:text-2xl mb-5">
          Pay Careworkers
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
                Total Work Time
              </TableHead>
              <TableHead className=" text-white text-xs text-nowrap text-center 2xl:text-sm font-bold">
                Salaries
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
                    ? employee.workTime
                        .reduce((acc, curr) => acc + curr.minutes / 60, 0)
                        .toFixed(2)
                    : 0}{" "}
                  hours
                </TableCell>
                <TableCell className="border-b pb-6 pt-6 flex items-center justify-center border-slate-200">
                  <AlertDialog>
                    <AlertDialogTrigger className=" text-white  inline-flex items-center gap-3 hover:text-slate-100 transition-all border-2 bg-blue-600 rounded-xl py-3 font-semibold px-8">
                      <BsClipboard2CheckFill className=" text-xl text-white" />
                      Pay Careworker
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" z-30">
                      <div className=" pb-5 border-b  w-full">
                        <AlertDialogTitle>
                          Pay{" "}
                          <span className="font-bold uppercase mx-1 text-blue-500">
                            {employee.fullname}
                          </span>{" "}
                          for{" "}
                          <span className=" bg-slate-100 text-slate-500 px-3 py-2 rounded-md mx-2">
                            {" "}
                            {getMonthAndYear()}{" "}
                          </span>
                        </AlertDialogTitle>
                      </div>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="border border-slate-200 bg-slate-50 text-sm w-full px-3 py-2 rounded-lg"
                      />

                      <div className="flex w-full justify-center items-center gap-4 pb-4">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          onClick={() => submitHandler(employee.uid)}
                          className=" bg-blue-600"
                        >
                          Approve
                        </Button>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>{" "}
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
