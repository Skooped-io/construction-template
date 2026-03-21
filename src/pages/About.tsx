import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Award, Users, MessageSquare } from "lucide-react";
import founderImage from "@/assets/founder.jpg";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}>
      {children}
    </div>
  );
}

const values = [
  { icon: Shield, title: "Safety", desc: "Zero-compromise safety culture. OSHA-compliant protocols on every site." },
  { icon: Award, title: "Quality", desc: "Premium materials, skilled craftsmen, and rigorous quality control." },
  { icon: Users, title: "Integrity", desc: "Transparent pricing, honest timelines, and no hidden surprises." },
  { icon: MessageSquare, title: "Communication", desc: "Weekly updates, open-door policy, and responsive project managers." },
];

const milestones = [
  { year: "2009", event: "Company founded by Robert Garrison" },
  { year: "2012", event: "Completed 25th residential project" },
  { year: "2015", event: "Expanded into commercial construction" },
  { year: "2018", event: "Reached $10M in annual builds" },
  { year: "2021", event: "100th project milestone" },
  { year: "2024", event: "150+ projects completed, growing strong" },
];

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">Our Story</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight mt-2">
              Built on <span className="text-gold">Grit</span> & Craft
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <img src={founderImage} alt="Robert Garrison, Founder" className="w-full max-w-md mx-auto lg:mx-0 h-[500px] object-cover shadow-xl" />
          </Reveal>
          <Reveal delay={150}>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">Founder & President</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mt-2">Robert Garrison</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              With 25 years in construction — from framing houses as a teenager to managing multi-million dollar commercial builds — Robert founded Ironclad Construction in 2009 with a simple belief: good work speaks for itself.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Starting with residential renovations and custom homes, the company grew through referrals and repeat clients. Today, Ironclad is one of the most trusted general contractors in the metro area, with over 150 completed projects and a team of 40+ skilled professionals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-secondary py-24">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              Our <span className="text-gold">Timeline</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="mt-16 max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <div className="flex gap-6 mb-8 items-start">
                  <div className="font-heading text-2xl font-bold text-gold w-20 shrink-0">{m.year}</div>
                  <div className="flex-1 border-l-2 border-primary/30 pl-6 pb-4">
                    <p className="text-secondary-foreground/80">{m.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 blueprint-pattern">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              Core <span className="text-gold">Values</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="bg-card p-8 border border-border text-center">
                  <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-semibold uppercase">{v.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Record */}
      <section className="section-dark py-24">
        <div className="container text-center max-w-2xl">
          <Reveal>
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-4xl font-bold uppercase">Zero Lost-Time Incidents</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Safety isn't a policy at Ironclad — it's a culture. We've maintained a spotless safety record with mandatory training, daily briefings, and OSHA-compliant protocols on every project.
            </p>
            <Link to="/contact" className="mt-8 inline-block">
              <Button variant="default" size="lg">Work With Us</Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
