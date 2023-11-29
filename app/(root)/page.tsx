"use client";
import AboutUs from "@/components/root/about-us";
import BackgroundMusic from "@/components/root/bg-music";
import Billboard from "@/components/root/billboard";
import CarouselCategoryList from "@/components/root/category-list";
import Feedback from "@/components/root/feedback";
import Footer from "@/components/root/footer";
import Help from "@/components/root/help";
import Intro from "@/components/root/intro";
import News from "@/components/root/news";
import ProductList from "@/components/root/product-list";
import Shipping from "@/components/root/shipping";

export default function Home() {
  return (
    <>
      <div className=" h-full w-full">
        <Intro />
        <Billboard />
        <Shipping />
        <Help />
        <ProductList />

        <CarouselCategoryList />
        <AboutUs />
        <div className=" w-full h-full sm:flex sm:my-20 my-5 space-y-5 sm:space-y-0">
          <News slidesPerView={2} />

          <Feedback />
        </div>

        <Footer />
      </div>
    </>
  );
}
