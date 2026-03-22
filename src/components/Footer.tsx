import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { seoConfig } from "@/lib/config";

export default function Footer() {
  const brandParts = seoConfig.businessName.toUpperCase().split(" ");
  const brandMain = brandParts[0];

  return (
    <footer className="section-dark">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold tracking-wider mb-4">
              {brandMain}<span className="text-gold">.</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {seoConfig.about}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["/about", "/projects", "/services", "/contact"].map((href) => (
                <Link key={href} to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {seoConfig.services.slice(0, 4).map((s) => (
                <span key={s.title}>{s.title}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href={`tel:${seoConfig.phoneRaw}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> {seoConfig.phone}
              </a>
              <a href={`mailto:${seoConfig.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> {seoConfig.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> {seoConfig.address.full}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {seoConfig.businessName}. All rights reserved.</span>
          <span>Fully Bonded & Licensed | {seoConfig.address.state} Contractor License #{seoConfig.licenseNumber}</span>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": seoConfig.businessName,
            "telephone": seoConfig.phone,
            "email": seoConfig.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": seoConfig.address.street,
              "addressLocality": seoConfig.address.city,
              "addressRegion": seoConfig.address.state,
              "postalCode": seoConfig.address.zip,
            },
            "areaServed": seoConfig.serviceArea,
            "foundingDate": seoConfig.yearEstablished,
          }),
        }}
      />
    </footer>
  );
}
