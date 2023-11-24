import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimateButton from "../animate-button";
const BillboardItem = ({ billboard }: { billboard: Doc<"billboard"> }) => {
  return (
    <motion.div className=" relative w-full h-full flex items-center justify-center">
      <motion.img
        whileInView={{ scale: 1.1 }}
        transition={{ duration: 5 }}
        src={billboard.imageUrl}
        alt="billboard"
        className=" object-cover absolute w-full h-full"
      />
      <div className=" max-w-4xl w-[60dvw] text-center absolute flex flex-col items-center justify-center text-white">
        <span className="text-xl font-semibold mb-2 md:mb-[14px] text-white">
          {billboard.producer}
        </span>
        <span className="lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 md:mb-5 text-white lg:leading-tight xl:leading-tight 2xl:leading-tight">
          {billboard.title}
        </span>
        <span className="md:text-xl mb-3 md:mb-7 text-white">
          {billboard.subTitle}
        </span>
        <AnimateButton
          text={
            billboard.order === "preorder"
              ? "Pre-Order"
              : billboard.order === "order"
              ? "Order Now"
              : "Comming Soon"
          }
        />
      </div>
    </motion.div>
  );
};

export default BillboardItem;
