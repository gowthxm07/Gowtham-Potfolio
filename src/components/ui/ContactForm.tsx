"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { profileData } from "@/data/profile";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionMethod, setSubmissionMethod] = useState<"emailjs" | "direct">("emailjs");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Check if live EmailJS credentials are configured (and not template placeholders)
    const hasLiveEmailJS =
      serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes("your_") &&
      !templateId.includes("your_") &&
      !publicKey.includes("your_");

    if (!hasLiveEmailJS) {
      // Graceful direct mail client dispatch when EmailJS credentials are pending
      setSubmissionMethod("direct");
      setTimeout(() => {
        const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
          `Portfolio Inquiry from ${formData.name.trim()}`
        )}&body=${encodeURIComponent(
          `Sender: ${formData.name.trim()} (${formData.email.trim()})\n\nMessage:\n${formData.message.trim()}`
        )}`;
        window.open(mailtoUrl, "_blank");
        setStatus("success");
      }, 500);
      return;
    }

    try {
      setSubmissionMethod("emailjs");
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
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            subject: `Portfolio Inquiry from ${formData.name.trim()}`,
            message: formData.message.trim(),
            to_name: profileData.name,
            to_email: profileData.email,
            reply_to: formData.email.trim(),
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errText = await response.text();
        throw new Error(errText || "Email transmission failed. Please try direct email.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transmission failed.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-4">
      {status === "success" ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
          <div className="flex items-center gap-2 font-mono text-sm font-bold mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            MESSAGE TRANSMITTED
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
            {submissionMethod === "emailjs"
              ? `Thank you for reaching out! Your message has been sent to ${profileData.email}.`
              : `Your default email client was opened to dispatch directly to ${profileData.email}. Thank you!`}
          </p>
          <button
            onClick={handleReset}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline focus:outline-none"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="contact-name" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans transition-colors"
                disabled={status === "submitting"}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Email *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@domain.com"
                className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans transition-colors"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detail your engineering project or opportunity..."
              className="w-full px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-sans resize-none transition-colors"
              disabled={status === "submitting"}
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 bg-red-950/20 p-2 rounded-lg border border-red-800/40">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage || "Transmission error. Please try again."}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            {status === "submitting" ? "SENDING MESSAGE..." : "SEND MESSAGE"}
          </button>
        </form>
      )}

      {/* Verified Professional Channels */}
      <div className="pt-3 border-t border-surface-border flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono text-slate-300">
        <a
          href={`mailto:${profileData.email}`}
          aria-label={`Send email to ${profileData.email}`}
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span>{profileData.email}</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-emerald-400" />
            <span>GitHub</span>
          </a>
          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-emerald-400" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
