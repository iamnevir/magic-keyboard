"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ProductSwiper from "./product-swiper";
import ProductPicker from "./product-picker";
import { Divider } from "@nextui-org/react";
import GenerateHtml from "@/lib/json-to-html";
import ProductReview from "./product-review";
import Recommendation from "./recommendation";
import Footer from "../root/footer";
import Breadcrumb from "../bread-crum";

const Product = ({ product }: { product: Doc<"product"> }) => {
  const collection = useQuery(api.collection.getCollectionById, {
    collectionId: product.collectionId,
  });

  return (
    <div className=" w-full h-full">
      <Breadcrumb
        item={collection?.name}
        item2={product.name}
        href={`/collections/${collection?._id}`}
        className="py-10"
      />

      <div className="flex items-start px-10 py-10 w-full h-full">
        <ProductSwiper product={product} />
        <div className="w-[50%] overflow-auto">
          <ProductPicker product={product} />
        </div>
      </div>
      <Divider className="my-4" />
      <div className=" w-full h-full flex items-center justify-center mt-20 prose-headings:font-bold prose-p:text-sm prose-p:font-semibold">
        <GenerateHtml
          className=" w-full h-full max-w-[60dvw]"
          json={product.infomation}
        />
      </div>
      <Divider className="my-4" />
      <ProductReview productId={product._id} />
      <Recommendation collectionId={product.collectionId} />
    </div>
  );
};

export default Product;
