"use client";
import AboutUs from "@/components/root/about-us";
import { BannerMain } from "@/components/root/banner-main";
import Billboard from "@/components/root/billboard";
import CarouselCategoryList from "@/components/root/category-list";
import Footer from "@/components/root/footer";
import Help from "@/components/root/help";
import Intro from "@/components/root/intro";
import ProductList from "@/components/root/product-list";
import Shipping from "@/components/root/shipping";

export default function Home() {
  return (
    <>
      <div className=" h-full w-full">
        <Intro />
        {/* <BannerMain /> */}
        <Billboard />
        <Shipping />
        <Help />
        <ProductList />
        <div className="flex flex-col items-center justify-center w-full overflow-clip">
          <div className=" font-medium text-4xl mt-20 ">Shop by Categories</div>
          <CarouselCategoryList />
        </div>
        <AboutUs />
        <Footer />
        {/* <MagicKeyboardMainFooter /> */}
      </div>
    </>
  );
}
