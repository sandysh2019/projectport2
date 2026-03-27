"use client";

import { FormEvent, useState } from "react";
import { GlassCard } from "@/components/GlassCard";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const payload = await response.json();
    setStatus(payload.message || "Sent");
    setLoading(false);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm text-text-secondary">
          Name
          <input name="name" required className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-text outline-none focus:ring-2 focus:ring-accent/70" />
        </label>
        <label className="block text-sm text-text-secondary">
          Email
          <input type="email" name="email" required className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-text outline-none focus:ring-2 focus:ring-accent/70" />
        </label>
        <label className="block text-sm text-text-secondary">
          Message
          <textarea name="message" rows={5} required className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-text outline-none focus:ring-2 focus:ring-accent/70" />
        </label>
        <button type="submit" className="beam-border w-full rounded-xl border border-border bg-accent px-4 py-3 font-semibold text-white transition hover:scale-[1.02]">
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status ? <p className="text-sm text-text-secondary">{status}</p> : null}
      </form>
    </GlassCard>
  );
}
