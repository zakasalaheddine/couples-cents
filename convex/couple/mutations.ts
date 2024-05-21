import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createCouple = mutation({
  args: { partner: v.id("users") },
  handler: async (ctx, { partner }) => {
    await ctx.db.insert("couples", { partner1: partner })
  }
})

export const connect = mutation({
  args: { userId: v.string(), coupleId: v.id("couples") },
  handler: async (ctx, { userId, coupleId }) => {
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("userId"), userId)).first()
    if (user) {
      // const prevCouple = await ctx.db.query("couples").filter(q => q.eq(q.field("partner1"), user._id)).first()
      // if (prevCouple) {
      //   await ctx.db.patch(prevCouple._id, { partner1: undefined })
      // }
      await ctx.db.patch(coupleId, { partner2: user._id })
    }
  }
})