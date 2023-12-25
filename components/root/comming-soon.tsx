"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CommingSoonItem from "./comming-soon-item";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
const CommingSoon = () => {
  const router = useRouter();
  const commingSoons = useQuery(api.product.getCommingProducts);
  return (
    <div className=" w-[100dvw] h-full py-20 overflow-hidden ">
      <span className=" text-3xl w-full flex justify-center items-center py-10">
        Comming Soon
      </span>
      <motion.div
        className=" flex relative h-full w-full flex-col"
        variants={{
          initial: {
            opacity: 0,
          },
          enter: (i) => ({
            opacity: 1,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: i },
          }),
        }}
        initial="initial"
        animate="enter"
      >
        {commingSoons?.map((el, index) => (
          <div key={index} onClick={() => router.push(`products/${el.slug}`)}>
            <CommingSoonItem data={el} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CommingSoon;
