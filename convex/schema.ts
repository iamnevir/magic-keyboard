import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  billboard: defineTable({
    producer: v.string(),
    title: v.string(),
    subTitle: v.optional(v.string()),
    imageUrl: v.string(),
    order: v.optional(v.string()),
    url: v.optional(v.string()),
    isPublish: v.boolean(),
  }).index("by_producer", ["producer"]),
  category: defineTable({
    name: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_name", ["name"]),
  collection: defineTable({
    name: v.string(),
    categoryId: v.id("category"),
  }).index("by_category", ["categoryId"]),

  product: defineTable({
    name: v.string(),
    producer: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    pay: v.optional(v.string()),
    quantity: v.optional(v.number()),
    collectionId: v.id("collection"),
    options: v.optional(
      v.array(
        v.object({
          name: v.string(),
          option: v.array(
            v.object({
              name: v.string(),
              image: v.optional(v.string()),
              price: v.optional(v.number()),
              quantity: v.optional(v.number()),
            })
          ),
        })
      )
    ),
    images: v.optional(v.array(v.string())),
    isPublish: v.boolean(),
  }).index("by_category", ["collectionId"]),
  order: defineTable({
    phone: v.string(),
    address: v.string(),
    totalPrice: v.number(),
    isPaid: v.boolean(),
    orderItems: v.array(
      v.object({
        product: v.id("product"),
        quantity: v.number(),
        option: v.string(),
      })
    ),
  }).index("by_phone", ["phone"]),
});
