import { Tooltip } from "@nextui-org/react";

const TooltipAction = ({
  children,
  tooltip,
  onClick,
}: {
  children: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}) => {
  return (
    <Tooltip
      classNames={{
        base: [
          // arrow color
          "before:bg-neutral-400 dark:before:bg-white rounded-none",
        ],
        content: [
          "py-1 px-4 shadow-xl font-semibold",
          "text-black bg-gradient-to-br from-white to-neutral-300",
        ],
      }}
      placement="left"
      content={tooltip}
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      <div
        onClick={onClick}
        className=" rounded-full  shadow-inner dark:shadow-white shadow-black border-1 p-3 group hover:bg-[#1A2FFB] hover:border-[#1A2FFB] hover:scale-110 duration-500"
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default TooltipAction;
