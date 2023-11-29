import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getvouchers = query({
  handler: async (ctx) => {
    const vouchers = await ctx.db.query("voucher").order("desc").collect();
    return vouchers;
  },
});

export const getvoucherById = query({
  args: {
    voucherId: v.id("voucher"),
  },
  handler: async (ctx, args) => {
    const voucher = await ctx.db.get(args.voucherId);
    return voucher;
  },
});
export const getVoucherByCode = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const voucher = await ctx.db
      .query("voucher")
      .filter((q) => q.eq(q.field("code"), args.code))
      .unique();
    return voucher;
  },
});
export const getVoucherByType = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const voucher = await ctx.db
      .query("voucher")
      .filter((q) => q.eq(q.field("type"), args.type))
      .unique();
    return voucher;
  },
});
