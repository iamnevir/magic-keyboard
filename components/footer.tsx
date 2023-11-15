import { motion } from "framer-motion";
import { TypingText } from "./typing-text";
import { ArrowRight, ArrowUp, ExternalLinkIcon } from "lucide-react";
import { Input } from "@nextui-org/react";
import UnderlineText from "./underline-animate";

const Footer = () => {
  const andress = [
    { text: "ICTU", ml: "2" },
    { text: "Z115", ml: "0" },
    { text: "Xã Quyết Thắng", ml: "2" },
    { text: "Thái Nguyên", ml: "0" },
  ];
  const socialMedia = [
    { text: "Facebook", url: "#" },
    { text: "Instagram", url: "#" },
    { text: "Github", url: "#" },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      className="flex-col flex sm:flex-row sm:items-start pt-40 items-start w-[99vw] h-[100vh] overflow-x-clip relative sm:space-x-28 space-y-20"
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 140,
          },
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 80,
            delay: 0.5,
          },
        },
      }}
    >
      <TypingText
        title="Magic Keyboard"
        textStyles="sm:absolute font-semibold ml-5 sm:ml-0 sm:left-20 sm:top-14 top-5 text-3xl"
      />

      <motion.ul
        initial="hidden"
        whileInView="show"
        className="flex-col flex ml-14 font-medium group/address"
        variants={{
          show: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          hidden: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
      >
        {andress.map((item) => (
          <motion.li
            className={` group-hover/address:ml-${item.ml}  duration-400`}
            initial="hidden"
            whileInView="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.5, delayChildren: 0.5 },
              },
              hidden: {
                transition: { staggerChildren: 0.5, staggerDirection: -1 },
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <TypingText title={item.text} textStyles="font-medium" />
          </motion.li>
        ))}
      </motion.ul>
      <motion.div className=" flex-col flex items-start space-y-10">
        <motion.ul
          initial="hidden"
          whileInView="show"
          className="flex-col flex ml-10 font-medium"
          variants={{
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            },
            hidden: {
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
        >
          {socialMedia.map((item) => (
            <motion.li
              className={`hover:ml-5  duration-400 group flex`}
              initial="hidden"
              whileInView="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.5, delayChildren: 0.5 },
                },
                hidden: {
                  transition: { staggerChildren: 0.5, staggerDirection: -1 },
                },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLinkIcon className=" group-hover:opacity-100 opacity-0 h-4 w-4 mr-1 mt-1 duration-300" />
              <TypingText title={item.text} textStyles="font-medium" />
            </motion.li>
          ))}
        </motion.ul>
        <motion.div className=" ml-14 flex-col flex">
          <TypingText title="Hiring Dev" textStyles=" font-medium" />

          <motion.span className="group/email cursor-pointer flex-col flex">
            <UnderlineText>
              <TypingText
                title="iamnevir@magic.com"
                textStyles=" font-medium"
              />
            </UnderlineText>
          </motion.span>
        </motion.div>
        <motion.div className="ml-14 flex-col flex">
          <TypingText title="Contact enquires" textStyles=" font-medium" />
          <motion.span className="group/email  cursor-pointer flex-col flex">
            <UnderlineText>
              {" "}
              <TypingText
                title="magickeyboard@magic.com"
                textStyles="font-medium "
              />
            </UnderlineText>

            <motion.div className=" dark:bg-white bg-black group-hover/email:w-full h-[2px] w-0 duration-300" />
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div layoutId="underline" className="space-y-10 ml-5 sm:ml-0">
        <motion.span className=" flex flex-col">
          <TypingText title="Subscribe to" textStyles=" font-medium text-5xl" />
          <TypingText
            title="our newsletter"
            textStyles=" font-medium text-5xl"
          />
        </motion.span>
        <div className=" relative items-center">
          <Input
            type="email"
            placeholder="Your Email"
            className=" max-w-3xl w-[300px] sm:w-[470px] h-[61px] dark:text-white"
          />
          <ArrowRight className=" absolute sm:right-3 top-[20%] right-10 z-10 w-8 h-8 cursor-pointer" />
        </div>
      </motion.div>
      <motion.div className="sm:flex-row flex flex-col items-start sm:absolute w-full ml-5 sm:ml-0 h-[50px] bottom-0 sm:space-x-[300px]">
        <TypingText
          title="@2023 MAGIC KEYBOARD STUDIO"
          textStyles="font-normal text-[15px]"
        />
        <span className="font-normal flex text-[15px] sm:ml-20">
          R&D:{" "}
          <UnderlineText>
            <TypingText title="studio.magic.keyboard" textStyles="" />
          </UnderlineText>
        </span>

        <TypingText
          title="Built by Nevir with 🖤"
          textStyles="font-normal text-[15px]"
        />
        <div
          onClick={() => {}}
          className=" absolute dark:bg-white bg-black rounded-full items-center p-4 cursor-pointer right-40 bottom-5"
        >
          <ArrowUp className=" w-7 h-7 text-white dark:text-black" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
