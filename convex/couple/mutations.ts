import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createCouple = mutation({
  args: { partner: v.id("users"), coupleId: v.optional(v.id("couples")) },
  handler: async (ctx, { partner, coupleId }) => {
    if (coupleId) {
      await ctx.db.patch(coupleId, { partner2: partner })
    } else {
      await ctx.db.insert("couples", { partner1: partner })
    }
  }
})