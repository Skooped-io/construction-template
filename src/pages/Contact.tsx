import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { seoConfig } from "@/lib/config";
import PageHead from "@/components/PageHead";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-card border border-border px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch within 24 hours.");
  };

  return (
    <main className="pt-20">
      <PageHead page="contact" />

      <section className="section-dark py-24">
        <div className="container">
          <Reveal>
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">Get In Touch</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight mt-2">
              Request a <span className="text-gold">Bid</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              {submitted ? (
                <div className="bg-card border border-primary p-12 text-center">
                  <h2 className="font-heading text-3xl font-bold uppercase text-gold">Message Received</h2>
                  <p className="text-muted-foreground mt-4">We'll review your project details and get back to you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Name *</label>
                      <input required className={inputClass} placeholder="Full Name" />
                    </div>
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Company / Organization</label>
                      <input className={inputClass} placeholder="Company Name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Phone *</label>
                      <input required type="tel" className={inputClass} placeholder="(555) 000-0000" />
                    </div>
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Email *</label>
                      <input required type="email" className={inputClass} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Project Type</label>
                      <select className={inputClass}>
                        <option value="">Select a project type</option>
                        {seoConfig.contactForm.projectTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Estimated Budget</label>
                      <select className={inputClass}>
                        <option value="">Select budget range</option>
                        {seoConfig.contactForm.budgetRanges.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Project Address</label>
                    <input className={inputClass} placeholder="Street address or general location" />
                  </div>
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Project Description</label>
                    <textarea rows={5} className={inputClass} placeholder="Tell us about your project — scope, timeline, special requirements..." />
                  </div>
                  <Button type="submit" variant="hero" className="w-full md:w-auto">
                    Request a Bid
                  </Button>
                </form>
              )}
            </Reveal>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <Reveal delay={150}>
              <div className="section-dark p-8 space-y-6">
                <h3 className="font-heading text-xl font-semibold uppercase text-gold">Contact Info</h3>
                <div className="space-y-4">
                  <a href={`tel:${seoConfig.phoneRaw}`} className="flex items-start gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{seoConfig.phone}</div>
                      <div className="text-xs text-muted-foreground">Call or text</div>
                    </div>
                  </a>
                  <a href={`mailto:${seoConfig.email}`} className="flex items-start gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{seoConfig.email}</div>
                      <div className="text-xs text-muted-foreground">We respond within 24 hours</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-secondary-foreground/80">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{seoConfig.address.street}</div>
                      <div className="text-xs text-muted-foreground">{seoConfig.address.city}, {seoConfig.address.state} {seoConfig.address.zip}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-secondary-foreground/80">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{seoConfig.hours.weekday}</div>
                      <div className="text-xs text-muted-foreground">{seoConfig.hours.weekend}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted border border-border h-64 flex items-center justify-center">
                <span className="text-muted-foreground font-heading text-sm uppercase tracking-wider">Map Placeholder</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
