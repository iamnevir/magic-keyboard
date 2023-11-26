import { cn } from "@/lib/utils";

const QuantityPicker = ({
  quantity,
  plus,
  minus,
  size,
}: {
  quantity: number;
  plus: () => void;
  minus: () => void;
  size?: "sm" | "md";
}) => {
  return (
    <div
      className={cn(
        "flex items-center shadow-md justify-between dark:shadow-slate-500 shadow-black/50 rounded-[4px]  bg-white dark:bg-black",
        size === "md" ? "px-2 mx-1" : "px-1"
      )}
    >
      <div
        onClick={minus}
        className={cn(
          "  cursor-pointer hover:bg-blue-400 hover:scale-105 duration-500 rounded-full ",
          size === "md" ? " h-8 w-8 p-2" : "h-5 w-5 p-1"
        )}
      >
        <svg
          viewBox="0 -12 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Icon-Set-Filled"
            transform="translate(-414.000000, -1049.000000)"
            fill="#000000"
          >
            <path
              d="M442,1049 L418,1049 C415.791,1049 414,1050.79 414,1053 C414,1055.21 415.791,1057 418,1057 L442,1057 C444.209,1057 446,1055.21 446,1053 C446,1050.79 444.209,1049 442,1049"
              id="minus"
              className=" dark:fill-white"
            ></path>
          </g>
        </svg>
      </div>

      <span
        className={cn(
          " dark:text-white font-bold  text-black",
          size === "md" ? "m-2 text-lg" : "mx-1 text-base"
        )}
      >
        {quantity}
      </span>
      <div
        onClick={plus}
        className={cn(
          "  cursor-pointer hover:bg-blue-400 hover:scale-105 duration-500 rounded-full ",
          size === "md" ? " h-8 w-8 p-2" : "h-5 w-5 p-1"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-362.000000, -1037.000000)" fill="#000000">
            <path
              className="dark:fill-white"
              d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default QuantityPicker;
