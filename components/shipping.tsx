import Image from "next/image";
import { motion } from "framer-motion";
const Shipping = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 1,
      },
    },
  };
  const fadeIn = (
    direction: string,
    type: string,
    delay: number,
    duration: number
  ) => ({
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  });
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      variants={container}
      className="w-full items-center justify-center sm:px-28 px-2 sm:py-10 pt-10 "
    >
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 items-start sm:w-[384] w-full sm:h-full h-[300px]">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <Image
            src="https://epomaker.com/cdn/shop/files/delivery.png?v=1689306485&width=360"
            alt="ship"
            width={60}
            height={60}
            objectFit="contain"
          />
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">Standard Shipping</span>
            <div className=" text-[#666666] text-sm">
              <p>Free for most countries/areas. See our Shipping Policy.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <Image
            src="https://epomaker.com/cdn/shop/files/return-box.png?v=1689306502&width=360"
            alt="ship"
            width={60}
            height={60}
            objectFit="contain"
          />
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">7-Day Return Policy</span>
            <div className=" text-[#666666] text-sm">
              <p>For New & Sealed Products. Check our Return Policy.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.8, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <Image
            src="https://epomaker.com/cdn/shop/files/medal.png?v=1689306543&width=360"
            alt="ship"
            width={60}
            height={60}
            objectFit="contain"
          />
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">12 Month Warranty</span>
            <div className=" text-[#666666] text-sm">
              <p>For Keyboards & DIY Kits. Check our Warranty Policy.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Shipping;
