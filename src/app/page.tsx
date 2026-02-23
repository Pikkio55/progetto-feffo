import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Pricing } from "@/components/marketing/Pricing";
import { CTA } from "@/components/marketing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <Pricing />
        <CTA />
        <footer className="border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Progetto Feffo · Voice SaaS per Twilio + ElevenLabs
        </footer>
      </div>
    </main>
  );
}
