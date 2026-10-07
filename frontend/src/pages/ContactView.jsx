import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import { GoArrowUpRight } from "react-icons/go";
import { LuLoader } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ScrollReveal } from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { profileData } from "@/data/portfolioData";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .max(20, "Phone number cannot exceed 20 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be at most 500 characters."),
});

const ContactView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);

      const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
      const response = await axios.post(`${API_BASE}/api/v1/sendmail`, data);

      if (response.status === 200 || response.data?.success) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you shortly.",
        });
        form.reset();
      } else {
        toast.error(response.data?.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);

      const errorMsg =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK"
          ? `Could not reach backend API. Feel free to email directly at ${profileData.email}`
          : "An unexpected error occurred while sending your message.");

      toast.error("Unable to send message", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead canonical="/contact" />
      {/* Header - Consistent with WorkView, BlogView, ResumeView */}
      <ScrollReveal delay={0.04} y={16}>
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-2">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#909092]">
            Have a project, role, or collaboration in mind? Drop me a message below or reach out directly.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Contact Form Card */}
      <ScrollReveal delay={0.08} y={18}>
        <Card className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl shadow-xs overflow-hidden mb-12">
          <CardHeader className="p-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
              Send a Message
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-[#909092] mt-1">
              Fill out the form below. I typically respond within 24 hours.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Name Field */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="contact-form-name">
                        <span>Your Name</span>
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="contact-form-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Alex Smith"
                        autoComplete="name"
                        className={fieldState.invalid ? "border-red-500/50 focus-visible:ring-red-500" : ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="contact-form-email">
                        <span>Your Email</span>
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="contact-form-email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="alex@example.com"
                        autoComplete="email"
                        className={fieldState.invalid ? "border-red-500/50 focus-visible:ring-red-500" : ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Phone Field (Optional) */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="contact-form-phone">
                        <span>Your Phone Number</span>
                        <span className="text-[11px] font-mono text-[#909092] font-normal">
                          (Optional)
                        </span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="contact-form-phone"
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        className={fieldState.invalid ? "border-red-500/50 focus-visible:ring-red-500" : ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Message Field */}
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="contact-form-message">
                        <span>Message</span>
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <InputGroup className={fieldState.invalid ? "border-red-500/50 focus-within:ring-red-500" : ""}>
                        <InputGroupTextarea
                          {...field}
                          id="contact-form-message"
                          placeholder="Tell me about your project, timeline, or inquiry..."
                          rows={5}
                          className="min-h-28 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/500 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Share key details about what you're building or looking for.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="contact-form"
              disabled={isSubmitting}
              className="min-w-32 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LuLoader className="animate-spin text-sm" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <GoArrowUpRight className="text-sm" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </ScrollReveal>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default ContactView;
