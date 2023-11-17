"use client";

import { Button } from "@nextui-org/react";
import Lottie from "lottie-react";
import errorIcon from "@/public/404.json";
import AnimateButton from "@/components/animate-button";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <div className="h-full w-full mt-[20vh] items-center flex flex-col">
      <Lottie animationData={errorIcon} className="" />
      <div className=" text-[5vw] font-bold">Oách🤣!! Nhầm rồii</div>
      <AnimateButton
        onClick={() => router.back()}
        color="white"
        text="Go Back"
      />
    </div>
  );
};

export default Error;
