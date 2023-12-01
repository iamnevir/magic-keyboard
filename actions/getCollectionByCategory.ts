import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const getCollectionByCategory = ({ slug }: { slug: string }) => {
  const collectionListWithCategory = useQuery(
    api.collection.getCollectionsByCategory,
    {
      slug,
    }
  );
  return collectionListWithCategory;
};

export default getCollectionByCategory;
