import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const services = ['SAP Development', 'Full-Stack Engineering', 'Data Science & AI', 'IT Consulting'];
const company = ['About Us', 'Our Team', 'Careers', 'Contact'];

export function Footer() {
  const reduced = useReducedMotion();
  const fadeUpVariant = reduced ? { hidden: {}, visible: {} } : fadeUp;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    // Using gsap.context ensures clean memory management and maximum speed
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-carbon-ink border-t border-white/10 pt-24 pb-16 text-canvas-white">
      {/* Smooth Transition Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-gradient-to-b from-white/[0.03] to-transparent blur-xl pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        
        {/* Minimal CTA Section */}
        <div ref={ctaRef} className="border-b border-white/10 pb-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-2">
              Ready to build something exceptional?
            </h3>
            <p className="font-sans text-sm text-steel">
              Let’s discuss your technology goals.
            </p>
          </div>
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center bg-canvas-white text-carbon-ink font-sans text-sm font-medium px-6 py-3 rounded-full overflow-hidden transition-all duration-300 active:scale-95 hover:bg-white hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in touch
              <svg 
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div variants={fadeUpVariant} initial="hidden" animate="visible">
            <a href="#" className="flex items-center gap-2 mb-5 group">
              <img src="/logo1.svg" alt="Amarya Logo" className="h-8 w-auto" />
            </a>
            <p className="font-serif text-sm text-steel leading-relaxed max-w-[200px]">
              Technology consulting and software development.
              <br />
              Jabalpur, India. Founded 2015.
            </p>
          </motion.div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate mb-5 tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="group font-sans text-sm text-steel hover:text-canvas-white transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    {/* Dot highlited with scale and color change on link hover */}
                    <span className="w-1 h-1 bg-graphite rounded-full transition-all duration-300 group-hover:bg-canvas-white group-hover:scale-150" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate mb-5 tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Contact' ? '#contact' : '#about'}
                    className="group font-sans text-sm text-steel hover:text-canvas-white transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    {/* Dot highlited with scale and color change on link hover */}
                    <span className="w-1 h-1 bg-graphite rounded-full transition-all duration-300 group-hover:bg-canvas-white group-hover:scale-150" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate mb-5 tracking-wider">
              Reach Us
            </h4>
            <ul className="space-y-3 font-sans text-sm text-steel">
              <li>
                <a
                  href="tel:+917869043213"
                  className="group hover:text-canvas-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 bg-graphite rounded-full transition-all duration-300 group-hover:bg-canvas-white group-hover:scale-150" />
                  +91 78690 43213
                </a>
              </li>
              <li>40 Kingsway Cantt, Sadar</li>
              <li>Jabalpur, MP 482001</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-steel tracking-wide">
            © {new Date().getFullYear()} AMARYA BUSINESS CONSULTANCY
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-steel hover:text-canvas-white transition-colors uppercase tracking-wide">
              Privacy
            </a>
            <span className="w-1 h-1 bg-graphite rounded-full" />
            <a href="#" className="font-mono text-xs text-steel hover:text-canvas-white transition-colors uppercase tracking-wide">
              Terms
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-10 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate hover:text-canvas-white hover:border-white/20 transition-all duration-300"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}