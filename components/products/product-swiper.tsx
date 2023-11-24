import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { SwipeDirection } from "../root/swiper-navigation";
import Image from "next/image";
import { Thumbs } from "swiper/modules";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ListImage, cn } from "@/lib/utils";
import "photoswipe/style.css";
import ProductImageGallery from "./product-image-gallery";

const ProductSwiper = ({ product }: { product: Doc<"product"> }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [hoverImage, setHoverImage] = useState(false);

  const images = ListImage({ product });
  return (
    <div className="w-[50%] h-full ">
      <>
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[Thumbs]}
          className={cn(" w-[650px] h-full items-center flex justify-center")}
        >
          <>
            <SwipeDirection
              direction="left"
              className={`${
                hoverImage ? "left-0" : " -left-14"
              }  sm:top-[50%] top-[20%] transition-all duration-100 border-[0.5px]`}
              ArrowClassName="text-black"
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
            />
            <SwipeDirection
              direction="right"
              className={`${
                hoverImage ? "right-0" : " -right-14"
              }  sm:top-[50%] top-[20%] transition-all duration-100 border-[0.5px]`}
              ArrowClassName="text-black"
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
            />
          </>

          {images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={ProductImageGallery({ index, images: product.images })}
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                className={cn(
                  " w-[650px] h-full bg-transparent space-y-4  hover:cursor-zoom-in"
                )}
              >
                <Image
                  src={item ? item : ""}
                  width={650}
                  height={650}
                  alt="image"
                  objectFit="contain"
                  className=" w-[650px] h-[650px] object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mySwiper  mt-2"
        >
          {images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" cursor-pointer w-[120px] p-1 border-black h-full bg-transparent space-y-4 sm:ml-5 ml-[5dvw]">
                <Image
                  src={item ? item : ""}
                  width={110}
                  height={110}
                  alt="image"
                  objectFit="contain"
                  className=" w-[110px] h-[110px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default ProductSwiper;
