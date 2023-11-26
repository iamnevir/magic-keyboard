"use client";
import Error from "@/app/not-found";
import Product from "@/components/products/product";
import ShoppingCartDrawer from "@/components/shopping-cart-drawer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";

const ProductPage = ({ params }: { params: { productId: Id<"product"> } }) => {
  const product = useQuery(api.product.getProductById, {
    productId: params.productId,
  });

  if (product === undefined) {
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
  if (!product) {
    return <Error />;
  }

  return (
    <div className=" relative">
      <Product product={product} />
    </div>
  );
};

export default ProductPage;
