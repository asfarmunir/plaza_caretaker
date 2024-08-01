"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { MdHelp } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";

const managerLink = [
  {
    name: "List of Customers",
    href: "/",
  },
  {
    name: "List of Employees",
    href: "/employees",
  },
  {
    name: "Register New Employee",
    href: "/register-employee",
  },
  {
    name: " Register New Customer",
    href: "/register-customer",
  },
  {
    name: "Assign Customer ",
    href: "/assign-customer",
  },
  {
    name: "Pending Payments",
    href: "/pending-payments",
  },
  {
    name: "Pay Careworkers",
    href: "/pay-careworkers",
  },
];
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const handleSignOut = async () => {
    toast.success("Logged Out Successfully");
    router.push("/login");
  };
  return (
    <>
      {/* SideBar */}
      <div
        id="menu"
        className="hidden relative md:flex flex-col items-center antialiased px-3 lg:px-6 xl:px-12 pt-6 justify-start bg-emerald-400  h-full w-full md:w-[30%]  text-slate-300    overflow-y-auto pb-8"
      >
        <div className="flex items-center gap-2 mb-6 2xl:mb-6 border-b pb-3 2xl:pb-5 w-full justify-center">
          <div className=" bg-white overflow-hidden rounded-full w-14 2xl:w-16 h-14 2xl:h-16 p-2">
            <Image
              src="/avatar.png"
              width={80}
              height={80}
              className=" w-[50px] 2xl:w-[80px] h-[50px] 2xl:h-[60px]  object-cover object-center  "
              alt="icon"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white">Manager</h2>
            <p className="  text-white">Online</p>
          </div>
        </div>
        {managerLink.map((link, index) => (
          <Link
            key={index}
            className={`flex items-center my-[0.28rem] transition-all cursor-pointer border border-white rounded-full p-2 2xl:p-3  w-full  text-center  ${
              currentPath === link.href
                ? " bg-transparent text-white "
                : "text-slate-200 bg-blue-500 hover:bg-blue-600 "
            }`}
            href={link.href}
            //   key={link.href}
          >
            <p className="  flex-grow text-xs lg:text-sm 2xl:text-lg  font-bold capitalize ">
              {link.name}
            </p>
            <BsArrowRight className=" text-white  w-9  2xl:w-12 h-4 2xl:h-6 2xl:p-0.5  rounded-full border border-white" />
          </Link>
        ))}

        <button
          onClick={handleSignOut}
          className={
            " absolute bottom-6 2xl:bottom-10 bg-blue-500 font-bold justify-center w-[80%] items-center rounded-xl flex  gap-2 p-2.5 2xl:p-3.5 text-white  "
          }
        >
          <TbLogout2 className=" text-2xl" />
          <p className=" text-sm 2xl:text-base   ">LOG OUT</p>
        </button>
        {/* Movbile Sidebar */}

        {/* Mobile Sidebar end */}
      </div>
      <div className="flex md:hidden z-50 ">
        <input
          type="checkbox"
          id="drawer-toggle"
          className="relative sr-only peer"
          defaultChecked
        />
        <label
          htmlFor="drawer-toggle"
          className="absolute mt-[50%] opacity-80 left-2 inline-block p-4 transition-all duration-500 bg-emerald-400 rounded-lg peer-checked:rotate-180 peer-checked:left-72"
        >
          <div className="w-5 h-1 mb-2 rotate-45 bg-white rounded-lg" />
          <div className="w-5 h-1 -rotate-45 bg-white rounded-lg" />
        </label>
        <div
          className=" fixed top-0 flex flex-col items-center justify-start pt-5 px-4  transition-all duration-500 transform -translate-x-full 
        rounded-tr-3xl rounded-br-3xl  shadow-lg peer-checked:translate-x-0 bg-emerald-400 min-h-screen  text-slate-300 w-72 z-30  left-0 h-screen overflow-y-scroll pb-8"
        >
          <div className="flex items-center gap-2 mb-5 2xl:mb-8">
            <div className=" bg-white overflow-hidden rounded-full w-14 2xl:w-16 h-14 2xl:h-16 p-2">
              <Image
                src="/avatar.png"
                width={80}
                height={80}
                className=" w-[50px] 2xl:w-[80px] h-[50px] 2xl:h-[60px]  object-cover object-center  "
                alt="icon"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-white">Manager</h2>
              <p className="  text-white">Online</p>
            </div>
          </div>
          {managerLink.map((link, index) => (
            <Link
              key={index}
              className={`flex items-center my-[0.30rem] transition-all cursor-pointer border border-white rounded-full p-2 2xl:p-3  w-full  text-center  ${
                currentPath === link.href
                  ? " bg-transparent text-white "
                  : "text-slate-200 bg-blue-500 hover:bg-blue-600 "
              }`}
              href={link.href}
              //   key={link.href}
            >
              <p className="  flex-grow 2xl:text-lg  font-bold capitalize ">
                {link.name}
              </p>
              <BsArrowRight className=" text-white  w-9  2xl:w-12 h-4 2xl:h-6 2xl:p-0.5  rounded-full border border-white" />
            </Link>
          ))}

          <button
            onClick={handleSignOut}
            className={
              " absolute bottom-6 2xl:bottom-10 bg-blue-500 font-bold justify-center w-[80%] items-center rounded-xl flex  gap-2 p-2.5 2xl:p-3.5 text-white  "
            }
          >
            <TbLogout2 className=" text-2xl" />
            <p className=" text-sm 2xl:text-base   ">LOG OUT</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
