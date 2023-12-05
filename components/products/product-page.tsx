"use client";
import Error from "@/app/not-found";
import Product from "@/components/products/product";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";

export const ProductPageComponent = ({ slug }: { slug: string }) => {
  const product = useQuery(api.product.getProductBySlug, {
    slug,
  });

  if (product === undefined) {
    return (
      <div className="w-full flex flex-col h-full items-start mt-20 pt-10">
        <div className=" w-full items-center flex justify-center gap-3">
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
        </div>
        <div className="w-full flex  gap-2 p-16">
          <Skeleton className="flex w-[650px] h-[650px] rounded-[10px]" />
          <div className=" flex flex-col gap-5 p-4">
            <div className=" w-[400px] flex items-center justify-between">
              <Skeleton className="flex w-60 h-10 rounded-[10px]" />
              <Skeleton className="flex w-10 h-10 rounded-full" />
            </div>
            <Skeleton className="flex w-20 h-5 rounded-[10px]" />
            <Skeleton className="flex w-100 h-5 rounded-[10px]" />
            <Skeleton className="flex w-60 h-3 rounded-[10px]" />
            <Skeleton className="flex w-60 h-3 rounded-[10px]" />
            <Skeleton className="flex w-60 h-3 rounded-[10px]" />
            <Skeleton className="flex w-40 h-5 rounded-[10px]" />
            <div className=" flex items-center gap-2">
              <Skeleton className="flex w-40 h-10 rounded-[10px]" />
              <Skeleton className="flex w-40 h-10 rounded-[10px]" />
            </div>
            <Skeleton className="flex w-40 h-5 rounded-[10px]" />
            <div className=" flex items-center gap-2">
              <Skeleton className="flex w-20 h-20 rounded-[10px]" />
              <Skeleton className="flex w-20 h-20 rounded-[10px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return <Error />;
  }

  return (
    <div className=" relative">
      <Product product={product} />
    </div>
  );
};
