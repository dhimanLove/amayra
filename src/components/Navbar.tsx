import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navDown, fadeUp, stagger } from '../motion/variants';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'SAP', href: '#platform' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navDownVariant = prefersReduced ? {} : navDown;
  const fadeUpVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navDownVariant}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas-white/95 backdrop-blur-lg border-b border-mist/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-page mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/logo1.svg" alt="Amarya Logo" className="h-8 w-auto" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative font-sans text-body-sm text-carbon-ink group overflow-hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <span className="relative z-10 group-hover:text-cobalt-spark transition-colors duration-300">
                {link.label}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cobalt-spark origin-left"
              />
            </motion.a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.a
            href="tel:+91xxxxxxxxxx"
            className="font-mono text-body-sm text-iron hover:text-cobalt-spark transition-colors duration-300"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ x: 2 }}
          >
            +91xxxxxxxxxx
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-primary group flex items-center gap-1.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get Started</span>
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-mist/50 border border-ash/50 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} className="text-carbon-ink" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} className="text-carbon-ink" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-canvas-white z-40 lg:hidden"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #0c76fe 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
              {/* Navigation Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerVariant}
                className="flex flex-col items-center gap-6"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    variants={fadeUpVariant}
                    transition={{ delay: index * 0.08 }}
                    className="font-sans text-2xl font-medium text-carbon-ink hover:text-cobalt-spark transition-colors will-change-transform"
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="w-16 h-px bg-ash mt-4 mb-2"
              />

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerVariant}
                className="flex flex-col items-center gap-4"
              >
                <motion.a
                  href="tel:+91xxxxxxxxxx"
                  variants={fadeUpVariant}
                  transition={{ delay: (navLinks.length + 1) * 0.08 }}
                  className="font-mono text-body text-iron hover:text-cobalt-spark transition-colors"
                  whileHover={{ x: 2 }}
                >
                  +91xxxxxxxxxx
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  variants={fadeUpVariant}
                  transition={{ delay: (navLinks.length + 2) * 0.08 }}
                  className="btn-primary will-change-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
