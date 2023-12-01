import { Category } from "@/components/collections/category";
import { Doc } from "@/convex/_generated/dataModel";
import { webUrl } from "@/lib/utils";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const category: Doc<"category"> = await fetch(
      `${webUrl}/api/collections/${params.slug}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return {
      title: `${category.name} Collection`,
      description: `Bộ sưu tập sản phẩm ${category.name}`,
      openGraph: {
        title: `Bộ sưu tập ${category.name}`,
        url: `/collections/${category._id}}`,
        description: `Bộ sưu tập sản phẩm ${category.name}`,
        siteName: "Magic Keyboard",
        type: "website",
        images: [category.imageUrl!],
      },
    };
  } catch (error) {
    return {
      title: `Toàn bộ sản phẩm`,
      description: `Toàn bộ sản phẩm trong cửa hàng`,
      openGraph: {
        siteName: "Magic Keyboard",
        url: `${webUrl}/collections/all`,
        title: `Toàn bộ sản phẩm`,
        description: `Toàn bộ sản phẩm`,
        type: "website",
        images: [
          "https://files.edgestore.dev/eqbzivk0rbhgn1q7/publicFiles/_public/34b7b5d0-b95e-42a9-aac1-5a00292e37f2.jpg",
        ],
      },
    };
  }
}

const CollectionPage = ({ params }: { params: { slug: string } }) => {
  return <Category slug={params.slug} />;
};

export default CollectionPage;
