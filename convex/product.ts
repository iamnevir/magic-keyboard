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

export const create = mutation({
  args: {
    name: v.string(),
    producer: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    pay: v.optional(v.string()),
    quantity: v.optional(v.number()),
    collectionId: v.id("collection"),
    options: v.optional(
      v.array(
        v.object({
          name: v.string(),
          option: v.array(
            v.object({
              name: v.string(),
              image: v.optional(v.string()),
              price: v.optional(v.number()),
              quantity: v.optional(v.number()),
            })
          ),
        })
      )
    ),
    images: v.optional(v.array(v.string())),
    isPublish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db.insert("product", {
      name: args.name,
      producer: args.producer,
      description: args.description,
      price: args.price,
      pay: args.pay,
      quantity: args.quantity,
      collectionId: args.collectionId,
      options: args.options,
      images: args.images,
      isPublish: args.isPublish,
    });
    return products;
  },
});
export const remove = mutation({
  args: {
    id: v.id("product"),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db.delete(args.id);
    return products;
  },
});
export const update = mutation({
  args: {
    id: v.id("product"),
    name: v.string(),
    producer: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    pay: v.optional(v.string()),
    quantity: v.optional(v.number()),
    collectionId: v.id("collection"),
    options: v.optional(
      v.array(
        v.object({
          name: v.string(),
          option: v.array(
            v.object({
              name: v.string(),
              image: v.optional(v.string()),
              price: v.optional(v.number()),
              quantity: v.optional(v.number()),
            })
          ),
        })
      )
    ),
    images: v.optional(v.array(v.string())),
    isPublish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const products = await ctx.db.patch(args.id, {
      ...rest,
    });
    return products;
  },
});
export const removeAll = mutation({
  args: {
    id: v.array(v.id("product")),
  },
  handler: async (ctx, args) => {
    const products = args.id.forEach(async (id) => {
      await ctx.db.delete(id);
    });

    return products;
  },
});
