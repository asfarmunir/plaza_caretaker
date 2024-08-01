import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { RiDashboardFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`h-screen  flex `}>
      <Sidebar />

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
