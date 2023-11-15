"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import UnderlineText from "./underline-animate";
import { useTheme } from "next-themes";
const Help = () => {
  const { theme } = useTheme();
  const color = theme === "light" ? "black" : "white";
  const container = {
    hidden: { opacity: 1, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <motion.div className="w-full items-center justify-center sm:px-28 px-2 sm:py-10 py-5 ">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 items-start sm:w-[384] w-full sm:h-full h-[400px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={container}
          className="flex flex-col space-y-5"
        >
          <span className="text-2xl dark:text-white text-black lg:text-3xl sm:text-2xl">
            NEED HELP?
          </span>
          <p className=" font-normal text-sm">
            Whether you need assistance to pick the best product for you or you
            are having an issue with your order, we at EPOMAKER and our amazing
            community are here to help.
          </p>
          <div className=" flex gap-5">
            <UnderlineText>
              <span className=" text-xs font-semibold">Warranty Policy</span>
            </UnderlineText>
            <UnderlineText>
              <span className=" text-xs font-semibold">Shipping Policy</span>
            </UnderlineText>
            <UnderlineText>
              <span className=" text-xs font-semibold">Return Policy</span>
            </UnderlineText>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={container}
          className="grid sm:flex grid-cols-2 sm:items-center items-start md:ml-10 md:-mt-5 mt-5"
        >
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 0.75)}
            className="sm:w-full flex flex-col shrink-0 justify-center w-[200px] sm:max-w-[227px] mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
            >
              <circle
                cx="35"
                cy="35"
                r="26.25"
                stroke={color}
                stroke-width="3"
              ></circle>
              <circle
                cx="35"
                cy="35"
                r="11.6667"
                stroke={color}
                stroke-width="3"
              ></circle>
              <path
                d="M17.5 14.5834L29.1667 26.25"
                stroke={color}
                stroke-width="3"
              ></path>
              <path
                d="M17.5 55.4167L29.1667 43.75"
                stroke={color}
                stroke-width="3"
              ></path>
              <path
                d="M52.5 14.5834L40.8334 26.25"
                stroke={color}
                stroke-width="3"
              ></path>
              <path
                d="M52.5 55.4167L40.8334 43.75"
                stroke={color}
                stroke-width="3"
              ></path>
            </svg>

            <div className="flex-1 ml-2 text-left sm:text-left">
              <span className="font-bold text-xl">Email</span>
              <div className=" text-[#666666] text-sm">
                <p>
                  We respond to emails within 48 hours of your support request.
                </p>
              </div>
              <UnderlineText className=" w-[65px]">
                <span className=" text-xs font-semibold">Contact us</span>
              </UnderlineText>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("right", "spring", 0.3, 0.75)}
            className="sm:w-full flex flex-col shrink-0 justify-center w-[200px] sm:max-w-[227px] mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
            >
              <path
                d="M26.2501 34.9999C26.2501 36.6108 24.9442 37.9166 23.3334 37.9166C21.7226 37.9166 20.4167 36.6108 20.4167 34.9999C20.4167 33.389 21.7226 32.0833 23.3334 32.0833C24.9442 32.0833 26.2501 33.389 26.2501 34.9999Z"
                fill={color}
              ></path>
              <path
                d="M37.9166 34.9999C37.9166 36.6108 36.6108 37.9166 34.9999 37.9166C33.389 37.9166 32.0833 36.6108 32.0833 34.9999C32.0833 33.389 33.389 32.0833 34.9999 32.0833C36.6108 32.0833 37.9166 33.389 37.9166 34.9999Z"
                fill={color}
              ></path>
              <path
                d="M49.5833 34.9999C49.5833 36.6108 48.2775 37.9166 46.6667 37.9166C45.0558 37.9166 43.75 36.6108 43.75 34.9999C43.75 33.389 45.0558 32.0833 46.6667 32.0833C48.2775 32.0833 49.5833 33.389 49.5833 34.9999Z"
                fill={color}
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.75 35C8.75 47.8867 20.5025 58.3333 35 58.3333C37.0049 58.3333 38.9573 58.1335 40.8333 57.7552L61.25 61.25L56.3488 48.5797C59.4338 44.7545 61.25 40.0656 61.25 35C61.25 22.1133 49.4976 11.6666 35 11.6666C20.5025 11.6666 8.75 22.1133 8.75 35Z"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>

            <div className="flex-1 ml-2 text-left sm:text-left">
              <span className="font-bold text-xl">Chat</span>
              <div className=" text-[#666666] text-sm">
                <p>Join our online community and meet amazing people.</p>
              </div>
              <UnderlineText className="w-[74px]">
                <span className=" text-xs font-semibold">Join Discord</span>
              </UnderlineText>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("right", "spring", 0.5, 0.75)}
            className="sm:w-full flex flex-col shrink-0 justify-center w-[200px] sm:max-w-[227px] mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M49.5834 23.8636C49.5834 31.9498 45.6404 39.2114 41.4462 44.6128C39.371 47.2856 37.2908 49.429 35.7319 50.9017C35.472 51.147 35.2273 51.373 35.0001 51.5795C34.7729 51.373 34.5282 51.147 34.2683 50.9017C32.7093 49.429 30.6292 47.2856 28.5538 44.6128C24.3599 39.2114 20.4167 31.9498 20.4167 23.8636C20.4167 19.9544 21.6857 16.1523 24.0835 13.3731C26.4294 10.6539 29.9892 8.75 35.0001 8.75C40.0109 8.75 43.5707 10.6539 45.9166 13.3731C48.3144 16.1523 49.5834 19.9544 49.5834 23.8636Z"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <circle
                cx="35.0001"
                cy="23.3333"
                r="5.83333"
                stroke={color}
                stroke-width="3"
              ></circle>
              <path
                d="M17.5 43.7964C12.1297 45.6275 8.75 48.2883 8.75 51.2499C8.75 56.7729 20.5025 61.25 35 61.25C49.4976 61.25 61.25 56.7729 61.25 51.2499C61.25 48.2632 57.8127 45.5823 52.3632 43.75"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>

            <div className="flex-1 ml-2 text-left sm:text-left">
              <span className="font-bold text-xl">Track</span>
              <div className=" text-[#666666] text-sm">
                <p>All our products can be tracked using the following link.</p>
              </div>
              <UnderlineText className="w-[99px]">
                <span className=" text-xs font-semibold">Track your Order</span>
              </UnderlineText>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Help;
