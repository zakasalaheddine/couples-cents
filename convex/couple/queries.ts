import { v } from "convex/values";
import { query } from "../_generated/server";

export const getCouple = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return null
    return await ctx.db.query("couples")
      .filter(q => q.or(
        q.eq(q.field('partner1'), userId),
        q.eq(q.field('partner2'), userId)
      )).first()
  }
})