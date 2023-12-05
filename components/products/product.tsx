"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ProductSwiper from "./product-swiper";
import ProductPicker from "./product-picker";
import { Divider } from "@nextui-org/react";
import GenerateHtml from "@/lib/json-to-html";
import ProductReview from "./product-review";
import Recommendation from "./recommendation";
import Breadcrumb from "../bread-crum";
import { useState } from "react";

const Product = ({ product }: { product: Doc<"product"> }) => {
  const collection = useQuery(api.collection.getCollectionById, {
    collectionId: product.collectionId,
  });
  const category = useQuery(api.category.getCategoryById, {
    categoryId: collection?.categoryId!,
  });
  const [option, setOption] = useState<{ key: string; value: string }>();
  return (
    <div className=" w-full h-full">
      <Breadcrumb
        item={category?.name}
        item2={product.name}
        href={`/collections/${category?._id}`}
        className="sm:py-10 "
      />

      <div className="flex lg:flex-row flex-col items-start lg:px-10 px-1 lg:py-10 py-2 w-full h-full">
        <ProductSwiper option={option} product={product} />
        <div className="lg:w-[50%] w-full overflow-auto">
          <ProductPicker onOptionChange={setOption} product={product} />
        </div>
      </div>
      <Divider className="my-4" />
      <div className=" w-full h-full flex items-center justify-center sm:mt-20 mt-2 prose-headings:font-bold prose-p:text-sm prose-p:font-semibold">
        <GenerateHtml
          className=" w-full h-full sm:max-w-[60dvw] sm:px-0 px-3"
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
