import { pgTable, text, serial, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist)
  .pick({ email: true })
  .extend({
    email: z.string().email("Please enter a valid email address"),
  });

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

export const calculationHistory = pgTable("calculation_history", {
  id: serial("id").primaryKey(),
  productQuantity: text("product_quantity").notNull(),
  costs: jsonb("costs").notNull(),
  pricing: jsonb("pricing").notNull(),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
});

// Zod schema for cost inputs
export const costInputSchema = z.object({
  productCost: z.number().min(0, "Product cost must be positive"),
  shippingCost: z.number().min(0, "Shipping cost must be positive"),
  packagingCost: z.number().min(0, "Packaging cost must be positive"),
  marketingCost: z.number().min(0, "Marketing cost must be positive"),
  platformFees: z.number().min(0, "Platform fees must be positive"),
  additionalCosts: z.number().min(0, "Additional costs must be positive"),
});

// Zod schema for tax and fees
export const taxFeesSchema = z.object({
  gstRate: z.number().min(0, "GST rate must be positive"),
  paymentGatewayRate: z.number().min(0, "Payment gateway rate must be positive"),
});

export const calculationSchema = z.object({
  productQuantity: z.number().min(1, "Product quantity is required"),
  costs: costInputSchema,
  pricing: z.object({
    sellingPrice: z.number().min(0, "Selling price must be positive"),
  }),
  includeTaxes: z.boolean().default(false),
  taxAndFees: taxFeesSchema.optional(),
});

export const insertCalculationSchema = createInsertSchema(calculationHistory);

export type CostInputs = z.infer<typeof costInputSchema>;
export type TaxAndFees = z.infer<typeof taxFeesSchema>;
export type Calculation = z.infer<typeof calculationSchema>;
export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type CalculationHistory = typeof calculationHistory.$inferSelect;