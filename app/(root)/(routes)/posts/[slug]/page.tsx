import { PostDetail } from "@/components/posts/post-detail";
import { Doc } from "@/convex/_generated/dataModel";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post: Doc<"post"> = await fetch(
      `${webUrl}/api/posts/${params.slug}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    return {
      title: `${post.title}`,
      description: `${post.subTitle}`,
      openGraph: {
        title: `${post.title}`,
        url: `${webUrl}/posts/${post._id}`,
        siteName: "Magic Keyboard",
        description: `${post.subTitle}`,
        type: "article",
        images: [post.thumnail],
        locale: "vi_EN",
      },
    };
  } catch (error) {
    return {
      title: `Not found`,
    };
  }
}
const PostPage = async ({ params }: { params: { slug: string } }) => {
  return <PostDetail slug={params.slug} />;
};

export default PostPage;
