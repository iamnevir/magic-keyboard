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
      <div className="max-w-[300px] w-full ml-20 mt-20 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
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
