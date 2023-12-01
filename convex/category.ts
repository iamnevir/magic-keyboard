import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCategories = query({
  handler: async (ctx) => {
    const categories = await ctx.db.query("category").order("desc").collect();
    return categories;
  },
});
export const getCategoryById = query({
  args: {
    categoryId: v.id("category"),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db.get(args.categoryId);
    return category;
  },
});
export const getcategoryBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("category")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    return post;
  },
});
