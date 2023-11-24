import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("post").order("desc").collect();
    return posts;
  },
});
export const getPostByType = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("post")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .order("desc")
      .collect();
    return posts;
  },
});
export const getpostById = query({
  args: {
    postId: v.id("post"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    return post;
  },
});
