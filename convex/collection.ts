import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCollections = query({
  handler: async (ctx) => {
    const collections = await ctx.db
      .query("collection")
      .order("desc")
      .collect();
    return collections;
  },
});
export const getCollectionsByCategory = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("category")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    if (!category) {
      return null;
    }
    const collections = await ctx.db
      .query("collection")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .collect();
    return collections;
  },
});
export const getCollectionById = query({
  args: {
    collectionId: v.id("collection"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    return collection;
  },
});
export const getcollectionBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("collection")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    return post;
  },
});
