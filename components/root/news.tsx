"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import AnimateButton from "../animate-button";
import { fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";
import { SwipeDirection } from "./swiper-navigation";
import { cn, formatVietnameseDate } from "@/lib/utils";
import { Doc } from "@/convex/_generated/dataModel";
import getNews from "@/actions/getNews";
const News = ({
  className,
  news,
  slidesPerView,
}: {
  className?: string;
  news?: Doc<"post">[];
  slidesPerView?: number;
}) => {
  const isMobile = window.screen.width < 768;
  const newsList = news ? news : getNews();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeIn("right", "spring", 0.1, 1)}
      className={cn(" sm:ml-10 sm:w-[55%] w-full", className)}
    >
      <Swiper
        slidesPerView={slidesPerView ? (!isMobile ? slidesPerView : 1) : 1}
        spaceBetween={10}
        breakpoints={
          !slidesPerView
            ? {
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                824: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1224: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }
            : isMobile
            ? {
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
              }
            : {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }
        }
        className=" w-full h-full items-center flex justify-center"
      >
        <SwipeDirection direction="left" className=" sm:top-[20%] top-[20%]" />
        <SwipeDirection direction="right" className=" sm:top-[20%] top-[20%]" />

        {newsList?.map((item) => (
          <SwiperSlide key={item.thumnail}>
            <div className="  w-[350px] h-full py-2 bg-transparent  space-y-4 sm:ml-5 ml-[5dvw]">
              <Image
                src={item.thumnail}
                width={350}
                height={200}
                alt="new"
                className="rounded-[10px] cursor-pointer w-[350px] h-[200px] "
              />
              <div className="  space-y-2 text-center items-center flex flex-col">
                <div className=" font-semibold text-xs">
                  {formatVietnameseDate(item._creationTime)}
                </div>
                <div className="cursor-pointer font-semibold hover:text-zinc-500 duration-500 text-base">
                  {item.title}
                </div>
                <div className=" text-sm text-zinc-600">{item.subTitle}</div>
                <div className=" w-[150px]">
                  <AnimateButton
                    color="white"
                    className="shadow-md dark:shadow-slate-500 shadow-black/50 "
                    text="Read More"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default News;
