"use client";
import AboutUs from "@/components/about-us";
import { BannerMain } from "@/components/banner-main";
import Billboard from "@/components/billboard";
import CarouselCategoryList from "@/components/category-list";
import Footer from "@/components/footer";
import Help from "@/components/help";
import ProductList from "@/components/product-list";
import Shipping from "@/components/shipping";

export default function Home() {
  return (
    <>
      <div className=" h-full w-full">
        <BannerMain />
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
