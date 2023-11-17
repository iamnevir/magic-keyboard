import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import AnimateButton from "../animate-button";
import { SwipeDirection } from "./product-list";
import { fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";
const News = () => {
  const news = [
    {
      thumnail:
        "https://utfs.io/f/69024a7a-0f75-40bd-91f1-64a5602bf1a7-n1hugj.jpg",
      title:
        "Epomaker TH80-X: Redefining the Keyboard Experience with Unprecedented Features",
      subTitle:
        "Epomaker Unveils theTH80-X - With A Fully Updated outlook and Highly Playable Rotary Knob  ...",
      createdAt: "OCT 23, 2023",
    },
    {
      thumnail:
        "https://utfs.io/f/5132bd20-98f6-43d7-aba2-b4d10779af8d-n1huhe.jpg",
      title:
        "Discover Epomaker's Temple Keycap Set: A Journey Through Ancient Civilizations",
      subTitle:
        "Epomaker Launched Group Buy Event for the Newly Created - Temple Keycap Set   In...",
      createdAt: "OCT 13, 2023",
    },
    {
      thumnail:
        "https://utfs.io/f/5132bd20-98f6-43d7-aba2-b4d10779af8d-n1huhe.jpg",
      title:
        "Discover Epomaker's Temple Keycap Set: A Journey Through Ancient Civilizations",
      subTitle:
        "Epomaker Launched Group Buy Event for the Newly Created - Temple Keycap Set   In...",
      createdAt: "OCT 13, 2023",
    },
    {
      thumnail:
        "https://utfs.io/f/5132bd20-98f6-43d7-aba2-b4d10779af8d-n1huhe.jpg",
      title:
        "Discover Epomaker's Temple Keycap Set: A Journey Through Ancient Civilizations",
      subTitle:
        "Epomaker Launched Group Buy Event for the Newly Created - Temple Keycap Set   In...",
      createdAt: "OCT 13, 2023",
    },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeIn("right", "spring", 0.1, 1)}
      className=" sm:ml-10 sm:w-[55%] w-full"
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        className=" w-full h-full items-center flex justify-center"
      >
        <SwipeDirection direction="left" className=" sm:top-[30%] top-[20%]" />
        <SwipeDirection direction="right" className=" sm:top-[30%] top-[20%]" />

        {news.map((item) => (
          <SwiperSlide>
            <div className=" w-[350px] h-full bg-transparent space-y-4 sm:ml-0 ml-5">
              <Image
                src={item.thumnail}
                width={350}
                height={200}
                alt="new"
                className=" w-[350px] h-[200px]"
              />
              <div className=" space-y-2 text-center items-center flex flex-col">
                <div className=" font-semibold text-xs">{item.createdAt}</div>
                <div className=" font-semibold hover:text-zinc-500 text-base">
                  {item.title}
                </div>
                <div className=" text-sm text-zinc-600">{item.subTitle}</div>
                <div className=" w-[150px]">
                  <AnimateButton color="white" text="Read More" />
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
