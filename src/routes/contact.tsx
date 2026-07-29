import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { submitInquiry } from "@/lib/inquiries.functions";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(20),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(255)
    .optional()
    .or(z.literal("")),
  productInterest: z.string().optional(),
  message: z.string().trim().min(5, "Message is required").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hemant Tiles and Building Materials" },
      {
        name: "description",
        content:
          "Get in touch with Hemant Tiles and Building Materials in Tengdamod, Varanasi.",
      },
      {
        property: "og:title",
        content: "Contact — Hemant Tiles and Building Materials",
      },
      {
        property: "og:description",
        content:
          "Get in touch with Hemant Tiles and Building Materials in Tengdamod, Varanasi.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = useSearch({ strict: false }) as { interest?: string };
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    productInterest: search.interest || "general",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...result.data,
        productInterest:
          result.data.productInterest === "general"
            ? undefined
            : result.data.productInterest,
      };
      const response = await submitInquiry({ data: payload });
      if (response.success) {
        toast.success("Inquiry sent! We will contact you soon.");
        setForm({
          name: "",
          phone: "",
          email: "",
          productInterest: "general",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or want a quote? Send us a message and we will
            respond within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>
                Hemant Tiles and Building Materials, Tengdamod, Varanasi, Uttar
                Pradesh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <span>+91 00000 00000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span>info@hemanttiles.com</span>
            </li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="productInterest">Product interest</Label>
            <Select
              value={form.productInterest}
              onValueChange={(value) =>
                setForm({ ...form, productInterest: value })
              }
            >
              <SelectTrigger id="productInterest">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General inquiry</SelectItem>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us what you need..."
              rows={4}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Sending..." : "Send inquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
}

