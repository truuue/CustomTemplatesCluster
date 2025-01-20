import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  thumbnail: z.string().optional(),
  category: z
    .enum(["business", "portfolio", "startup", "saas", "ecommerce", ""])
    .optional()
    .default(""),
  sections: z.array(z.any()).default([]),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const sectionSchema = z.object({
  id: z.string(),
  type: z.enum([
    "header",
    "hero",
    "features",
    "pricing",
    "testimonials",
    "contact",
    "footer",
  ]),
  content: z.any(),
  style: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    padding: z.string().optional(),
    layout: z
      .enum(["grid", "carousel", "list", "center", "left", "right"])
      .optional(),
  }),
});
