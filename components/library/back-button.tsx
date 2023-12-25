"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="absolute text-white left-10 top-10 w-10 h-5 z-[99] cursor-pointer"
      onClick={() => router.push("/")}
    >
      back
    </div>
  );
};
