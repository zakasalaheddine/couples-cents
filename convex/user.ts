import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("users").filter((q) => q.eq(q.field("userId"), args.userId)).first()
  }
})

export const get = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id)
  }
})

export const current = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users")
      .filter(q => q.eq(q.field('userId'), args.userId))
      .first()
    if (!user) return null
    const couple = await ctx.db.query("couples")
      .filter(q => q.or(
        q.eq(q.field('partner1'), user._id),
        q.eq(q.field('partner2'), user._id)
      )).first()
    if (!couple) return null
    const partnerId = couple.partner1 === user._id ? couple.partner2 : couple.partner1
    if (partnerId) {
      const partnerUser = await ctx.db.get(partnerId)
      return { user, couple, partnerUserId: partnerUser?.userId }
    }
    return { user, couple, partnerUserId: undefined }
  }
})

export const createUser = mutation({
  args: { userId: v.string(), email: v.string() },
  handler: async (ctx, { userId, email }) => {
    const convexUserId = await ctx.db.insert('users', { userId, email })
    return await ctx.db.get(convexUserId)
  }
})
