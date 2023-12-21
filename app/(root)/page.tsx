import Billboard from "@/components/root/billboard";
import ProductList from "@/components/root/product-list";
import dynamic from "next/dynamic";
const AboutUs = dynamic(() => import("@/components/root/about-us"));
const CarouselCategoryList = dynamic(
  () => import("@/components/root/category-list")
);
const Feedback = dynamic(() => import("@/components/root/feedback"));
const Footer = dynamic(() => import("@/components/root/footer"));
const News = dynamic(() => import("@/components/root/news"));
const Shipping = dynamic(() => import("@/components/root/shipping"));
const Help = dynamic(() => import("@/components/root/help"));
export default function Home() {
  return (
    <>
      <div className=" h-full w-full overflow-x-hidden">
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
