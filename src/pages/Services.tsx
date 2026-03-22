import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Home, Building2, Wrench, Landmark, HardHat, ClipboardList, ArrowRight } from "lucide-react";
import { seoConfig, getImage } from "@/lib/config";
import PageHead from "@/components/PageHead";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";
import projectConcrete from "@/assets/project-concrete.jpg";
import heroImage from "@/assets/hero-construction.jpg";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}>
      {children}
    </div>
  );
}

const serviceIcons = [Home, Building2, Wrench, Landmark, HardHat, ClipboardList];
const serviceImages = [projectResidential, projectCommercial, projectRenovation, projectConcrete, heroImage, projectCommercial];

export default function Services() {
  const { services } = seoConfig;

  return (
    <main className="pt-20">
      <PageHead page="services" />

      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">What We Do</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight mt-2">
              Our <span className="text-gold">Services</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container space-y-24">
          {services.map((s, i) => {
            const Icon = serviceIcons[i] || Building2;
            const fallbackImage = serviceImages[i] || projectCommercial;
            return (
              <Reveal key={s.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="overflow-hidden lg:[direction:ltr]">
                    <img src={getImage(null, s.imageSlot, fallbackImage)} alt={s.title} className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="lg:[direction:ltr]">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-8 h-8 text-primary" />
                      <h2 className="font-heading text-3xl font-bold uppercase">{s.title}</h2>
                    </div>
                    <p className="text-muted-foreground mt-2">{s.scope}</p>
                    <p className="text-sm text-primary font-medium mt-2">{s.timeline}</p>
                    <h4 className="font-heading text-sm uppercase tracking-wider mt-6 mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="mt-6 inline-block">
                      <Button variant="default">Request a Bid for {s.title}</Button>
                    </Link>
                  </div>
                </div>
                {i < services.length - 1 && <div className="border-b border-border mt-24" />}
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
