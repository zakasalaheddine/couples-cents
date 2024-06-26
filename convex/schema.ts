import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
  }),
  couples: defineTable({
    partner1: v.optional(v.id("users")),
    partner2: v.optional(v.id("users"))
  }),
  categories: defineTable({
    name: v.string(),
    icon: v.string(),
    type: v.string(),
    couple: v.id("couples")
  }),
  transactions: defineTable({
    description: v.string(),
    amount: v.float64(),
    date: v.string(),
    category: v.id("categories"),
    type: v.string(),
    user: v.id("users"),
    couple: v.id("couples")
  }),
});