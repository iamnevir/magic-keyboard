"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const OptionPickerItem = ({
  options,
  selectedOption,
  onChange,
}: {
  options: {
    name: string;
    option: {
      price?: number | undefined;
      quantity?: number | undefined;
      image?: string | undefined;
      name: string;
    }[];
  };
  selectedOption?: { key: string; value: string };
  onChange: ({ key, value }: { key: string; value: string }) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <span className=" font-semibold text-sm">
        {options.name}
        {": "}
        <span className=" font-normal text-base">{selectedOption?.value}</span>
      </span>
      <div className="flex items-center gap-2 text-sm">
        {options.name === "Color"
          ? options.option.map((item, index) => (
              <div
                onClick={() =>
                  onChange({ key: options.name, value: item.name })
                }
                key={index}
                className={cn(
                  "hover:scale-105 rounded-[10px] border shadow-md dark:shadow-white shadow-black px-3 py-2 dark:border-black duration-500 cursor-pointer hover:dark:border-white hover:border-black",

                  selectedOption?.value === item.name
                    ? "border-2 dark:border-white border-black"
                    : ""
                )}
              >
                <Image
                  src={item.image ? item.image : ""}
                  alt="color"
                  className=" object-contain w-[50px] h-[50px]"
                  width={70}
                  height={70}
                />
              </div>
            ))
          : options.option.map((item, index) => (
              <div
                onClick={() =>
                  onChange({ key: options.name, value: item.name })
                }
                key={index}
                className={cn(
                  "hover:scale-105 border rounded-[10px] shadow-md dark:shadow-slate-400 shadow-black dark:border-black px-3 py-2 duration-500 cursor-pointer hover:dark:border-white hover:border-black",
                  selectedOption?.value === item.name
                    ? "border-2 dark:border-white border-black"
                    : ""
                )}
              >
                {item.name}
              </div>
            ))}
      </div>
    </div>
  );
};

export default OptionPickerItem;
