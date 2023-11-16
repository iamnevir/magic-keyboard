import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const AnimateButton = ({
  text,
  onClick,
  color,
}: {
  text: string;
  onClick?: () => void;
  color?: "black" | "white";
}) => {
  return (
    <div
      className={cn(
        color === "white"
          ? "dark:bg-zinc-950 bg-zinc-200"
          : color === "black"
          ? " dark:bg-slate-200 bg-zinc-950"
          : "bg-white dark:bg-black",
        " relative group flex space-x-2  items-center rounded-full  px-5 py-[14px] transition-all  duration-500 cursor-pointer"
      )}
    >
      <div className=" left-2 absolute rounded-full translate-x-3 dark:bg-white group-hover:translate-x-0 w-2 h-2 bg-black group-hover:w-full group-hover:h-full group-hover:bg-[#1A2FFB] group-hover:absolute duration-300 group-hover:left-0" />
      <span className=" font-semibold translate-x-4 dark:text-white group-hover:translate-x-0 text-black uppercase whitespace-nowrap z-10 group-hover:text-white text-sm duration-500">
        {text}
      </span>
      <ArrowRight className=" opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 text-black z-10 group-hover:text-white duration-400" />
    </div>
  );
};

export default AnimateButton;
