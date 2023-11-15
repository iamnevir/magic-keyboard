import { motion } from "framer-motion";

export const TypingText = ({
  title,
  textStyles,
}: {
  title: string;
  textStyles: string;
}) => (
  <motion.p
    variants={{
      hidden: {
        opacity: 0,
      },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
      }),
    }}
    className={`  ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span
        variants={{
          hidden: {
            y: 50,
            opacity: 0,
          },
          show: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              duration: 1.25,
            },
          },
        }}
        key={index}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);
