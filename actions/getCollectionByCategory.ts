import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const getCollectionByCategory = ({
  categoryId,
}: {
  categoryId: Id<"category">;
}) => {
  const collectionListWithCategory = useQuery(
    api.collection.getCollectionsByCategory,
    {
      categoryId,
    }
  );
  return collectionListWithCategory;
};

export default getCollectionByCategory;
