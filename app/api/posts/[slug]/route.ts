import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const product = await convex.query(api.post.getpostBySlug, {
    slug: params.slug,
  });
  return NextResponse.json(product);
}
