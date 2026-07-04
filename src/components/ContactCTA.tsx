import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger, scaleIn, floatingAnimation } from '../motion/variants';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

const contactInfo = [
  { icon: Phone, value: '+91 78690 43213', href: 'tel:+917869043213' },
  { icon: MapPin, value: '40, Kingsway Cantt, Sadar', href: null },
  { icon: Mail, value: 'Jabalpur, MP 482001', href: null },
];

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const fadeUpVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;
  const scaleInVariant = prefersReduced ? { hidden: {}, visible: {} } : scaleIn;

  return (
    <section id="contact" ref={ref} className="py-32 bg-carbon-ink relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={floatingAnimation.animate}
          className="absolute top-20 right-20 w-64 h-64 bg-cobalt-spark rounded-full blur-3xl"
        />
        <motion.div
          animate={floatingAnimation.animate}
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-lime-glow rounded-full blur-3xl"
          custom={1}
        />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-content mx-auto px-6 text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="mb-8"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="relative flex items-center justify-center"
            >
              <motion.span
                className="absolute w-4 h-4 bg-lime-glow/30 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="w-2 h-2 bg-lime-glow rounded-full block" />
            </motion.span>
            <span className="font-mono uppercase text-eyebrow text-slate tracking-wider">
              Let's Talk
            </span>
          </motion.div>
        </motion.div>

        {/* Two-tone Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="mb-8"
        >
          <motion.div variants={fadeUpVariant}>
            <h2 className="headline-sans text-center">
              <span className="text-canvas-white">Let's Build Your</span>{' '}
              <span className="text-slate">Digital Future.</span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUpVariant}
          className="font-serif text-body-lg text-slate/80 max-w-[640px] mx-auto mb-14 leading-relaxed"
        >
          Whether you are modernizing legacy SAP infrastructure, deploying cloud solutions, or engineering a custom application from the ground up — our experts are ready to accelerate your journey.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="flex flex-wrap items-center justify-center gap-5 mb-16"
        >
          <motion.a
            href="tel:+917869043213"
            variants={scaleInVariant}
            className="btn-primary group flex items-center gap-2 will-change-transform relative overflow-hidden"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative z-10">Start a Project</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 relative z-10" />
          </motion.a>
          <motion.a
            href="tel:+917869043213"
            variants={scaleInVariant}
            className="group flex items-center gap-2 px-5 py-3 rounded-full border border-slate/30 text-slate font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:border-cobalt-spark hover:text-cobalt-spark will-change-transform"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone size={14} />
            +91 78690 43213
          </motion.a>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="pt-10 border-t border-graphite/50"
        >
          {/* Address */}
          <motion.p
            variants={fadeUpVariant}
            className="font-mono text-eyebrow uppercase text-steel tracking-wider mb-3"
          >
            40, KINGSWAY CANTT, SADAR, JABALPUR, MADHYA PRADESH 482001
          </motion.p>
          <motion.p
            variants={fadeUpVariant}
            className="font-mono text-eyebrow uppercase text-steel tracking-wider"
          >
            AMARYACONSULTANCY.COM · 078690 43213
          </motion.p>

          {/* Contact Info Pills */}
          <motion.div
            variants={staggerVariant}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-graphite/50 border border-graphite/30"
              >
                <info.icon size={14} className="text-slate" />
                {info.href ? (
                  <a
                    href={info.href}
                    className="font-mono text-caption uppercase text-steel tracking-wide hover:text-canvas-white transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="font-mono text-caption uppercase text-steel tracking-wide">
                    {info.value}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={floatingAnimation.animate}
          className="absolute top-[15%] left-[10%] w-20 h-20 border border-lime-glow/10 rounded-full pointer-events-none"
        />
        <motion.div
          animate={floatingAnimation.animate}
          style={{ animationDelay: '1s' }}
          className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-cobalt-spark/10 rounded-full pointer-events-none"
        />
        <motion.div
          animate={floatingAnimation.animate}
          style={{ animationDelay: '2s' }}
          className="absolute top-[40%] right-[8%] w-12 h-12 border border-slate/10 rounded-full pointer-events-none"
        />
      </div>
    </section>
  );
}
