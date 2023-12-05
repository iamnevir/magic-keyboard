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
      <div className="w-full flex flex-col  h-full items-start sm:mt-20 sm:pt-10">
        <div className=" w-full items-center flex justify-center gap-3">
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
          <Skeleton className="flex w-20 h-5 rounded-[10px]" />
        </div>
        <div className="w-full flex  gap-2 p-4 sm:p-16">
          <Skeleton className="hidden sm:flex w-[650px] h-[650px] rounded-[10px]" />
          <div className=" flex flex-col gap-5 p-4">
            <div className=" w-[400px] flex items-center justify-between">
              <Skeleton className="flex sm:w-60 h-60 w-80 sm:h-10 rounded-[10px]" />
              <Skeleton className=" sm:flex hidden w-10 h-10 rounded-full" />
            </div>
            <div className=" flex flex-row sm:flex-col gap-5 ">
              <Skeleton className="flex sm:w-20 sm:h-5 h-16 w-16 rounded-[10px]" />
              <Skeleton className="flex sm:w-100 sm:h-5 h-16 w-16 rounded-[10px]" />
              <Skeleton className="flex sm:w-60 sm:h-3 h-16 w-16 rounded-[10px]" />
              <Skeleton className="flex sm:w-60 sm:h-3 h-16 w-16 rounded-[10px]" />
              <Skeleton className="sm:flex hidden w-60 h-3 rounded-[10px]" />
              <Skeleton className="sm:flex hidden w-40 h-5 rounded-[10px]" />
            </div>

            <div className=" flex items-center sm:max-w-none max-w-xs gap-2 justify-between w-full">
              <Skeleton className="flex w-40 h-10 rounded-[10px]" />
              <Skeleton className="flex sm:w-40 w-10 h-10 sm:rounded-[10px] rounded-full " />
            </div>
            <Skeleton className="flex w-40 h-5 rounded-[10px]" />
            <div className="sm:hidden flex flex-col gap-5 max-w-xs">
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
              <Skeleton className="flex w-full h-5 rounded-[10px]" />
            </div>
            <div className=" hidden sm:flex items-center gap-2">
              <Skeleton className="flex w-20 h-20 rounded-[10px]" />
              <Skeleton className="flex w-20 h-20 rounded-[10px]" />
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
