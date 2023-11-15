import { cn } from "@/lib/utils";

const UnderlineText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("group cursor-pointer flex-col flex", className)}>
      {children}
      <div className=" dark:bg-white bg-black group-hover:w-full h-[1px] w-0 duration-300" />
    </div>
  );
};

export default UnderlineText;
