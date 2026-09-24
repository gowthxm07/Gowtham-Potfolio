"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { profileData } from "@/data/profile";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Graceful fallback to mailto if EmailJS environment variables are not yet configured
      setTimeout(() => {
        const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
          formData.subject || `Portfolio Inquiry from ${formData.name}`
        )}&body=${encodeURIComponent(
          `Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoUrl, "_blank");
        setStatus("success");
      }, 600);
      return;
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || "Portfolio Contact Inquiry",
            message: formData.message,
            to_name: profileData.name,
            reply_to: formData.email,
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errText = await response.text();
        throw new Error(errText || "Transmission failed.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transmission failed.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  return (
    <div className="space-y-4">
      {status === "success" ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
          <div className="flex items-center gap-2 font-mono text-sm font-bold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            TRANSMISSION DISPATCHED
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Thank you for reaching out. Your message has been routed to {profileData.email}.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-3 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
          >
            Send Another Dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@domain.com"
                className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Engineering Opportunity / Collaboration"
              className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Message *
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detail your engineering project or inquiry..."
              className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans resize-none"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage || "Transmission error. Please try again."}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {status === "sending" ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}
          </button>
        </form>
      )}

      {/* Direct Contact Links */}
      <div className="pt-3 border-t border-surface-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
        <a
          href={`mailto:${profileData.email}`}
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span>{profileData.email}</span>
        </a>
        <a
          href={`tel:${profileData.phone}`}
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>{profileData.phone}</span>
        </a>
      </div>
    </div>
  );
}
