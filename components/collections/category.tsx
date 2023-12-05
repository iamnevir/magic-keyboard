"use client";
import Error from "@/app/not-found";
import Breadcrumb from "@/components/bread-crum";
import ProductCollection from "@/components/collections/product-collection";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";

export const Category = ({ slug }: { slug: string }) => {
  const category = useQuery(api.category.getcategoryBySlug, {
    slug,
  });
  if (category === undefined) {
    return (
      <div className="w-full ml-8 mt-14 flex flex-col items-start gap-3">
        <div className=" w-full flex justify-center">
          <Skeleton className="h-5 w-40 rounded-[10px] -translate-x-5 mt-4" />
        </div>
        <div className="w-full max-w-[300px] flex flex-col gap-2 mt-20">
          <Skeleton className="h-12 w-1/5 rounded-[10px]" />
          <Skeleton className="h-12 w-4/5 rounded-[10px]" />
          <Skeleton className="h-12 w-4/5 rounded-[10px]" />
          <Skeleton className="h-12 w-4/5 rounded-[10px]" />
        </div>
      </div>
    );
  }
  if (!category) {
    return (
      <div>
        <div className=" ">
          <Breadcrumb item="Collections" className="sm:py-5 pb-3" />
          <ProductCollection isAll slug={slug} />
        </div>
      </div>
    );
  }
  return (
    <div className=" ">
      <div className=" flex items-center justify-center py-5">
        <div className=" rounded-full bg-default-100 w-60 p-5 flex items-center justify-center">
          <span className="font-semibold text-3xl">{category.name}</span>
        </div>
      </div>

      <Breadcrumb item={category.name} className="py-5" />
      <ProductCollection isAll={false} slug={slug} />
    </div>
  );
};
