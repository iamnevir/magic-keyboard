import { Posts } from "@/components/posts/posts";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bài viết",
  description: "Bài viết liên quan đến Magic",
  openGraph: {
    siteName: "Magic Keyboard",
    url: `${webUrl}/posts`,
    title: `Magic Keyboard - News`,
    description: `Cộng đồng phím cơ lớn với nhiều tin tức kì lạ.`,
    type: "website",
    images: [
      "https://cdn.shopifycdn.net/s/files/1/0280/3931/5529/files/minicat-blog-june_1024x1024.jpg?v=1657526562",
    ],
  },
};
const PostsPage = () => {
  return <Posts />;
};

export default PostsPage;
