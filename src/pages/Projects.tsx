import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Calendar, Ruler } from "lucide-react";
import { seoConfig, getImage } from "@/lib/config";
import PageHead from "@/components/PageHead";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";
import projectConcrete from "@/assets/project-concrete.jpg";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}>
      {children}
    </div>
  );
}

const filters = ["All", "Residential", "Commercial", "Renovation", "Specialty"];
const projectImages: Record<string, string> = {
  project_1: projectResidential,
  project_2: projectCommercial,
  project_3: projectRenovation,
  project_4: projectConcrete,
  project_5: projectResidential,
  project_6: projectCommercial,
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const projects = seoConfig.projects;
  const filtered = active === "All" ? projects : projects.filter((p) => p.type === active);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <main className="pt-20">
      <PageHead page="projects" />

      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">Portfolio</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight mt-2">
              Our <span className="text-gold">Projects</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <Reveal>
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`font-heading text-sm uppercase tracking-wider px-5 py-2 border transition-all duration-200 active:scale-[0.97] ${
                    active === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((p, i) => {
              const fallback = projectImages[p.imageSlot] || projectResidential;
              return (
                <Reveal key={p.title + p.date} delay={i * 80}>
                  <div
                    className="bg-card border border-border overflow-hidden group cursor-pointer"
                    onClick={() => setExpanded(expanded === p.title ? null : p.title)}
                  >
                    <div className="overflow-hidden h-64">
                      <img src={getImage(null, p.imageSlot, fallback)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">{p.type}</span>
                      <h3 className="font-heading text-xl font-semibold uppercase mt-1">{p.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {p.sqft} sf</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</span>
                      </div>
                      {expanded === p.title && (
                        <p className="text-muted-foreground text-sm mt-4 leading-relaxed animate-fade-up">{p.desc}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
