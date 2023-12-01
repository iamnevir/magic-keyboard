"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BillboardItem from "./billboard-item";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Billboard() {
  const billboards = useQuery(api.billboard.getBillboard);
  return (
    <div className=" w-full h-[100dvh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className=" w-full h-full"
      >
        {billboards?.map((billboard) => (
          <SwiperSlide key={billboard._id}>
            <BillboardItem billboard={billboard} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
