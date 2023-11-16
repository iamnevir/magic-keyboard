import { motion } from "framer-motion";
import { Line } from "./line";
import { fadeIn } from "@/lib/motion";
import AnimateButton from "./animate-button";

const AboutUs = () => {
  return (
    <div className=" w-full h-full relative p-10">
      <div className=" absolute">
        <Line />
      </div>
      <motion.div className=" relative z-50 h-[100vh]">
        <div className=" absolute grid w-full h-[40vh] space-y-10 text-[10vw] font-normal">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeIn("up", "spring", 0.2, 1.25)}
            className="  inline-block  h-[10vh] relative"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={{
                hidden: { marginLeft: 0 },
                show: {
                  marginLeft: 240,
                  transition: {
                    delay: 0.65,
                    duration: 0.4,
                  },
                },
              }}
              className=" absolute left-[8vw]"
            >
              Al
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={{
                hidden: { marginLeft: 0 },
                show: {
                  marginLeft: 240,
                  transition: {
                    delay: 0.5,
                    duration: 0.4,
                  },
                },
              }}
              className=" absolute left-[21vw]"
            >
              Generation
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeIn("down", "spring", 0.2, 1.25)}
            className=" inline-block h-[10vh] relative"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={{
                hidden: { marginTop: 0 },
                show: {
                  marginTop: 240,
                  transition: {
                    delay: 0.5,
                    duration: 0.5,
                  },
                },
              }}
              className="absolute left-[8vw] "
            >
              With
            </motion.div>
            <motion.div className="absolute left-[33vw] ">Magic</motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div className=" ml-auto w-[45vw] mr-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("down", "spring", 0.2, 0.8)}
          className=" text-xl font-normal"
        >
          The Epomaker TH80-X embodies the perfect amalgamation of
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("down", "spring", 0.2, 1)}
          className=" text-xl font-normal"
        >
          functionality and portability, boasting a space-efficient 75% layout
          that
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("down", "spring", 0.2, 1.15)}
          className=" text-xl font-normal"
        >
          conserves desk space without compromising usability. Users can now
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("down", "spring", 0.2, 1.3)}
          className=" text-xl font-normal"
        >
          revel in an uncluttered and efficient workspace, fostering
          productivity
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("down", "spring", 0.2, 1.45)}
          className=" text-xl font-normal"
        >
          and creativity.
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("left", "spring", 0.2, 1.6)}
          className=" w-40 h-10 mt-10"
        >
          <AnimateButton color="white" text="ABOUT US" />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;