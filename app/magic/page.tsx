import MagicKeyboard from "@/components/magic/magic-keyboard";
import { Suspense } from "react";

const MagicPage = () => {
  return (
    <div className=" h-full w-full ">
      <Suspense
        fallback={
          <div className=" absolute left-[50%] top-[50%] font-semibold w-10 h-10 dark:text-white">
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
