import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { seoConfig, getImage, slugify } from "@/lib/config";
import { ArrowRight, Phone, MapPin, Mail, ChevronRight } from "lucide-react";
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

const serviceImages = [projectResidential, projectCommercial, projectRenovation, projectConcrete, heroImage, projectCommercial];

const serviceDescriptions: Record<string, string[]> = {
  "custom-homes": [
    "Building a custom home is one of the most significant investments you'll ever make. At {business}, we bring decades of hands-on experience to every residential build — from initial site evaluation through final walkthrough. Our team works closely with architects, engineers, and you to ensure every detail reflects your vision.",
    "We handle every phase of construction: land preparation, foundation work, framing, mechanical systems, interior finishes, and landscaping. Our project managers keep you informed at every stage with weekly progress updates and transparent budgeting.",
    "Whether you're building a modern farmhouse, a traditional estate, or a contemporary minimalist home, our crew delivers craftsmanship that stands the test of time. Every home we build is backed by our quality guarantee and built to exceed local building codes."
  ],
  "commercial-buildings": [
    "From Class A office towers to neighborhood retail centers, {business} delivers commercial construction projects that meet the demands of modern business. We understand the unique challenges of commercial builds — tight timelines, complex permitting, and the need for minimal disruption to surrounding operations.",
    "Our commercial division specializes in steel and concrete structures, tenant improvement buildouts, and full code compliance including ADA accessibility. We work with property developers, business owners, and municipalities to deliver projects on time and within budget.",
    "We also offer LEED certification support for clients seeking sustainable building solutions. Our team coordinates with environmental consultants to integrate energy-efficient systems, sustainable materials, and green building practices into every project."
  ],
  "renovations-additions": [
    "Renovating an existing space requires a different kind of expertise than new construction. At {business}, we specialize in transforming outdated kitchens, bathrooms, and living spaces into modern, functional environments — all while maintaining the structural integrity of your existing home or building.",
    "Our renovation services cover everything from single-room remodels to whole-house transformations, including room additions that seamlessly blend with your existing architecture. We coordinate with interior designers, structural engineers, and specialty subcontractors to deliver exceptional results.",
    "Every renovation project begins with a detailed assessment of your space, your goals, and your budget. We provide honest timelines and transparent pricing — no hidden costs, no surprises. Just quality work that adds lasting value to your property."
  ],
  "concrete-foundation": [
    "A strong foundation is the cornerstone of every successful construction project. {business} provides expert concrete and foundation services for residential, commercial, and industrial applications across the {area}.",
    "Our concrete team handles slab foundations, structural footings, retaining walls, decorative concrete, and waterproofing systems. We use precision grading equipment and high-strength concrete mixes to ensure every pour meets or exceeds structural specifications.",
    "Whether you need a foundation for a new custom home, a retaining wall for a commercial property, or decorative concrete for a patio, our experienced crews deliver clean, durable work on schedule."
  ],
  "metal-buildings": [
    "Pre-engineered and custom metal buildings offer durability, cost efficiency, and design flexibility that traditional construction can't match. {business} designs and constructs metal building solutions for warehouses, agricultural buildings, aircraft hangars, workshops, and more.",
    "Our metal building services include everything from initial design and engineering through erection and finishing. We work with leading manufacturers to source high-quality steel components, and our crews handle insulation, climate control systems, and custom facade treatments.",
    "Metal buildings from {business} are built to withstand the elements and serve your needs for decades. We offer a range of customization options including overhead doors, mezzanines, skylights, and specialized ventilation systems."
  ],
  "project-management": [
    "Complex construction projects demand experienced oversight. {business} offers end-to-end project management services that keep your build on schedule, on budget, and on spec — from groundbreaking to ribbon cutting.",
    "Our project managers serve as your single point of contact, coordinating architects, engineers, subcontractors, inspectors, and suppliers. We handle scheduling, budget tracking, quality assurance, and all communication so you can focus on your business.",
    "Whether you're building a multi-unit residential development, a commercial complex, or a specialty facility, our management team brings the discipline and expertise needed to deliver results. We represent your interests at every stage of the build process."
  ],
};

