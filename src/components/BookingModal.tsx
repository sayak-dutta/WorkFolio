"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { submitToSheet } from "@/lib/sheets";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

const PROJECT_TYPES = [
  "Landing Page",
  "Business Website",
  "E-Commerce Store",
  "Blog / Content Site",
  "Portfolio",
  "Web App / SaaS",
  "Redesign",
  "Other",
];

const BUDGETS = [
  "Under ₹15,000",
  "₹15,000 – ₹35,000",
  "₹35,000 – ₹75,000",
  "₹75,000 – ₹1,50,000",
  "₹1,50,000+",
  "Let's discuss",
];

const TIMELINES = [
  "ASAP (< 1 week)",
  "1–2 weeks",
  "2–4 weeks",
  "1–2 months",
  "Flexible",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

const EMPTY: FormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

export function BookingModal({ isOpen, onClose, projectTitle }: BookingModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await submitToSheet("Bookings", {
      Timestamp: new Date().toISOString(),
      "Inspired By": projectTitle,
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      "Project Type": form.projectType,
      Budget: form.budget,
      Timeline: form.timeline,
      Description: form.description,
      "User Agent": navigator.userAgent,
    });

    setStatus(result.ok ? "success" : "error");
  };

  const handleClose = () => {
    setForm(EMPTY);
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-zinc-950 border-b border-zinc-800">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Book a Delivery</h2>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    Inspired by <span className="text-blue-400">{projectTitle}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success State */}
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-20 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-2xl font-semibold text-white">You're in the queue!</h3>
                  <p className="text-zinc-400 max-w-sm">
                    I'll review your brief and get back to you within 24 hours. Keep an eye on your inbox!
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Your Name *" required>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="input-field"
                      />
                    </Field>
                    <Field label="Email Address *" required>
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className="input-field"
                      />
                    </Field>
                  </div>

                  {/* Phone */}
                  <Field label="Phone / WhatsApp">
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="input-field"
                    />
                  </Field>

                  {/* Project Type */}
                  <Field label="What do you need? *" required>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("projectType", t)}
                          className={`px-4 py-2 rounded-full text-sm border transition ${
                            form.projectType === t
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Budget */}
                  <Field label="Approximate Budget *" required>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => set("budget", b)}
                          className={`px-4 py-2 rounded-full text-sm border transition ${
                            form.budget === b
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Timeline */}
                  <Field label="Timeline" required={false}>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((tl) => (
                        <button
                          key={tl}
                          type="button"
                          onClick={() => set("timeline", tl)}
                          className={`px-4 py-2 rounded-full text-sm border transition ${
                            form.timeline === tl
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                          }`}
                        >
                          {tl}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Description */}
                  <Field label="Tell me about your project *" required>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe what you're building, your target audience, and any specific requirements or references..."
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      className="input-field resize-none"
                    />
                  </Field>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Something went wrong. Please try again or reach out directly.
                    </p>
                  )}

                  {/* Submit */}
                  <div className="flex justify-end pb-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {status === "loading" ? "Sending…" : "Send Brief"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      {children}
    </div>
  );
}
