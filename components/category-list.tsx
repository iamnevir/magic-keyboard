"use client";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { container, fadeIn } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const CarouselCategoryList = () => {
  const targetRef = useRef(null);
  const categories = useQuery(api.category.getCategories);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 2], ["33%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {categories?.map((category) => (
            <CategoryItem category={category} key={category._id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CategoryItem = ({ category }: { category: Doc<"category"> }) => {
  return (
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
  );
};

export default CarouselCategoryList;
