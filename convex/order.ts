import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getorder = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("order").order("desc").collect();
    return orders;
  },
});
export const getorderById = query({
  args: {
    orderId: v.id("order"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    return order;
  },
});
export const create = mutation({
  args: {
    phone: v.string(),
    address: v.string(),
    totalPrice: v.number(),
    isPaid: v.boolean(),
    orderItems: v.array(
      v.object({
        product: v.id("product"),
        quantity: v.number(),
        option: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db.insert("order", {
      phone: args.phone,
      address: args.address,
      totalPrice: args.totalPrice,
      isPaid: args.isPaid,
      orderItems: args.orderItems,
    });
    return orders;
  },
});
export const remove = mutation({
  args: {
    id: v.id("order"),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db.delete(args.id);
    return orders;
  },
});
export const update = mutation({
  args: {
    id: v.id("order"),
    phone: v.string(),
    address: v.string(),
    totalPrice: v.number(),
    isPaid: v.boolean(),
    orderItems: v.array(
      v.object({
        product: v.id("product"),
        quantity: v.number(),
        option: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const orders = await ctx.db.patch(args.id, {
      ...rest,
    });
    return orders;
  },
});
export const removeAll = mutation({
  args: {
    id: v.array(v.id("order")),
  },
  handler: async (ctx, args) => {
    const orders = args.id.forEach(async (id) => {
      await ctx.db.delete(id);
    });

    return orders;
  },
});
