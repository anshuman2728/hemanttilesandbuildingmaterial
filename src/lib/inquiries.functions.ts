import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  productInterest: z.string().optional(),
  message: z.string().trim().min(5).max(1000),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await (supabase as any).from("inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      product_interest: data.productInterest || null,
      message: data.message,
    });

    if (error) {
      console.error("Inquiry insert error:", error);
      throw new Error("Failed to save inquiry");
    }

    return { success: true };
  });
