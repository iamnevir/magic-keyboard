import { motion } from "framer-motion";
const TransitionPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <motion.div
        className=" fixed top-0 left-0 w-full h-[100dvh] dark:bg-zinc-950 bg-zinc-200 origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-[100dvh] dark:bg-zinc-950 bg-zinc-200 origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default TransitionPage;
