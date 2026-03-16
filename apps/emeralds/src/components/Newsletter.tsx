import { useState } from "react";
import { Button } from "./ui/button";
import { localizeContent } from "@/hooks/sanity-helper";
import { type NewsletterSection } from "@/lib/sanity/sanity-types";

export interface NewsletterProps {
  sectionContent: NewsletterSection;
}

export default function Newsletter({ sectionContent }: NewsletterProps) {
  const title = localizeContent(sectionContent?.header?.title ?? {});
  const description = localizeContent(sectionContent?.header?.description ?? {});
  const placeholder = localizeContent(sectionContent?.placeholder ?? {});
  const ctaText = localizeContent(sectionContent?.header?.cta?.text ?? {});

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-brand-secondary-terra py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 text-white/80">{description}</p>
        {status === "success" ? (
          <p className="text-brand-secondary-golden font-body">¡Gracias por suscribirte!</p>
        ) : (
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 focus:border-brand-secondary-golden focus:outline-none"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-brand-secondary-golden px-8 text-brand-secondary-terra hover:bg-brand-secondary-golden/90 disabled:opacity-60"
            >
              {status === "loading" ? "…" : ctaText}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-white/70">Error al suscribirse. Intenta de nuevo.</p>
        )}
      </div>
    </section>
  );
}
