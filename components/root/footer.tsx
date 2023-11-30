import { motion } from "framer-motion";
import { TypingText } from "../typing-text";
import { ArrowUp, ExternalLinkIcon, SendHorizonal } from "lucide-react";
import { Input } from "@nextui-org/react";
import UnderlineText from "../underline-animate";
import { fadeIn } from "@/lib/motion";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  async function handleOnSubmit(e: any) {
    e.preventDefault();
    try {
      if (user) {
        await fetch("/api/send", {
          method: "POST",
          body: JSON.stringify({
            userName: user.fullName,
            email: email.trim(),
          }),
        });
      } else {
        await fetch("/api/send", {
          method: "POST",
          body: JSON.stringify({
            userName: "Khách hàng của Magic Keyboard",
            email,
          }),
        });
      }
      toast.success("Thank for contact!");
    } catch (error) {
      console.log("Có gì đó sai sai!!!");
    }
  }
  const andress = [
    { text: "ICTU", ml: "2" },
    { text: "Z115", ml: "0" },
    { text: "Xã Quyết Thắng", ml: "2" },
    { text: "Thái Nguyên", ml: "0" },
  ];
  const socialMedia = [
    { text: "Facebook", url: "https://www.facebook.com/iamnanhdz" },
    { text: "Instagram", url: "https://www.instagram.com/it.nevir" },
    { text: "Github", url: "https://github.com/iamnevir" },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      className="flex-col flex sm:flex-row sm:items-start pt-40 items-start w-[99dvw] h-[100dvh] overflow-x-clip relative sm:space-x-28 space-y-20"
    >
      <TypingText
        title="Magic Keyboard"
        textStyles="sm:absolute font-semibold ml-5 sm:ml-0 sm:left-20 sm:top-14 top-5 text-3xl"
      />
      <motion.div initial="hidden" whileInView="show" className=" flex">
        <div className="flex-col flex sm:ml-5 ml-14 font-medium group/address">
          {andress.map((item) => (
            <div
              key={item.text}
              className={` group-hover/address:ml-${item.ml}  duration-400`}
            >
              <TypingText title={item.text} textStyles="font-medium" />
            </div>
          ))}
        </div>
        <div className=" flex-col flex items-start space-y-10">
          <div className="flex-col flex ml-10 font-medium">
            {socialMedia.map((item) => (
              <div
                key={item.text}
                className={`hover:translate-x-5  duration-400 group flex`}
              >
                <ExternalLinkIcon className=" group-hover:opacity-100 opacity-0 h-4 w-4 mr-1 mt-1 duration-300" />
                <TypingText title={item.text} textStyles="font-medium" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className=" flex flex-col space-y-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          className=" ml-14 flex-col flex"
        >
          <TypingText title="Hiring Dev" textStyles=" font-medium" />

          <span className="group/email cursor-pointer flex-col flex">
            <UnderlineText>
              <TypingText
                title="iamnevir@magic.com"
                textStyles=" font-medium"
              />
            </UnderlineText>
          </span>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          className="ml-14 flex-col flex"
        >
          <TypingText title="Contact enquires" textStyles=" font-medium" />
          <span className="group/email  cursor-pointer flex-col flex">
            <UnderlineText>
              {" "}
              <TypingText
                title="magickeyboard@magic.com"
                textStyles="font-medium "
              />
            </UnderlineText>

            <div className=" dark:bg-white bg-black group-hover/email:w-full h-[2px] w-0 duration-300" />
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        className="space-y-10 ml-5 sm:ml-0"
      >
        <motion.span
          initial="hidden"
          whileInView="show"
          className=" flex flex-col"
        >
          <TypingText title="Subscribe to" textStyles=" font-medium text-5xl" />
          <TypingText
            title="our newsletter"
            textStyles=" font-medium text-5xl"
          />
        </motion.span>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeIn("right", "spring", 0.1, 1)}
          className=" relative items-center"
        >
          <Input
            type="email"
            placeholder="Your Email"
            onValueChange={setEmail}
            className=" max-w-3xl w-[300px] sm:w-[470px] h-[61px] dark:text-white"
            endContent={
              <SendHorizonal
                onClick={handleOnSubmit}
                className="w-8 h-8 cursor-pointer"
              />
            }
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        className="sm:flex-row flex flex-col items-start sm:absolute w-full ml-5 sm:ml-0 h-[50px] bottom-0 sm:space-x-[300px]"
      >
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
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className=" absolute dark:bg-white bg-black rounded-full items-center sm:p-4 p-3 cursor-pointer sm:right-40 sm:bottom-5 right-2"
        >
          <ArrowUp className=" sm:w-7 sm:h-7 h-4 w-4 text-white dark:text-black" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
