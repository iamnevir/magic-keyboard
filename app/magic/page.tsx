import MagicKeyboard from "@/components/magic/magic-keyboard";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Magic Keyboard - Magic",
  description: "Thứ ma thuật kì lạ mang đến trải nghiệm phím cơ số một.",
  openGraph: {
    siteName: "Magic Keyboard",
    url: `${webUrl}/magic`,
    title: `Magic Keyboard - 3D Keyboard`,
    description: `Bàn phím 3D - Ảo điên.`,
    type: "website",
    images: [
      "https://utfs.io/f/02fd308b-79ea-4809-abf7-7e273b434448-66ge7i.png",
    ],
  },
};
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
