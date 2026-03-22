import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, Home, Wrench, HardHat, Landmark, ClipboardList, Star, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { seoConfig, getImage } from "@/lib/config";
import PageHead from "@/components/PageHead";
import heroImage from "@/assets/hero-construction.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

// Scroll reveal wrapper
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}

const serviceIcons = [Home, Building2, Wrench, Landmark, HardHat, ClipboardList];

export default function Index() {
  const { stats, services, steps, certifications, testimonials, featuredProject } = seoConfig;

  return (
    <main>
      <PageHead page="home" />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={getImage(null, 'hero', heroImage)} alt={`${seoConfig.businessName} - ${seoConfig.industry}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
        </div>
        <div className="container relative z-10 pt-20 pb-32">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight text-secondary-foreground animate-fade-up">
              Building Trust.<br />
              <span className="text-gold">One Project</span><br />
              At a Time.
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/70 max-w-lg animate-fade-up" style={{ animationDelay: "150ms" }}>
              Residential and commercial {seoConfig.industry.toLowerCase()}. Licensed, bonded, and insured — delivering quality construction for over {parseInt(seoConfig.stats[2]?.value) || 15} years.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Link to="/contact">
                <Button variant="hero">Request a Bid</Button>
              </Link>
              <Link to="/projects">
                <Button variant="hero-outline">View Our Projects</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* Stats Bar */}
      <section className="section-secondary py-8 -mt-1">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-muted-foreground/20">
            {stats.map((s, i) => (
              <Reveal key={s.label} className="text-center px-4" delay={i * 100}>
                <div className="font-heading text-3xl md:text-4xl font-bold text-gold tabular-nums">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 blueprint-pattern">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              What We <span className="text-gold">Build</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((s, i) => {
              const Icon = serviceIcons[i] || Building2;
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="bg-card p-8 border border-border shadow-sm hover:shadow-md transition-shadow duration-300 group">
                    <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-105 transition-transform duration-200" />
                    <h3 className="font-heading text-xl font-semibold uppercase tracking-wide">{s.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.shortDesc}</p>
                    <Link to="/services" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:gap-2 transition-all duration-200">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              Featured <span className="text-gold">Project</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-center">
            <Reveal className="overflow-hidden">
              <img src={getImage(null, featuredProject.imageSlot, projectResidential)} alt={featuredProject.title} className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
            <Reveal delay={150}>
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">{featuredProject.type}</span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase mt-2">{featuredProject.title}</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">{featuredProject.desc}</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {featuredProject.stats.map(([val, label]) => (
                  <div key={label}>
                    <div className="font-heading text-xl font-bold text-gold">{val}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
              <Link to="/projects" className="mt-8 inline-block">
                <Button variant="outline">View All Projects</Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              How We <span className="text-gold">Build</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 100} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto relative z-10 shadow-lg">
                    <span className="font-heading text-lg font-bold text-primary-foreground">{s.num}</span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold uppercase mt-4">{s.title}</h4>
                  <p className="text-muted-foreground text-sm mt-2">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 border-y border-border">
        <div className="container">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-heading text-sm uppercase tracking-wider">{cert}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="border border-muted-foreground/20 p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed flex-1">"{t.text}"</p>
                  <div className="mt-6 pt-4 border-t border-muted-foreground/20">
                    <div className="font-heading text-sm font-semibold uppercase">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-secondary">
        <div className="container text-center">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight text-secondary-foreground">
              Let's Build <span className="text-gold">Something.</span>
            </h2>
            <p className="text-secondary-foreground/60 mt-4 text-lg">Ready to start your next project? We're here.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="hero">Request a Bid</Button>
              </Link>
              <a href={`tel:${seoConfig.phoneRaw}`} className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors font-heading uppercase tracking-wider text-sm">
                <Phone className="w-5 h-5 text-primary" /> {seoConfig.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
