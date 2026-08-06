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
import { WhatsAppIcon, whatsappLink } from "@/lib/whatsapp";
import { products as allProducts } from "@/lib/products";

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
      { property: "og:url", content: "https://hemanttilesandbuildingmaterial.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://hemanttilesandbuildingmaterial.lovable.app/contact" }],
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
  const [notifyLink, setNotifyLink] = useState<string | null>(null);

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
        const interestLabel =
          allProducts.find((p) => p.id === payload.productInterest)?.title ??
          "General inquiry";
        const leadMessage = [
          "New lead from the Hemant Tiles website",
          `Name: ${result.data.name}`,
          `Phone: ${result.data.phone}`,
          result.data.email ? `Email: ${result.data.email}` : "",
          `Interested in: ${interestLabel}`,
          `Message: ${result.data.message}`,
        ]
          .filter(Boolean)
          .join("\n");
        const link = whatsappLink(leadMessage);
        setNotifyLink(link);
        if (typeof window !== "undefined") {
          window.open(link, "_blank", "noopener,noreferrer");
        }
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
                Hemant Tiles and Building Materials, Sankar Nagar Colony,
                661/2, near Jio Tower, Ram Nagar Industrial Area, Tengra mod,
                Ramnagar, Varanasi, Uttar Pradesh 221008
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+919451365107"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Phone className="h-5 w-5" />
              Call +91 94513 65107
            </a>
            <a
              href={`https://wa.me/919451365107?text=${encodeURIComponent(
                "Hi, I'd like to enquire about your products. Please share more details.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href="mailto:hemantsingh1965@gmail.com"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-foreground leading-tight">
                Open from 9:00 AM
              </p>
              <p className="text-sm text-muted-foreground">
                Monday – Saturday, 9:00 AM onwards
              </p>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Hemant Tiles and Building Materials location map"
              src="https://maps.google.com/maps?q=Sankar%20Nagar%20Colony%2C%20Ram%20Nagar%20Industrial%20Area%2C%20Tengra%20mod%2C%20Ramnagar%2C%20Varanasi%2C%20Uttar%20Pradesh%20221008&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
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
          {notifyLink && (
            <div className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-4">
              <p className="text-sm font-medium text-foreground">
                Inquiry saved. Tap below to also notify us instantly on
                WhatsApp — it opens a chat with your details ready to send.
              </p>
              <a
                href={notifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Notify on WhatsApp
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

