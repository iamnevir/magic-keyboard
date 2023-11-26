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
    categoryId: v.id("category"),
  },
  handler: async (ctx, args) => {
    const collections = await ctx.db
      .query("collection")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
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
