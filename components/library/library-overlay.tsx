"use client";
import { useRouter } from "next/navigation";

const LibraryOverLay = () => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/")}
        className=" absolute left-10 top-10 cursor-pointer z-[99999]"
      >
        back
      </div>
      <div className=" absolute right-5 bottom-5 cursor-pointer z-[99999]">
        ©2023
      </div>
      <div className=" absolute left-5 bottom-5 cursor-pointer z-[99999]">
        Nevir Studio
      </div>
    </>
  );
};

export default LibraryOverLay;
