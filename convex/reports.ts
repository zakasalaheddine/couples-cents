import { v } from "convex/values";
import { query } from "./_generated/server";

export const stats = query({
  args: { coupleId: v.id("couples") },
  handler: async (ctx, args) => {
    return await ctx.db.query("transactions")
      .filter(q => q.eq(q.field("couple"), args.coupleId))
      .collect()
  }
})