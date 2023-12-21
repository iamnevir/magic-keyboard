import { Swiper, SwiperSlide } from "swiper/react";
import { SwipeDirection } from "../root/swiper-navigation";
import Image from "next/image";
import { Thumbs } from "swiper/modules";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ListImage, cn } from "@/lib/utils";
import "photoswipe/style.css";
import ProductImageGallery from "./product-image-gallery";
import { ChangeImage } from "./change-image";
import { useMediaQuery } from "usehooks-ts";

const ProductSwiper = ({
  product,
  className,
  option,
  classNameUnder,
}: {
  product: Doc<"product">;
  className?: string;
  classNameUnder?: string;
  option?: { key: string; value: string };
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [hoverImage, setHoverImage] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const images = ListImage({ product });
  const optionImage = product.options
    ?.find((o) => o.name === option?.key)
    ?.option.find((o) => o.name === option?.value)?.image;
  const index = images?.indexOf(images?.find((q) => q === optionImage)!);

  return (
    <div className={cn(" w-full h-full ", className)}>
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
          className={cn(
            " sm:max-w-[650px] max-w-[365px]  w-full h-full items-center flex justify-center"
          )}
        >
          {!isMobile ? (
            <>
              <ChangeImage index={index} />
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
          ) : null}

          {images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={ProductImageGallery({ index, images: images })}
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                className={cn(
                  " sm:max-w-[650px] max-w-[365px] w-full h-full  bg-transparent sm:hover:cursor-zoom-in"
                )}
              >
                <Image
                  src={item ? item : ""}
                  width={650}
                  height={650}
                  alt="image"
                  placeholder="blur"
                  blurDataURL="/loader.png"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  style={{ objectFit: "contain" }}
                  className=" sm:max-w-[650px] w-full h-full sm:max-h-[650px] max-w-[365px] max-h-[365px] object-contain rounded-[10px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={isMobile ? 0 : 10}
          slidesPerView={4}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className={cn(" mt-2 flex items-center", classNameUnder)}
        >
          {images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" rounded-[10px] cursor-pointer w-full pb-5 h-full bg-transparent space-y-4 ">
                <Image
                  src={item ? item : ""}
                  width={110}
                  height={110}
                  alt="image"
                  placeholder="blur"
                  blurDataURL="/loader.png"
                  priority
                  style={{ width: "auto", objectFit: "contain" }}
                  className=" sm:max-w-[120px] w-full h-full sm:max-h-[110px] rounded-[10px] hover:shadow-lg dark:shadow-white/70 hover:shadow-black duration-500"
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
