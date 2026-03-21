import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="section-dark">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold tracking-wider mb-4">
              IRONCLAD<span className="text-gold">.</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Licensed general contractor building residential and commercial projects across the greater metro area since 2009.
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
              <span>Custom Homes</span>
              <span>Commercial Buildings</span>
              <span>Renovations</span>
              <span>Concrete & Foundation</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:5551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> (555) 123-4567
              </a>
              <a href="mailto:info@ironcladbuilds.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@ironcladbuilds.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> 1234 Builder Ave, Metro City
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ironclad Construction. All rights reserved.</span>
          <span>Fully Bonded & Licensed | NV Contractor License #12345</span>
        </div>
      </div>
    </footer>
  );
}
