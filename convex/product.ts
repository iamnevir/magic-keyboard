import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("product").order("desc").collect();
    return products;
  },
});

export const getProductsByCategory = query({
  args: {
    categoryId: v.id("category"),
  },
  handler: async (ctx, args) => {
    const collections = await ctx.db
      .query("collection")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    const productsList = collections.map(
      async (collection) =>
        await ctx.db
          .query("product")
          .withIndex("by_category", (q) => q.eq("collectionId", collection._id))
          .order("desc")
          .collect()
    );
    const products = productsList.reduce(
      (accumulator, currentPromise) =>
        accumulator.then((results) =>
          currentPromise.then((result) => results.concat(result))
        ),
      Promise.resolve([])
    );
    return products;
  },
});

export const getProductById = query({
  args: {
    productId: v.id("product"),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db.get(args.productId);
    return products;
  },
});
