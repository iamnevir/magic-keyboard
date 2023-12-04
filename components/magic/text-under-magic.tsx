"use client";
import { useStore } from "@/hooks/use-valtio-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Children } from "react";
import { BackButton } from "../library/back-button";

const TextUnderMagic = () => {
  const state = useStore();
  return (
    <div className=" w-full h-full ">
      <div className={cn(" bottom-0 w-full h-10 left-0 absolute ")}>
        <a
          href="https://github.com/iamnevir"
          className=" absolute  sm:bottom-10 sm:left-10 bottom-4 left-4 text-sm"
        >
          NEVIR.RN
          <br />
          DEV COLLECTIVE
        </a>
        <div className=" absolute sm:bottom-10 sm:right-10 bottom-4 right-4 text-sm">
          05/02/2023
        </div>
      </div>
      <BackButton />
      <div
        className={cn(
          state.open
            ? "bg-gradient-to-br from-white/20 to-white/0 backdrop-blur-lg"
            : "bg-transparent",
          " info top-[50%] left-[80%] p-3 sm:w-[400px] w-[200px] absolute sm:pl-10 pl-2 border-l-1 border-black select-none"
        )}
      >
        <h1 className="font-mono text-[2em] mb-8">RK65</h1>
        <List open={state.open}>
          <h3 className=" font-extrabold sm:text-7xl text-3xl">NV65</h3>
          <h3 className=" font-extrabold sm:text-7xl text-3xl">“SUGAR”</h3>
          <h3 className=" font-extrabold sm:text-7xl text-3xl">
            <span className="accent">PEGASUS</span>
          </h3>
          <h4 className=" font-light text-lg my-2">Magic Keyboard</h4>
          <p className="price inline-block text-white bg-black rounded-full py-1 px-2 font-mono">
            $98.97
          </p>
          <p className=" mb-5 text-base pt-2 line-clamp-5  sm:line-clamp-none">
            Year after year, Pegasus has proven itself in the hands of plastic
            addicts everywhere. Now our most trusted style returns with new
            improvements that makes it more of itself than ever. Meet
            trustworthy, comfortable, Magic Keyboard is always ready to go.
          </p>
        </List>
      </div>
    </div>
  );
};
const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0 },
};
function List({ children, open }: any) {
  return (
    <motion.ul
      className="flex flex-col overflow-hidden "
      variants={container}
      initial="hidden"
      animate={open ? "show" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li className=" block overflow-hidden">
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

export default TextUnderMagic;
