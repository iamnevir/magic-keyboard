import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ProductList from "../root/product-list";

const Recommendation = ({
  collectionId,
}: {
  collectionId: Id<"collection">;
}) => {
  const products = useQuery(api.product.getProductsByCollection, {
    collectionId,
  });
  return <ProductList collectionId={collectionId} productList={products} />;
};

export default Recommendation;
