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
