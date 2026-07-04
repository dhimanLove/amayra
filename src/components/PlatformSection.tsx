import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger, scaleIn, slideRight, slideLeft } from '../motion/variants';
import { ArrowUpRight, Hexagon, Layout, Cpu, Zap, Smartphone, Globe, Database } from 'lucide-react';

const tabs = [
  {
    id: 'sap',
    icon: Hexagon,
    label: 'SAP Development',
    title: 'Enterprise SAP Solutions',
    body: 'End-to-end SAP development, ABAP programming, module configuration, and seamless S/4HANA migration with zero business disruption.',
    preview: 'SAP System',
    stats: ['99.9%', 'Uptime'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile App Development',
    title: 'Native & Cross-Platform Apps',
    body: 'Engaging and performant mobile applications built with Flutter and React Native. Engineered for scale and exceptional user experience across iOS and Android.',
    preview: 'Mobile UI',
    stats: ['200+', 'Apps'],
  },
  {
    id: 'emerging',
    icon: Cpu,
    label: 'Emerging Technologies',
    title: 'AI & Machine Learning',
    body: 'From data architecture to deployed ML models, we build intelligence into your systems. Predictive analytics, IoT integration, and next-gen technologies.',
    preview: 'AI Pipeline',
    stats: ['40%', 'Efficiency'],
  },
  {
    id: 'web',
    icon: Globe,
    label: 'Web Development',
    title: 'Full-Stack Web Apps',
    body: 'Production-grade web applications built with modern frameworks. From MVP to enterprise scale, we engineer for performance and maintainability.',
    preview: 'Dashboard UI',
    stats: ['100%', 'Scalable'],
  },
  {
    id: 'infor',
    icon: Zap,
    label: 'Infor Solutions',
    title: 'Infor Implementation',
    body: 'Comprehensive Infor ERP services including cloud deployment, module customization, and ongoing managed support tailored to your business.',
    preview: 'Infor Dashboard',
    stats: ['24/7', 'Support'],
  },
  {
    id: 'oracle',
    icon: Database,
    label: 'Oracle Solutions',
    title: 'Oracle Cloud & DB',
    body: 'Expertise in Oracle Cloud Infrastructure, database administration, and E-Business Suite transformation projects for secure data management.',
    preview: 'Oracle DB',
    stats: ['100%', 'Secure'],
  },
];

export function PlatformSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const fadeUpVariant = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const staggerVariant = prefersReduced ? { visible: {} } : stagger;
  const scaleInVariant = prefersReduced ? { hidden: {}, visible: {} } : scaleIn;

  return (
    <section id="platform" ref={ref} className="py-28 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.02 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0c76fe 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-page mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerVariant}
          className="mb-16"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-3 mb-6">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-2 h-2 bg-cobalt-spark rounded-full block"
            />
            <span className="font-mono uppercase text-eyebrow text-iron tracking-wider">
              The Amarya Advantage
            </span>
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <h2 className="headline-sans">
              <span className="text-carbon-ink block mb-2">Engineered for Scale.</span>
              <span className="text-slate">Optimized for Performance.</span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUpVariant}
            className="font-serif text-body-lg text-iron max-w-[640px]"
          >
            We don't hand off deliverables. We embed as partners — aligning technology
            choices with business outcomes from day one through delivery and beyond.
          </motion.p>
        </motion.div>

        {/* Tabbed Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariant}
            className="lg:w-[35%]"
          >
            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={slideLeft}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all duration-300 group ${
                    activeTab.id === tab.id
                      ? 'bg-ice-blue text-carbon-ink'
                      : 'text-silver hover:text-carbon-ink hover:bg-mist/50'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: activeTab.id === tab.id ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className={`w-5 h-5 ${
                      activeTab.id === tab.id ? 'text-cobalt-spark' : ''
                    }`}
                  >
                    <tab.icon size={20} strokeWidth={1.5} />
                  </motion.div>
                  <span className="font-sans text-sm font-medium uppercase tracking-wide">
                    {tab.label}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab.id === tab.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-auto w-6 h-0.5 bg-cobalt-spark origin-left"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Panel */}
          <div className="lg:w-[60%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="ice-panel relative overflow-hidden"
              >
                {/* Mock Window Frame */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-canvas-white rounded-lg border border-ash p-5 mb-6"
                >
                  {/* Window Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full bg-pewter/60"
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-pewter/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-pewter/30" />
                    </div>
                    <span className="font-mono text-caption text-pewter uppercase">
                      {activeTab.preview}
                    </span>
                  </div>

                  {/* Animated Placeholder */}
                  <div className="h-36 bg-mist/40 rounded flex items-center justify-center overflow-hidden relative">
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cobalt-spark/5 to-transparent"
                    />
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'linear-gradient(#dbdbdb 1px, transparent 1px), linear-gradient(90deg, #dbdbdb 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-sans font-semibold text-[22px] text-carbon-ink mb-3"
                    >
                      {activeTab.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="font-serif text-body-sm text-iron mb-6"
                    >
                      {activeTab.body}
                    </motion.p>
                    <motion.a
                      href="#contact"
                      className="ghost-link inline-flex items-center gap-2 group"
                      whileHover={{ x: 4 }}
                    >
                      <span>Learn more</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.a>
                  </div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-row gap-4"
                  >
                    {activeTab.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + statIndex * 0.1, type: 'spring' }}
                          className="font-sans font-semibold text-lg text-cobalt-spark"
                        >
                          {stat}
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Decorative Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-cobalt-spark rounded-full blur-3xl pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
