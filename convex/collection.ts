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
export const getCollectionById = query({
  args: {
    collectionId: v.id("collection"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    return collection;
  },
});