function getDescriptions(slug: string, businessName: string, serviceArea: string): string[] {
  const templates = serviceDescriptions[slug] || [
    `{business} provides professional ${slug.replace(/-/g, ' ')} services throughout the {area}. With over 15 years of experience, our team delivers quality workmanship on every project.`,
    `Our experienced crew handles every aspect of ${slug.replace(/-/g, ' ')}, from initial planning through final inspection. We maintain transparent communication and honest pricing throughout the process.`,
    `Contact us today for a free estimate on your ${slug.replace(/-/g, ' ')} project. We serve the entire {area} and surrounding communities.`
  ];
  return templates.map(t => t.replace(/\{business\}/g, businessName).replace(/\{area\}/g, serviceArea));
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const config = seoConfig;
  const service = config.services.find(s => slugify(s.title) === slug);

  useEffect(() => {
    if (service) {
      const title = `${service.title} in ${config.address.city}, ${config.address.state} | ${config.businessName}`;
      const desc = `Professional ${service.title.toLowerCase()} services in ${config.address.city}, ${config.address.state}. ${service.scope} Contact ${config.businessName} for a free estimate.`;
      document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", desc);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", desc);
    }
  }, [service, config]);

  useEffect(() => {
    if (!service) return;
    const id = "service-schema";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.scope,
      provider: {
        "@type": "LocalBusiness",
        name: config.businessName,
        telephone: config.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: config.address.street,
          addressLocality: config.address.city,
          addressRegion: config.address.state,
          postalCode: config.address.zip,
        },
      },
      areaServed: config.serviceArea,
    });
    return () => { script?.remove(); };
  }, [service, config]);

  if (!service) return <Navigate to="/services" replace />;

  const serviceIndex = config.services.findIndex(s => slugify(s.title) === slug);
  const fallbackImage = serviceImages[serviceIndex] || projectCommercial;
  const descriptions = getDescriptions(slug!, config.businessName, config.serviceArea);
  const relatedServices = config.services.filter(s => slugify(s.title) !== slug).slice(0, 4);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="section-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={getImage(null, service.imageSlot, fallbackImage)} alt={service.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
        </div>
        <div className="container relative z-10">
          <Reveal>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">{config.industry}</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight mt-2">
              {service.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{service.scope}</p>
            <p className="text-sm text-primary font-medium mt-2">{service.timeline}</p>
          </Reveal>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              <Reveal>
                <div className="space-y-5">
                  {descriptions.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal>
                <div className="overflow-hidden">
                  <img src={getImage(null, service.imageSlot, fallbackImage)} alt={service.title} className="w-full h-[400px] object-cover" />
                </div>
              </Reveal>

              {/* What's Included */}
              <Reveal>
                <h2 className="font-heading text-2xl font-bold uppercase mb-6">What's Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-muted/50 border border-border">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal>
                <div className="bg-secondary text-white p-8 md:p-12">
                  <h2 className="font-heading text-3xl font-bold uppercase">Get a Free Estimate</h2>
                  <p className="text-muted-foreground mt-2">Ready to start your {service.title.toLowerCase()} project? Contact us for a no-obligation bid.</p>
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <Link to="/contact">
                      <Button variant="default" size="lg">Request a Bid</Button>
                    </Link>
                    <a href={`tel:${config.phoneRaw}`} className="flex items-center gap-2 text-primary font-heading text-lg font-bold hover:underline">
                      <Phone className="w-5 h-5" /> {config.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* NAP */}
              <Reveal delay={100}>
                <div className="border border-border p-6 space-y-4">
                  <h3 className="font-heading text-lg font-bold uppercase">{config.businessName}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <a href={`tel:${config.phoneRaw}`} className="hover:text-primary transition-colors">{config.phone}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <a href={`mailto:${config.email}`} className="hover:text-primary transition-colors">{config.email}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{config.address.full}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Service Area</p>
                    <p className="text-sm font-medium mt-1">{config.serviceArea}</p>
                  </div>
                </div>
              </Reveal>

              {/* Related Services */}
              <Reveal delay={200}>
                <div className="border border-border p-6">
                  <h3 className="font-heading text-lg font-bold uppercase mb-4">Other Services</h3>
                  <div className="space-y-2">
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.title}
                        to={`/services/${slugify(rs.title)}`}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-sm font-medium">{rs.title}</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}