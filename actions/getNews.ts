import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const getNews = () => {
  const news = useQuery(api.post.getPosts);
  return news;
};

export default getNews;
