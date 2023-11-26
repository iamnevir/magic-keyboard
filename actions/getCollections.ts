import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const getCollections = () => {
  const collections = useQuery(api.collection.getCollections);
  return collections;
};

export default getCollections;
