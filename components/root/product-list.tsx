"use client";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AnimateButton from "../animate-button";
import ProductItem from "../product-item";
import { SwipeDirection } from "./swiper-navigation";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
const ProductList = ({
  productList,
  collectionId,
}: {
  productList?: Doc<"product">[];
  collectionId?: Id<"collection">;
}) => {
  const productsList = useQuery(api.product.getProducts);
  const products = productList ? productList : productsList;
  const router = useRouter();
  return (
    <div className=" overflow-hidden sm:p-4 p-2">
      <div className={cn("relative")}>
        <p className="mb-10 sm:text-2xl text-xl sm:w-full w-[50dvw]  font-semibold">
          Magic Keyboards{" "}
          <span className="text-slate-500">Yes, even that.</span>
        </p>
        <div className=" absolute right-0 top-0">
          <AnimateButton
            color="white"
            text="SHOP MORE"
            onClick={() => router.push(`/collections/all`)}
          />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          loop={true}
          breakpoints={{
            450: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1224: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className=" w-full h-full"
        >
          <SwipeDirection direction="left" className=" top-[25%]" />
          <SwipeDirection direction="right" className=" top-[25%]" />
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <>
                <ProductItem loop product={product} />
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
