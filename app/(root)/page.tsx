"use client";
import { BannerMain } from "@/components/banner-main";
import Billboard from "@/components/billboard";
import Footer from "@/components/footer";
import Help from "@/components/help";
import { MagicKeyboardMainFooter } from "@/components/magic-keyboard-main-footer";
import MagicKeyboardMainTop from "@/components/magic-keyboard-main-top";
import Parallax from "@/components/parallax-text";
import Shipping from "@/components/shipping";

export default function Home() {
  return (
    <div className=" h-full w-full overflow-auto">
      <div>
        <BannerMain />
      </div>
      <Billboard />
      <Shipping />
      <Help />
      <Parallax />
      <Footer />
      <div>
        <MagicKeyboardMainFooter />
      </div>
    </div>
  );
}
