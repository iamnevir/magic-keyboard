import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AnimateButton from "../animate-button";
import ProductItem from "./product-item";
import { SwipeDirection } from "./swiper-navigation";
import { Doc } from "@/convex/_generated/dataModel";
const ProductList = ({ productList }: { productList?: Doc<"product">[] }) => {
  const productsList = useQuery(api.product.getProducts);
  const products = productList ? productList : productsList;
  return (
    <div className=" overflow-hidden sm:p-4 p-2">
      <div className={cn("relative")}>
        <p className="mb-10 sm:text-2xl text-xl sm:w-full w-[50dvw]  font-semibold">
          Magic Keyboards{" "}
          <span className="text-slate-500">Yes, even that.</span>
        </p>
        <div className=" absolute right-0 top-0">
          <AnimateButton color="white" text="SHOP MORE" />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
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
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className=" w-full h-full"
        >
          <SwipeDirection direction="left" />
          <SwipeDirection direction="right" />
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <>
                <ProductItem product={product} />
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
