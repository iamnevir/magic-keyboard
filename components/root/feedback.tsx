"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Tilt } from "@jdion/tilt-react";
import { Avatar } from "@nextui-org/react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
const Feedback = () => {
  const feedbacks = [
    {
      avatar:
        "https://utfs.io/f/678d51ca-ddba-4114-b932-ac476a69232b-skgfjw.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },
    {
      avatar:
        "https://utfs.io/f/75fa4bdc-b06d-4a7a-849d-f9676e4bcb52-skgfj1.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },
    {
      avatar:
        "https://uploadthing.com/f/7450ae40-31bb-4a4d-8a9a-be7c861f0bee-360jgb.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },
    {
      avatar:
        "https://utfs.io/f/9ac19924-73da-4b87-9ce7-2a6dd3d230cc-skgfkr.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },

    {
      avatar:
        "https://utfs.io/f/1e771510-76dc-4c1a-88d8-a76623db7627-skgfi6.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },
    {
      avatar:
        "https://utfs.io/f/96f35bcd-02fc-4cb4-b212-5158fb63bcdf-4cl9wq.jpg",
      name: "AI",
      title: "AI Generate",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur facere dolores totam, voluptas, voluptatibus praesentium.",
    },
  ];
  return (
    <motion.div className="bg-transparent w-full overflow-hidden">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className=" sm:w-[350px] w-full "
      >
        {feedbacks.map((item, index) => (
          <SwiperSlide key={index} className="bg-transparent">
            <Tilt>
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeIn("left", "spring", index * 0.2, 1)}
                className=" relative w-[350px] h-[500px] bg-contain bg-no-repeat p-7"
                style={{ backgroundImage: `url(${item.avatar})` }}
              >
                <div className=" absolute flex items-center w-full">
                  <Avatar src={item.avatar} />
                  <div className="text-white ml-2">{item.name}</div>
                  <div className=" ml-auto w-22 h-10 mr-10 rounded-full backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/0 flex items-center p-3 text-white">
                    <div>255</div>
                    <Heart className=" w-6 h-6 ml-2 hover:scale-125 duration-500" />
                  </div>
                </div>
                <div className=" text-white absolute bottom-10">
                  <div className=" font-medium text-lg">{item.title}</div>
                  <div className="">{item.content}</div>
                </div>
              </motion.div>
            </Tilt>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Feedback;
