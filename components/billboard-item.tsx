import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import Image from "next/image";
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
      <div className=" max-w-4xl w-[60vw] text-center absolute flex flex-col items-center justify-center text-white">
        <span className="text-xl font-semibold mb-2 md:mb-[14px] text-white">
          {billboard.producer}
        </span>
        <span className="lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 md:mb-5 text-white lg:leading-tight xl:leading-tight 2xl:leading-tight">
          {billboard.title}
        </span>
        <span className="md:text-xl mb-3 md:mb-7 text-white">
          {billboard.subTitle}
        </span>
        <div
          className="inline-block rounded-[6px] border-white border-1 items-center px-5 py-2 hover:bg-white hover:text-black  duration-500 cursor-pointer hover:rounded-[10px]
         hover:scale-105"
        >
          <span className=" font-bold uppercase">
            {billboard.order === "preorder"
              ? "Pre-Order"
              : billboard.order === "order"
              ? "Order Now"
              : "Comming Soon"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BillboardItem;
