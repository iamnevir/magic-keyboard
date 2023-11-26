import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

export const SwipeDirection = ({
  direction,
  className,
  ArrowClassName,
  onMouseEnter,
  onMouseLeave,
}: {
  direction: "left" | "right";
  className?: string;
  ArrowClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() =>
        direction === "left" ? swiper.slidePrev() : swiper.slideNext()
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        direction === "left"
          ? "absolute left-0 top-[50%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
          : "absolute right-0 top-[50%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3",
        className
      )}
    >
      {direction === "left" ? (
        <ChevronLeft
          className={cn(" w-8 h-8 dark:text-black", ArrowClassName)}
        />
      ) : (
        <ChevronRight
          className={cn(" w-8 h-8 dark:text-black", ArrowClassName)}
        />
      )}
    </button>
  );
};
