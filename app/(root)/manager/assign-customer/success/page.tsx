import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center pt-16 flex-col  justify-start min-h-screen w-full">
      <Image src="/success.gif" alt="success" width={300} height={300} />
      <h2 className=" text-lg md:text-2xl mt-5 font-bold text-blue-600 tracking-wider">
        Careworker Assigned Successfully
      </h2>
    </div>
  );
};

export default page;
