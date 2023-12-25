"use client";
import { Line } from "../line";
import { fadeIn } from "@/lib/motion";
import AnimateButton from "../animate-button";
import Lottie from "lottie-react";
import work from "@/public/work.json";
import { useMediaQuery } from "usehooks-ts";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useRef } from "react";

function Paragraph({ paragraph }: { paragraph: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");
  return (
    <p ref={container} className="flex text-white flex-wrap text-lg">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [s: number, e: number];
}) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className=" relative mr-2 mt-1">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [s: number, e: number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
const AboutUs = () => {
  return (
    <div className=" w-full h-full relative p-10">
      <div className=" absolute">
        <Line />
      </div>
      <motion.div className="relative z-50 h-[30dvh] sm:h-[100dvh] uppercase">
        <div className="absolute grid w-full h-full sm:h-[40dvh] space-y-10 text-[8dvw] font-normal">
          <div className="  inline-block  h-[10dvh] relative">
            <div className="flex overflow-hidden h-fit absolute left-[25%]">
              <TypingText title="AL" textStyles="" />
            </div>

            <div className="flex overflow-hidden absolute left-[38%]">
              <TypingText title="GENERATION" textStyles="" />
            </div>
          </div>

          <div className="  inline-block  h-[10dvh] relative">
            <div className="flex overflow-hidden absolute left-[5%] lg:top-[300%] md:top-[50%] -top-[10%]">
              <TypingText title="WITH" textStyles="" />
            </div>

            <div className="flex overflow-hidden absolute left-[35%] lg:top-[10%] md:-top-[50%] -top-[100%]">
              <TypingText title="MAGIC" textStyles="" />
            </div>
          </div>
        </div>
      </motion.div>
      <div className=" ml-auto sm:w-[45dvw] w-full mr-20">
        <Paragraph
          paragraph={` The Epomaker TH80-X embodies the perfect amalgamation of functionality and portability, boasting a space-efficient 75% layout that conserves desk space without compromising usability. Users can now revel in an uncluttered and efficient workspace, fostering productivity and creativity.`}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("left", "spring", 0.2, 1.6)}
          className=" w-40 h-10 mt-10"
        >
          <AnimateButton color="white" text="ABOUT US" />
        </motion.div>
      </div>

      <div className="sm:w-[30dvw] w-full sm:absolute left-10 bottom-0">
        <Lottie animationData={work} />
      </div>
    </div>
  );
};

export default AboutUs;
const TypingText = ({
  title,
  textStyles,
}: {
  title: string;
  textStyles: string;
}) => (
  <motion.div
    style={{ transformStyle: "preserve-3d" }}
    whileInView="show"
    initial="hidden"
    viewport={{ once: true }}
    className={` relative cursor-pointer group  ${textStyles}`}
  >
    <motion.div className=" pointer-events-none px-3 py-1  rounded-full duration-700 border-transparent flex items-center origin-bottom">
      {Array.from(title).map((letter, index) => (
        <motion.div
          variants={{
            hidden: {
              translateY: "50%",
              opacity: 0,
            },
            show: {
              translateY: 0,
              opacity: 1,
              transition: {
                type: "spring",
                duration: 1.5,
                delay: 0.02 * index,
              },
            },
          }}
          key={index}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);
