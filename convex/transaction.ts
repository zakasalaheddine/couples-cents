import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createTransaction = mutation({
  args: {
    description: v.string(),
    amount: v.float64(),
    date: v.string(),
    category: v.id("categories"),
    type: v.string(),
    user: v.id("users"),
    couple: v.id("couples")
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("transactions", args)
  }
})