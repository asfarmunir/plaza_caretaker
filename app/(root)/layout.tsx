"use client";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const managerLinks = [
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
    href: "/manager/assign-customer",
  },
  {
    name: "Pending Payments",
    href: "/manager/pending-payments",
  },
  {
    name: "Pay Careworkers",
    href: "/manager/pay-careworkers",
  },
];
const ceoLinks = [
  {
    name: "List of Customers",
    href: "/",
  },
  {
    name: "List of Employees",
    href: "/employees",
  },
  {
    name: "Profit/Loss",
    href: "/ceo/profit-loss",
  },
  {
    name: "Total Work Hours",
    href: "/ceo/total-workhours",
  },
  {
    name: "Add New Employee",
    href: "/register-employee",
  },
];

const carewokerLinks = [
  {
    name: "Assigned Customers",
    href: "/careworker/assigned-customers",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string>("");
  const [links, setLinks] = useState<{ name: string; href: string }[]>([]);

  useEffect(() => {
    const user = Cookies.get("userRole");
    setRole(user!);
    if (user === "ceo") {
      setLinks(ceoLinks);
    }
    if (user === "manager") {
      setLinks(managerLinks);
    }
    if (user === "careworker") {
      setLinks(carewokerLinks);
    }
  }, []);

  return (
    <main className={`h-screen  flex `}>
      <Sidebar navlinks={links} employeeType={role} />

      <section className=" relative w-full md:w-[70%]  overflow-y-auto flex  flex-col items-start justify-start pb-3">
        <div className="flex items-center justify-center w-full py-3">
          <Image src="/logo.png" alt="Profile" width={250} height={250} />
        </div>
        {children}
        <Image
          src="/vector.png"
          alt="Profile"
          width={90}
          height={90}
          className=" -z-10 fixed bottom-0 right-3 lg:right-6"
        />
      </section>
    </main>
  );
}
