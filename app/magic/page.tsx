import MagicKeyboard from "@/components/magic/magic-keyboard";
import { Suspense } from "react";

const MagicPage = () => {
  return (
    <div className=" h-full w-full ">
      <Suspense
        fallback={
          <div className=" absolute sm:left-[50%] sm:top-[50%] left-[40%] top-[40%] font-semibold w-10 h-10 dark:text-white">
            loading...
          </div>
        }
      >
        <MagicKeyboard />
      </Suspense>
    </div>
  );
};

export default MagicPage;
