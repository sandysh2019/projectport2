import { Code2, Layers3, Mail, Phone } from "lucide-react";
import { BorderBeamButton } from "@/components/BorderBeamButton";
import { ContactForm } from "@/components/ContactForm";
import { FadeInSection } from "@/components/FadeInSection";
import { GlassCard } from "@/components/GlassCard";
import { TiltCard } from "@/components/TiltCard";
import { getSiteSettings, getWorks } from "@/lib/data";

export default async function Home() {
  const [settings, works] = await Promise.all([getSiteSettings(), getWorks()]);

  return (
    <main className="relative overflow-x-hidden bg-background text-text">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[120px]" style={{ animation: "mesh-shift 60s ease-in-out infinite" }} />
        <div className="absolute right-[-10%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-success/10 blur-[120px]" style={{ animation: "mesh-shift 55s ease-in-out infinite" }} />
      </div>

      <section className="mx-auto min-h-screen max-w-7xl px-6 py-20 md:px-12">
        <FadeInSection className="flex min-h-[80vh] flex-col justify-center gap-8">
          <p className="text-sm uppercase tracking-[0.24em] text-text-secondary">Santhosh / BSc AI & DS</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-7xl">Raw design language. Production-grade full-stack systems.</h1>
          <p className="max-w-2xl text-base leading-8 text-text-secondary md:text-lg">I build visual identities and robust applications that ship fast and scale. This portfolio blends graphic storytelling with engineering depth.</p>
          <div className="flex flex-wrap gap-4">
            <BorderBeamButton href="#works">Explore Recent Works</BorderBeamButton>
            <a href="#contact" className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:border-accent/70">
              Start a Project
            </a>
          </div>
        </FadeInSection>
      </section>

      <section className="mx-auto min-h-screen max-w-7xl px-6 py-16 md:px-12">
        <FadeInSection>
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">Services</h2>
        </FadeInSection>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeInSection delay={0.1}>
            <GlassCard className="h-full p-6">
              <Layers3 className="mb-5 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold">Graphic Design Package</h3>
              <p className="mt-3 text-text-secondary">Brand systems, campaign graphics, social assets, and presentation design with technical precision.</p>
            </GlassCard>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <GlassCard className="h-full p-6">
              <Code2 className="mb-5 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold">Full-Stack Development Package</h3>
              <p className="mt-3 text-text-secondary">End-to-end applications with secure auth, modern APIs, responsive UIs, and maintainable architecture.</p>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>

      <section id="works" className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <FadeInSection>
            <h2 className="mb-8 text-3xl font-bold md:text-5xl">Recent Works</h2>
          </FadeInSection>
          <div className="flex snap-x gap-6 overflow-x-auto pb-6">
            {works.map((work, index) => (
              <TiltCard key={work._id} className="min-w-[20rem] snap-start md:min-w-[26rem]">
                <FadeInSection delay={index * 0.1}>
                  <GlassCard className="h-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={work.imageUrl} alt={work.title} className="h-56 w-full object-cover transition duration-300 hover:scale-105" />
                    <div className="space-y-3 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-accent">{work.category}</p>
                      <h3 className="text-xl font-bold">{work.title}</h3>
                      <p className="text-sm text-text-secondary">{work.description}</p>
                    </div>
                  </GlassCard>
                </FadeInSection>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto min-h-screen max-w-7xl px-6 py-16 md:px-12">
        <FadeInSection>
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">Contact</h2>
        </FadeInSection>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeInSection>
            <ContactForm />
          </FadeInSection>
          <FadeInSection delay={0.1} className="space-y-4">
            <GlassCard className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Direct Channels</p>
              <div className="mt-4 space-y-3">
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> 9994723048</p>
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> santhoshwe2007@gmail.com</p>
              </div>
              <a href="https://wa.me/919994723048" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:border-accent/70">
                WhatsApp Redirect
              </a>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Testimonials</p>
              <div className="mt-4 space-y-4">
                {settings.testimonials.map((item: { name: string; role: string; quote: string }) => (
                  <div key={item.name + item.role} className="border-l-2 border-accent/70 pl-4">
                    <p className="text-sm text-text-secondary">&quot;{item.quote}&quot;</p>
                    <p className="mt-2 text-sm font-semibold">{item.name} - {item.role}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
