"use client";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { container, fadeIn } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

import { Tilt } from "@jdion/tilt-react";
const CarouselCategoryList = () => {
  const targetRef = useRef(null);
  const categories = useQuery(api.category.getCategories);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const isMobile = window.screen.width <= 768;
  const x1 = useTransform(scrollYProgress, [0, 2], ["44%", "-135%"]);
  const x2 = useTransform(scrollYProgress, [0, 2], ["33%", "-95%"]);
  const x = isMobile ? x1 : x2;
  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-clip">
      <div className=" font-medium text-4xl sm:mt-20 mt-10">
        Shop by Categories
      </div>
      <div ref={targetRef} className="relative h-[400dvh]">
        <div className="sticky sm:top-0 top-[10dvh] flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4">
            {categories?.map((category) => (
              <CategoryItem category={category} key={category._id} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({ category }: { category: Doc<"category"> }) => {
  return (
    <Tilt>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn("up", "spring", 0.2, 0.5)}
        key={category._id}
        className="group cursor-pointer relative sm:h-[450px] sm:w-[450px] h-[300px] w-[300px] overflow-hidden bg-neutral-200"
      >
        <div
          style={{
            backgroundImage: `url(${category.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl font-black uppercase text-white backdrop-blur-lg">
            {category.name}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default CarouselCategoryList;
