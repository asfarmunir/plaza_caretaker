"use client";
import {
  getCustomersWithCompletedPayments,
  getCustomersWithPendingPayments,
} from "@/lib/cruds/customerCrud";
import { ICustomer } from "@/lib/types";
import { useEffect, useState } from "react";
import React from "react";
import { MutatingDots } from "react-loader-spinner";

const page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pendingPayments, setPendingPayments] = useState<ICustomer[] | null>(
    []
  );
  const [recievedPayments, setRecievedPayments] = useState<ICustomer[] | null>(
    []
  );

  useEffect(() => {
    setLoading(true);
    const fetchPayments = async () => {
      const data = await getCustomersWithPendingPayments();
      setPendingPayments(data);
      const recievedPayments = await getCustomersWithCompletedPayments();
      setRecievedPayments(recievedPayments);
    };
    fetchPayments();
    setTimeout(() => setLoading(false), 1300);
  }, []);

  console.log("pendingPayments", pendingPayments);
  console.log("recievedPayments", recievedPayments);

  const totalRecievedPayments = recievedPayments?.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  const totalWorkHoursForRecievedPayments = recievedPayments?.reduce(
    (acc, curr) => acc + parseInt(curr.totalTimeRequired),
    0
  );

  const totalPendingPayments = pendingPayments?.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  const totalWorkHoursForPendingPayments = pendingPayments?.reduce(
    (acc, curr) => acc + parseInt(curr.totalTimeRequired),
    0
  );
  return (
    <div className="flex relative flex-col px-4 md:px-12 py-6 w-full ">
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
      <h1 className=" text-3xl font-bold w-full pb-4 border-b mb-4">
        Finances
      </h1>
      <div className=" w-full bg-slate-50 p-4 rounded-2xl shadow mt-4 py-8 ">
        <h2 className="text-2xl font-semibold text-yellow-500 w-full text-center pb-3 border-b mb-5">
          Pending Payments
        </h2>
        <div className="flex flex-col-reverse gap-8 md:flex-row items-center justify-between">
          <div className="flex flex-col items-start gap-1 ">
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Customers:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {pendingPayments?.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Work Hours:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {totalWorkHoursForPendingPayments}{" "}
                <span className=" text-xs font-thin italic text-slate-500">
                  per day
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">Expected Revenue :</h3>
            <p className="text-xl font-semibold text-yellow-500">
              £{totalPendingPayments ? totalPendingPayments * 30 : 0}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full bg-slate-50 p-4 rounded-2xl shadow mt-4 py-8 ">
        <h2 className="text-2xl font-semibold text-green-500 w-full text-center pb-3 border-b mb-5">
          PROFITS
        </h2>
        <div className="flex flex-col-reverse gap-8 md:flex-row items-center justify-between">
          <div className="flex flex-col items-start gap-1 ">
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Customers:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {recievedPayments?.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Work Hours:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {totalWorkHoursForRecievedPayments}{" "}
                <span className=" text-xs font-thin italic text-slate-500">
                  per day
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">Total Revenue:</h3>
            <p className="text-xl font-semibold text-green-500">
              £{totalRecievedPayments ? totalRecievedPayments * 30 : 0}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full bg-slate-50 p-4 rounded-2xl shadow mt-4 py-8 ">
        <h2 className="text-2xl font-semibold text-red-500 w-full text-center pb-3 border-b mb-5">
          Outgoings
        </h2>
        <div className="flex flex-col-reverse gap-8 md:flex-row items-center justify-between">
          <div className="flex flex-col items-start gap-1 ">
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Customers:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {recievedPayments?.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className=" font-semibold">Total Work Hours:</h3>
              <p className="text-lg font-semibold text-blue-500">
                {totalWorkHoursForRecievedPayments}{" "}
                <span className=" text-xs font-thin italic text-slate-500">
                  per day
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">Revenue Loss:</h3>
            <p className="text-xl font-semibold text-red-500">
              £{totalRecievedPayments ? totalRecievedPayments * 30 : 0}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
