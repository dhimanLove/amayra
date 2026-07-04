import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger, scaleIn } from '../motion/variants';
import { Check } from 'lucide-react';

const highlights = [
  'Headquartered in Jabalpur, Madhya Pradesh',
  'Operations across India',
  '22 engineers and consultants',
  'Industry focus: IT Services & Consulting',
];

const marqueeItems = [
  'Enterprise SAP',
  'React Development',
  'AI Integration',
  'Data Science',
  'IT Strategy',
  'Full-Stack',
  'Cloud Architecture',
  'Digital Transformation',
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const fadeUpVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;
  const scaleInVariant = prefersReduced ? { hidden: {}, visible: {} } : scaleIn;

  return (
    <section id="about" ref={ref} className="py-28 bg-mist relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.03, scale: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-lime-glow blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.02, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-cobalt-spark blur-3xl pointer-events-none"
      />

      <div className="max-w-page mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="mb-20"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariant} className="flex items-center gap-3 mb-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <span className="w-2 h-2 bg-cobalt-spark rounded-full block" />
              <motion.span
                className="absolute inset-0 w-2 h-2 bg-cobalt-spark rounded-full"
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
            <span className="font-mono uppercase text-eyebrow text-iron tracking-wider">
              About Amarya
            </span>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariant}
            className="lg:w-[45%]"
          >
            <motion.h2 variants={fadeUpVariant} className="headline-sans">
              <span className="text-carbon-ink block mb-2">Rooted in Excellence.</span>
              <span className="text-slate">Proven in Enterprise IT.</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              className="font-serif text-body-lg text-iron leading-relaxed"
            >
              Established in 2015, Amarya operates at the intersection of complex SAP enterprise architecture and modern software engineering. Founded by IIT alumni, we bring top-tier technical rigor to digital transformation.
            </motion.p>

            {/* Founders Visual */}
            <motion.div
              variants={scaleInVariant}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cobalt-spark to-ice-blue border-2 border-canvas-white flex items-center justify-center"
                  >
                    <span className="font-sans font-semibold text-carbon-ink text-sm">
                      {i === 0 ? 'IIT' : 'IIT'}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <p className="font-sans font-medium text-carbon-ink">IIT Alumni Founded</p>
                <p className="font-mono text-caption text-slate uppercase">2015</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariant}
            className="lg:w-[50%]"
          >
            <motion.p variants={fadeUpVariant} className="font-serif text-body text-iron leading-relaxed mb-10">
              With deep experience architecting solutions for multinational corporations, our founders built Amarya to make enterprise-grade technology accessible to all. Operating from Jabalpur with a pan-India presence, we engineer scalable solutions that drive measurable business outcomes.
            </motion.p>

            {/* Highlights with Check Animations */}
            <motion.div variants={staggerVariant} className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 4 }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    className="w-6 h-6 rounded-full bg-lime-glow flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <Check size={14} className="text-carbon-ink" />
                  </motion.span>
                  <span className="font-sans text-body-sm text-iron group-hover:text-carbon-ink transition-colors">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Marquee */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUpVariant}
          className="border-t border-ash pt-12"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="font-mono text-caption uppercase text-slate text-center mb-8 tracking-wider"
          >
            Trusted by teams across industries
          </motion.p>

          {/* Infinite Marquee */}
          <div className="overflow-hidden relative">
            <motion.div
              animate={prefersReduced ? {} : { x: ['0%', '-50%'] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-16 whitespace-nowrap"
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-16">
                  {marqueeItems.map((text, index) => (
                    <motion.span
                      key={`${setIndex}-${index}`}
                      className="font-sans text-body-sm uppercase text-pewter tracking-wide flex items-center gap-4"
                      whileHover={{ scale: 1.05, color: '#0f0f0f' }}
                    >
                      <span className="w-1 h-1 bg-pewter rounded-full" />
                      {text}
                    </motion.span>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Gradient Fades */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-mist to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-mist to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
