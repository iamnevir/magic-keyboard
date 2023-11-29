"use client";
import getNews from "@/actions/getNews";
import { Mousewheel, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useRouter } from "next/navigation";
const PostsPage = () => {
  const posts = getNews();
  const router = useRouter();
  return (
    <div className=" sm:w-[90dvw] sm:h-[90dvh] h-60 w-full">
      {" "}
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        parallax={true}
        speed={1000}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Parallax]}
        className=" w-full h-full"
      >
        {posts?.map((item) => (
          <SwiperSlide
            onClick={() => router.push(`/posts/${item._id}`)}
            className=" relative cursor-pointer"
          >
            <Image src={item.thumnail} alt="thumnail" fill />
            <motion.div
              whileInView="show"
              initial="hidden"
              variants={fadeIn("up", "spring", 0.2, 1)}
              className=" text-white absolute  sm:left-10 left-2 top-2 sm:top-10 sm:text-6xl font-bold sm:w-[60%] w-[50%] text-xl"
            >
              <span className="line-clamp-3"> {item.title}</span>

              <motion.div
                whileInView="show"
                initial="hidden"
                variants={fadeIn("up", "spring", 0.3, 1)}
                className=" text-white/70 w-[40%] sm:text-2xl line-clamp-3 text-xs"
              >
                {item.title}
              </motion.div>
            </motion.div>
            <motion.div
              whileInView="show"
              initial="hidden"
              variants={fadeIn("left", "spring", 0.4, 1)}
              className="flex items-center whitespace-nowrap  text-white absolute right-5 bottom-5 sm:text-2xl text-xs font-bold"
            >
              by {item.author}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostsPage;
