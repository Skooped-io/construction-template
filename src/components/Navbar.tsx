import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seoConfig } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Derive brand display from config
  const brandParts = seoConfig.businessName.toUpperCase().split(" ");
  const brandMain = brandParts[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-wider text-primary-foreground">
          {brandMain}<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`font-heading text-sm uppercase tracking-widest transition-colors duration-200 ${
                pathname === l.href ? "text-primary" : "text-primary-foreground/70 hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button variant="default" size="sm">
              <Phone className="w-3.5 h-3.5" />
              Request a Bid
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-secondary border-t border-primary/20 pb-6">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 font-heading text-sm uppercase tracking-widest ${
                pathname === l.href ? "text-primary" : "text-primary-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button variant="default" size="sm" className="w-full">
                Request a Bid
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
