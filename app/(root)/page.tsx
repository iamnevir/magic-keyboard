"use client";
import { BannerMain } from "@/components/banner-main";
import { MagicKeyboardMainFooter } from "@/components/magic-keyboard-main-footer";
import MagicKeyboardMainTop from "@/components/magic-keyboard-main-top";

export default function Home() {
  return (
    <div className=" h-full w-full overflow-auto">
      <div>
        <BannerMain />
      </div>
      <div className="h-full w-full"></div>
      <div>
        <MagicKeyboardMainFooter />
      </div>
    </div>
  );
}
