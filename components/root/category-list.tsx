"use client";
import { api } from "@/convex/_generated/api";

import { useQuery } from "convex/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import CategoryItem from "./category-item";
const CarouselCategoryList = () => {
  const targetRef = useRef(null);
  const categories = useQuery(api.category.getCategories);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const isMobile = window.screen.width <= 768;
  const x1 = useTransform(scrollYProgress, [0, 2], ["44%", "-135%"]);
  const x2 = useTransform(scrollYProgress, [0, 2], ["32%", "-95%"]);
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

export default CarouselCategoryList;
