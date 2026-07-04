import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cardHover, slideRight } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    badge: 'Enterprise',
    title: 'SAP Development',
    body: 'End-to-end SAP development, ABAP programming, module configuration, and integration for ERP transformation projects. Trusted by MNCs.',
    tags: ['SAP ABAP', 'ERP', 'S/4HANA'],
    accentColor: 'bg-cobalt-spark',
  },
  {
    badge: 'Mobile',
    title: 'Mobile App Development',
    body: 'Native and cross-platform mobile applications for iOS and Android. Engaging experiences built for scale and performance.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    accentColor: 'bg-lime-glow',
  },
  {
    badge: 'Innovation',
    title: 'Emerging Technologies',
    body: 'Future-proofing businesses with Artificial Intelligence, Machine Learning pipelines, IoT, and next-gen tech integration.',
    tags: ['AI', 'ML', 'IoT', 'Data Science'],
    accentColor: 'bg-ice-blue',
  },
  {
    badge: 'Web',
    title: 'Web Development',
    body: 'Production-grade full-stack web applications. Responsive, fast, and scalable architectures designed for the modern web.',
    tags: ['React', 'Node.js', 'Next.js', 'Spring Boot'],
    accentColor: 'bg-pewter',
  },
  {
    badge: 'Enterprise',
    title: 'Infor Solutions',
    body: 'Comprehensive Infor implementation, customization, and support services to streamline your operations and drive efficiency.',
    tags: ['Infor ERP', 'CloudSuite', 'M3'],
    accentColor: 'bg-cobalt-spark',
  },
  {
    badge: 'Enterprise',
    title: 'Oracle Solutions',
    body: 'Expert Oracle consulting, database management, and cloud infrastructure integration. Securing and scaling your data.',
    tags: ['Oracle Cloud', 'Database', 'E-Business Suite'],
    accentColor: 'bg-lime-glow',
  },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Reversible Header Animation
      gsap.from('.gsap-header-el', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          // toggleActions: onEnter, onLeave, onEnterBack, onLeaveBack
          toggleActions: 'play reverse play reverse',
        },
      });

      // 2. Reversible Premium Grid Cards Rise Animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out', // Ultra-smooth deceleration curve
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            // Perfectly reverses the animation when scrolling past or back up
            toggleActions: 'play reverse play reverse',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);
  return (
    <section
      id="services"
      ref={containerRef}
      className="py-28 bg-mist relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cobalt-spark opacity-[0.03] blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-lime-glow opacity-[0.02] blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-page mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-16">
          {/* Eyebrow */}
          <div className="gsap-header-el flex items-center gap-3 mb-6">
            <span className="relative">
              <span className="w-2 h-2 bg-cobalt-spark rounded-full block" />
              <motion.span
                className="absolute inset-0 w-2 h-2 bg-cobalt-spark rounded-full"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </span>
            <span className="font-mono uppercase text-eyebrow text-iron tracking-wider">
              Our Services
            </span>
          </div>

          {/* Two-tone Heading */}
          <div className="gsap-header-el mb-4">
            <h2 className="headline-sans">
              <span className="text-carbon-ink">What We Build</span>{' '}
              <span className="text-slate">For You.</span>
            </h2>
          </div>

          <p className="gsap-header-el font-serif text-body-lg text-iron max-w-2xl">
            End-to-end technology solutions that transform how businesses operate, scale, and compete.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial="rest"
              whileHover={!prefersReduced ? 'hover' : undefined}
              className="group relative"
            >
              <motion.div
                variants={cardHover}
                className="card h-full relative overflow-hidden"
              >
                {/* Accent Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute top-0 left-0 right-0 h-1 ${service.accentColor} origin-left`}
                />

                {/* Badge Row */}
                <div className="flex items-center justify-between mb-5">
                  <motion.span
                    className="pill-badge"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.badge}
                  </motion.span>
                  <div className="font-mono text-caption uppercase text-pewter">
                    0{index + 1}
                  </div>
                </div>

                {/* Title */}
                <motion.h3
                  variants={slideRight}
                  className="font-sans font-semibold text-[22px] text-carbon-ink mb-4 group-hover:text-cobalt-spark transition-colors duration-300"
                >
                  {service.title}
                </motion.h3>

                {/* Body */}
                <p className="font-serif text-body-sm text-iron mb-6 leading-relaxed">
                  {service.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-canvas-white border border-pewter/40 rounded-full text-xs font-mono uppercase text-steel tracking-wider"
                      whileHover={{ borderColor: '#0c76fe' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* CTA Link */}
                <motion.a
                  href="#contact"
                  className="ghost-link inline-flex items-center gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span>Learn more</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  className="absolute inset-0 bg-gradient-to-br from-cobalt-spark to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}