import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeIn, stagger, scaleIn } from '../motion/variants';

const technologies = [
  { name: 'SAP ABAP', category: 'enterprise' },
  { name: 'S/4HANA', category: 'enterprise' },
  { name: 'React', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'Python', category: 'data' },
  { name: 'Machine Learning', category: 'data' },
  { name: 'AI/LLM', category: 'data' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Docker', category: 'devops' },
  { name: 'REST APIs', category: 'integration' },
  { name: 'Microservices', category: 'architecture' },
];

const categories = [
  { id: 'enterprise', label: 'Enterprise', color: 'bg-cobalt-spark' },
  { id: 'frontend', label: 'Frontend', color: 'bg-lime-glow' },
  { id: 'backend', label: 'Backend', color: 'bg-ice-blue' },
  { id: 'data', label: 'Data & AI', color: 'bg-pewter' },
];

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const fadeInVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeIn;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;
  const scaleInVariant = prefersReduced ? { hidden: {}, visible: {} } : scaleIn;

  return (
    <section id="technology" ref={ref} className="py-28 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.015 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0c76fe 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cobalt-spark via-lime-glow to-cobalt-spark blur-3xl rounded-full pointer-events-none"
      />

      <div className="max-w-page mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInVariant} className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <span className="w-2 h-2 bg-cobalt-spark rounded-full block" />
              <motion.span
                className="absolute inset-0 w-2 h-2 bg-cobalt-spark rounded-full"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.span>
            <span className="font-mono uppercase text-eyebrow text-iron tracking-wider">
              Technology
            </span>
          </motion.div>

          <motion.h2 variants={fadeInVariant} className="font-sans font-semibold text-heading-sm text-carbon-ink mb-6">
            <span className="text-carbon-ink">The Stack</span>{' '}
            <span className="text-slate">Behind the Work.</span>
          </motion.h2>

          <motion.p
            variants={fadeInVariant}
            className="font-serif text-body text-iron max-w-xl mx-auto"
          >
            A carefully selected set of technologies chosen for reliability, scalability, and performance.
          </motion.p>
        </motion.div>

        {/* Category Indicators */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={scaleInVariant}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 bg-canvas-white rounded-full border border-ash/50"
            >
              <span className={`w-2 h-2 rounded-full ${category.color}`} />
              <span className="font-mono text-caption uppercase text-steel tracking-wide">
                {category.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech.name}
              variants={scaleInVariant}
              custom={index}
              whileHover={{
                scale: 1.08,
                y: -3,
                borderColor: '#0c76fe',
                backgroundColor: '#e6f1ff',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pill-badge cursor-default will-change-transform relative overflow-hidden group"
            >
              {/* Hover Glow Effect */}
              <motion.span
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cobalt-spark/10 to-transparent"
              />
              <span className="relative z-10">{tech.name}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInVariant}
          className="mt-20 pt-12 border-t border-mist/50"
        >
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
            {[
              { value: '15+', label: 'Technologies' },
              { value: '4', label: 'Practice Areas' },
              { value: '100%', label: 'Open Standards' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <span className="font-sans font-semibold text-2xl text-carbon-ink block">
                  {stat.value}
                </span>
                <span className="font-mono text-caption uppercase text-slate mt-1 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
