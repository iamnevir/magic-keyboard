import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const category = await convex.query(api.category.getcategoryBySlug, {
    slug: params.slug,
  });
  return NextResponse.json(category);
}
