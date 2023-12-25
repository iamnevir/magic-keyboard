"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import CategoryItem from "./category-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const CarouselCategoryList = () => {
  const categories = useQuery(api.category.getCategories);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-clip">
      <div className=" font-medium text-4xl sm:my-20 my-5">
        Shop by Categories
      </div>
      <div className=" w-full h-full pl-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            450: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },

            1224: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
          className=" w-full h-full"
        >
          {categories?.map((category, index) => (
            <SwiperSlide key={index} className=" hover:scale-110 duration-500">
              <CategoryItem category={category} key={category._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselCategoryList;
