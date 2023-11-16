import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBillboard = query({
  handler: async (ctx) => {
    const billboards = await ctx.db.query("billboard").order("desc").collect();
    return billboards;
  },
});
export const getBillboardById = query({
  args: {
    billboardId: v.id("billboard"),
  },
  handler: async (ctx, args) => {
    const billboard = await ctx.db.get(args.billboardId);
    return billboard;
  },
});
