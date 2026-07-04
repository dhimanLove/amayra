import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { DotGrid } from '../webgl/DotGrid';
import { fadeUp, fadeUpSlow, stagger, staggerSlow, scaleInSpring, lineExpand, counterVariants } from '../motion/variants';
import { ArrowRight, ChevronDown, Code2, Cpu, Database, Globe, Layers, Zap, CheckCircle2 } from 'lucide-react';

/* ── Floating Stat Card ── */
function FloatingCard({
  icon: Icon,
  label,
  value,
  accent,
  delay,
  x,
  y,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
  delay: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 14 }}
      className={`absolute ${x} ${y} bg-canvas-white border border-ash rounded-xl px-4 py-3 will-change-transform`}
      style={{ minWidth: 140 }}
    >
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5"
      >
        <span className={`w-8 h-8 rounded-lg ${accent} flex items-center justify-center flex-shrink-0`}>
          <Icon size={15} className="text-canvas-white" strokeWidth={2} />
        </span>
        <div>
          <p className="font-sans font-semibold text-sm text-carbon-ink leading-none">{value}</p>
          <p className="font-mono text-[10px] uppercase text-slate tracking-wider mt-0.5">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Orbit Ring ── */
function OrbitRing({
  radius,
  duration,
  dotColor,
  delay = 0,
}: {
  radius: number;
  duration: number;
  dotColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      {/* Ring */}
      <div
        className="absolute rounded-full border border-dashed border-ash/50"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {/* Orbiting Dot */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dotColor}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Connection Node ── */
function Node({
  x,
  y,
  size = 6,
  color,
  delay = 0,
  label,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  delay?: number;
  label?: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill={color}
        animate={{ r: [size, size + 2, size] }}
        transition={{ duration: 2 + delay, repeat: Infinity, ease: 'easeInOut' }}
      />
      {label && (
        <text x={x + size + 6} y={y + 4} fontSize={10} fill="#898989" fontFamily="JetBrains Mono, monospace">
          {label}
        </text>
      )}
    </motion.g>
  );
}

/* ── Animated Tech Panel (Right side visual) ── */
function TechVisual() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    { icon: Layers, label: 'SAP/ABAP', color: '#0c76fe' },
    { icon: Globe, label: 'Full-Stack', color: '#dcf58f' },
    { icon: Cpu, label: 'ML/AI', color: '#0c76fe' },
    { icon: Database, label: 'Cloud', color: '#e6f1ff' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveService((s) => (s + 1) % services.length), 2200);
    return () => clearInterval(id);
  }, []);

  const svgSize = 340;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  const nodePositions = [
    { x: cx, y: cy - 110, label: 'SAP' },
    { x: cx + 105, y: cy - 35, label: 'React' },
    { x: cx + 70, y: cy + 90, label: 'AI' },
    { x: cx - 70, y: cy + 90, label: 'Cloud' },
    { x: cx - 105, y: cy - 35, label: 'Data' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central orbiting rings */}
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <OrbitRing radius={50} duration={8} dotColor="bg-cobalt-spark" delay={0.5} />
        <OrbitRing radius={90} duration={14} dotColor="bg-lime-glow" delay={0.8} />
        <OrbitRing radius={130} duration={20} dotColor="bg-cobalt-spark/60" delay={1.2} />

        {/* Central A Mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 12 }}
            className="relative"
          >
            {/* Outer Glow Ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-cobalt-spark/20 blur-md"
            />
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-carbon-ink flex items-center justify-center border border-graphite/50">
              <motion.img
                src="/logo1.svg"
                alt="Amarya Logo"
                className="w-10 h-10 object-contain"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* SVG Connection Network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0c76fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0c76fe" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines */}
          {nodePositions.map((node, i) => (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
              stroke="url(#lineGrad)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
            />
          ))}

          {/* Animated pulse along lines */}
          {nodePositions.map((node, i) => (
            <motion.circle
              key={`pulse-${i}`}
              cx={cx}
              cy={cy}
              r={3}
              fill="#0c76fe"
              filter="url(#glow)"
              animate={{
                cx: [cx, node.x, cx],
                cy: [cy, node.y, cy],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 1 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Network Nodes */}
          {nodePositions.map((node, i) => (
            <Node key={i} x={node.x} y={node.y} color="#0c76fe" delay={0.8 + i * 0.15} size={5} />
          ))}
        </svg>
      </div>

      {/* Floating Cards */}
      <FloatingCard
        icon={Code2}
        label="SAP ABAP"
        value="S/4HANA"
        accent="bg-cobalt-spark"
        delay={0.9}
        x="left-0 lg:-left-6"
        y="top-[10%]"
      />
      <FloatingCard
        icon={Zap}
        label="Deployed"
        value="AI Models"
        accent="bg-carbon-ink"
        delay={1.1}
        x="right-0 lg:-right-6"
        y="top-[15%]"
      />
      <FloatingCard
        icon={CheckCircle2}
        label="IIT Alumni"
        value="Founded"
        accent="bg-cobalt-spark"
        delay={1.3}
        x="right-0 lg:-right-4"
        y="bottom-[18%]"
      />
      <FloatingCard
        icon={Globe}
        label="Engineers"
        value="22+ Experts"
        accent="bg-carbon-ink"
        delay={1.5}
        x="left-0 lg:-left-4"
        y="bottom-[20%]"
      />

      {/* Active Service Badge */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-canvas-white border border-ash rounded-full px-4 py-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {(() => {
              const S = services[activeService];
              return (
                <>
                  <S.icon size={13} className="text-cobalt-spark" />
                  <span className="font-mono text-caption uppercase text-iron tracking-wide">
                    {S.label}
                  </span>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-lime-glow"
        />
      </motion.div>
    </div>
  );
}

/* ── Animated Counter ── */
function AnimatedNumber({ value, suffix = '', delay = 0 }: { value: number | string; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReduced) {
      setDisplay(typeof value === 'string' ? parseInt(value) : value);
      return;
    }
    const target = typeof value === 'string' ? parseInt(value) : value;
    const controls = animate(count, target, { delay, duration: 1.5, ease: [0.22, 1, 0.36, 1] });
    const unsub = count.on('change', (v) => setDisplay(Math.floor(v)));
    return () => { controls.stop(); unsub(); };
  }, [inView, value, prefersReduced, delay, count]);

  return (
    <motion.span ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={counterVariants}>
      {display}{suffix}
    </motion.span>
  );
}

/* ── Hero ── */
export function Hero() {
  const prefersReduced = useReducedMotion();

  const FadeUp = prefersReduced ? { hidden: {}, visible: {} } : fadeUp;
  const FadeUpSlow = prefersReduced ? { hidden: {}, visible: {} } : fadeUpSlow;
  const StaggerSlow = prefersReduced ? { visible: {} } : staggerSlow;
  const ScaleIn = prefersReduced ? { hidden: {}, visible: {} } : scaleInSpring;
  const LineV = prefersReduced ? { hidden: {}, visible: {} } : lineExpand;

  const stats = [
    { number: 2015, label: 'Founded' },
    { number: 22, suffix: '+', label: 'Engineers' },
    { number: 3, label: 'Practice Areas' },
    { number: '100', suffix: '%', label: 'IIT Pedigree' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <DotGrid />

      {/* Ambient gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-28 right-[38%] w-72 h-72 rounded-full bg-cobalt-spark blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-24 left-16 w-80 h-80 rounded-full bg-lime-glow blur-3xl pointer-events-none"
      />

      {/* Content — 2-column */}
      <div className="relative z-10 max-w-page mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:w-[52%] lg:pr-8">
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={StaggerSlow}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span variants={ScaleIn} className="relative flex items-center justify-center">
                <motion.span
                  className="absolute w-5 h-5 bg-cobalt-spark/20 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="w-2 h-2 bg-cobalt-spark rounded-full" />
              </motion.span>
              <motion.span variants={FadeUp} className="font-mono text-eyebrow uppercase text-iron tracking-wider">
                JABALPUR · MADHYA PRADESH — INDIA
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.div initial="hidden" animate="visible" variants={StaggerSlow} className="mb-6">
              <div className="overflow-hidden">
                <motion.h1 variants={FadeUp} className="headline-sans text-carbon-ink">
                  Enterprise Technology
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 variants={FadeUp} className="headline-sans text-slate">
                  That Drives Growth.
                </motion.h1>
              </div>
            </motion.div>

            {/* Line divider */}
            <motion.div
              variants={LineV}
              initial="hidden"
              animate="visible"
              className="h-px bg-gradient-to-r from-cobalt-spark via-cobalt-spark/40 to-transparent w-28 mb-8 origin-left"
            />

            {/* Sub-copy */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={FadeUpSlow}
              className="font-serif text-body-lg text-iron max-w-[500px] mb-10 leading-relaxed"
            >
              Founded by IIT alumni, Amarya delivers world-class SAP consulting, custom full-stack engineering, and advanced AI solutions to scale businesses from innovative startups to multinational enterprises.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={StaggerSlow}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {['SAP ABAP', 'React', 'ML/AI', 'Cloud'].map((tag, i) => (
                <motion.span
                  key={tag}
                  variants={ScaleIn}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-3 py-1 rounded-full border border-ash bg-mist/50 font-mono text-caption uppercase text-iron tracking-wide"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={StaggerSlow}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#contact"
                variants={ScaleIn}
                className="btn-secondary group flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Talk to Us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="#services"
                variants={FadeUp}
                className="ghost-link group"
                whileHover={{ x: 4 }}
              >
                Our Services
                <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </motion.a>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={StaggerSlow}
              className="mt-16 pt-8 border-t border-mist/60 flex flex-wrap gap-10"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={FadeUp}
                  className="group"
                  whileHover={{ x: 2 }}
                >
                  <span className="stat-number block">
                    <AnimatedNumber value={s.number} suffix={s.suffix} delay={i * 0.12} />
                  </span>
                  <span className="stat-label mt-1.5 block group-hover:text-cobalt-spark transition-colors duration-300">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex w-full lg:w-[48%] items-center justify-center relative mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full max-w-[480px] h-[400px] lg:h-[480px] scale-[0.85] sm:scale-100 flex items-center justify-center origin-center"
            >
              <TechVisual />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-pewter flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-pewter rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
