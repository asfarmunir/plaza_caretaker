import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { cookies } from "next/headers";

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
    name: "Profit/Loss",
    href: "/profit-loss",
  },
  {
    name: "Total Work Hours",
    href: "/total-work-hours",
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const userRole = cookieStore.get("userRole");
  console.log("🚀 ~ userRole:", userRole);

  return (
    <main className={`h-screen  flex `}>
      <Sidebar navlinks={managerLink} employeeType={"userRole"} />

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
