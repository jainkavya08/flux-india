"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, Sparkles, Send, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
});

type SubscribeData = z.infer<typeof subscribeSchema>;

export function NewsletterStrip() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setIsSuccess(true);
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 },
          });
        } catch {
          // ignore
        }
        reset();
      } else {
        setErrorMessage(json.message || "Could not subscribe. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#384a6b] text-white py-14 sm:py-16 relative border-y border-white/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#5b9bd5]" />
          <span>Engineering Intelligence &bull; Monthly Digest</span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white !text-white tracking-tight">
          Subscribe for Solutions
        </h3>

        <p className="mt-3 text-sm sm:text-base text-[#d6e8fa] max-w-xl mx-auto leading-relaxed">
          Stay ahead with new OEM component releases, lead-time bulletins, and electrical cross-referencing guides delivered straight to your inbox.
        </p>

        {/* Subscribe Form */}
        <div className="mt-8 max-w-md mx-auto">
          {isSuccess ? (
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/50 text-white flex items-center justify-center gap-3 shadow-lg animate-in fade-in duration-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-left text-xs sm:text-sm">
                <span className="font-bold text-white block">You&apos;re Subscribed!</span>
                <span className="text-blue-100">Thank you for joining the FLUX Engineering network.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-full border border-blue-200 shadow-xl">
                <div className="relative flex-grow flex items-center pl-4">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your business email..."
                    className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                  className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white shrink-0"
                >
                  Subscribe Now
                </Button>
              </div>

              {errors.email && (
                <p className="text-xs text-rose-300 font-medium text-left px-4">
                  {errors.email.message}
                </p>
              )}

              {errorMessage && (
                <p className="text-xs text-rose-300 font-medium text-left px-4">
                  {errorMessage}
                </p>
              )}
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-blue-200/80 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero spam. Unsubscribe anytime. OEM technical briefs only.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
