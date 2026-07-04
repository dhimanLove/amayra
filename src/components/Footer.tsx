import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger } from '../motion/variants';

const services = [
  'SAP Development',
  'Full-Stack Engineering',
  'Data Science & AI',
  'IT Consulting',
];

const company = ['About Us', 'Our Team', 'Careers', 'Contact'];

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const fadeUpVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;

  return (
    <footer ref={ref} className="bg-carbon-ink pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-page mx-auto px-6 relative z-10">
        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={fadeUpVariant}>
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="/logo1.svg" alt="Amarya Logo" className="h-8 w-auto" />
            </motion.a>
            <p className="font-serif text-body-sm text-steel leading-relaxed max-w-[200px]">
              Technology consulting and software development.
              Jabalpur, India. Founded 2015.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUpVariant}>
            <h4 className="font-mono text-caption uppercase text-slate mb-5 tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={item}>
                  <motion.a
                    href="#services"
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="font-sans text-body-sm text-steel hover:text-canvas-white transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 bg-graphite rounded-full group-hover:bg-lime-glow transition-colors" />
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUpVariant}>
            <h4 className="font-mono text-caption uppercase text-slate mb-5 tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={item}>
                  <motion.a
                    href={item === 'Contact' ? '#contact' : '#about'}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="font-sans text-body-sm text-steel hover:text-canvas-white transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 bg-graphite rounded-full group-hover:bg-lime-glow transition-colors" />
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUpVariant}>
            <h4 className="font-mono text-caption uppercase text-slate mb-5 tracking-wider">
              Reach Us
            </h4>
            <ul className="space-y-3 font-sans text-body-sm text-steel">
              <motion.li
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="tel:+917869043213"
                  className="hover:text-canvas-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 bg-graphite rounded-full group-hover:bg-lime-glow transition-colors" />
                  +91 78690 43213
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35 }}
              >
                40 Kingsway Cantt, Sadar
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                Jabalpur, MP 482001
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="border-t border-graphite/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p
            variants={fadeUpVariant}
            className="font-mono text-caption text-steel tracking-wide"
          >
            © 2025 AMARYA BUSINESS CONSULTANCY
          </motion.p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-mono text-caption text-steel hover:text-canvas-white transition-colors uppercase tracking-wide"
            >
              Privacy
            </a>
            <span className="w-1 h-1 bg-graphite rounded-full" />
            <a
              href="#"
              className="font-mono text-caption text-steel hover:text-canvas-white transition-colors uppercase tracking-wide"
            >
              Terms
            </a>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-10 right-6 w-10 h-10 rounded-full border border-graphite/30 flex items-center justify-center text-slate hover:text-canvas-white hover:border-slate transition-all duration-300 group"
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
