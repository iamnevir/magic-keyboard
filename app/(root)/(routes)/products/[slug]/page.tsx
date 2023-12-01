import { ProductPageComponent } from "@/components/products/product-page";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { webUrl } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product: Doc<"product"> = await fetch(
      `${webUrl}/api/products/${params.slug}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    const image = product.options
      ? product.options[0].option[0].image
      : product.images
      ? product.images[0]
      : null;
    return {
      title: `${product.name}`,
      description: `${product.description}`,
      openGraph: {
        title: `${product.name}`,
        url: `${webUrl}/products/${product.name}`,
        siteName: "Magic Keyboard",
        description: `${product.description}`,
        type: "website",
        images: [image ? image : ""],
        locale: "vi_EN",
      },
    };
  } catch (error) {
    return {
      title: `Not found`,
    };
  }
}
const ProductPage = ({ params }: { params: { slug: string } }) => {
  return <ProductPageComponent slug={params.slug} />;
};

export default ProductPage;
