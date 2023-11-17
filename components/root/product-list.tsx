import { api } from "@/convex/_generated/api";
import { cn, formatCurrency } from "@/lib/utils";
import { useQuery } from "convex/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AnimateButton from "../animate-button";
import { Tilt } from "@jdion/tilt-react";
import { Doc } from "@/convex/_generated/dataModel";
import { ElementRef, useRef, useState } from "react";
const ProductList = () => {
  const products = useQuery(api.product.getProducts);
  return (
    <div className=" overflow-hidden p-4">
      <div className={cn("relative")}>
        <p className="mb-10 sm:text-2xl text-xl sm:w-full w-[50vw]  font-semibold">
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
              slidesPerView: 2,
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

const SwipeDirection = ({ direction }: { direction: "left" | "right" }) => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() =>
        direction === "left" ? swiper.slidePrev() : swiper.slideNext()
      }
      className={cn(
        direction === "left"
          ? "absolute left-0 top-[50%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
          : "absolute right-0 top-[50%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
      )}
    >
      {direction === "left" ? (
        <ChevronLeft className=" w-8 h-8" />
      ) : (
        <ChevronRight className=" w-8 h-8" />
      )}
    </button>
  );
};
const ProductItem = ({ product }: { product: Doc<"product"> }) => {
  const [bg, setBg] = useState(product.images?.[0]);
  return (
    <Tilt>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn("up", "spring", 0.1, 0.1)}
        style={{ backgroundImage: `url(${bg})` }}
        className={cn(
          `relative w-[350px] h-[350px] bg-cover  bg-shrink-0 cursor-pointer rounded-2xl shadow-md transition-all hover:scale-[1.015] hover:shadow-xl`
        )}
      >
        <div
          onMouseEnter={() => {
            setBg(product.images?.[1]);
          }}
          onMouseLeave={() => {
            setBg(product.images?.[0]);
          }}
        >
          <div className="absolute bg-center inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] ">
            <span className="text-xs font-semibold uppercase text-violet-300">
              {product.producer}
            </span>
            <p className="my-2 text-2xl font-bold">{product.name}</p>
            <p className="text-lg text-slate-300">
              {" "}
              {formatCurrency(product.price!)}
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};
