import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCategoriesList = query({
  args: { coupleId: v.id("couples") },
  handler: async (ctx, args) => {
    return ctx.db.query("categories")
      .filter((q) => q.eq(q.field("couple"), args.coupleId))
      .collect()
  }
})


export const createCategory = mutation({
  args: { name: v.string(), icon: v.string(), couple: v.id("couples"), type: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("categories", args)
  }
})