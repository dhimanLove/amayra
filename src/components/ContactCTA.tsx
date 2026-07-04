import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  const fade = reduced ? {} : { opacity: 0, y: 24 };
  const fadeIn = inView ? { opacity: 1, y: 0 } : {};

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-carbon-ink py-40"
    >
      {/* Subtle gradient accent - top left only */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-cobalt-spark/5 blur-3xl" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Asymmetric grid - heavy left bias */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left column - spans 7 cols, dominant */}
          <div className="lg:col-span-7">
            <motion.p
              initial={fade}
              animate={fadeIn}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-slate"
            >
              Let's Talk
            </motion.p>

            <motion.h2
              initial={fade}
              animate={fadeIn}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 font-serif text-6xl leading-[1.05] text-canvas-white lg:text-7xl xl:text-8xl"
            >
              Let's Build Your
              <br />
              <span className="italic text-slate">Digital Future.</span>
            </motion.h2>

            <motion.p
              initial={fade}
              animate={fadeIn}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 max-w-md font-sans text-lg leading-relaxed text-iron"
            >
              Whether you are modernizing legacy SAP infrastructure, deploying cloud solutions, or engineering a custom application from the ground up — our experts are ready to accelerate your journey.
            </motion.p>

            <motion.div
              initial={fade}
              animate={fadeIn}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-8"
            >
              <a
                href="tel:+917869043213"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-sans text-sm font-medium text-carbon-ink transition-all hover:bg-white/90"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="tel:+917869043213"
                className="font-mono text-sm text-iron transition-colors hover:text-white"
              >
                +91 78690 43213
              </a>
            </motion.div>
          </div>

          {/* Right column - spans 5 cols, offset down */}
          <motion.div
            initial={fade}
            animate={fadeIn}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:col-start-8 lg:mt-32"
          >
            <div className="space-y-12">
              {/* Phone - prominent */}
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-pewter">
                  Call
                </div>
                <a
                  href="tel:+917869043213"
                  className="block font-sans text-3xl font-light text-canvas-white transition-colors hover:text-white lg:text-4xl"
                >
                  +91 78690 43213
                </a>
              </div>

              {/* Address */}
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-pewter">
                  Visit
                </div>
                <address className="not-italic font-sans text-base leading-relaxed text-steel">
                  40, Kingsway Cantt, Sadar
                  <br />
                  Jabalpur, MP 482001
                </address>
              </div>

              {/* Website */}
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-pewter">
                  Online
                </div>
                <a
                  href="https://amaryaconsultancy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base text-steel transition-colors hover:text-white"
                >
                  amaryaconsultancy.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer - minimal, left aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-32 flex items-center justify-between border-t border-white/10 pt-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pewter">
            Amarya Consultancy
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pewter">
            Jabalpur, Madhya Pradesh
          </p>
        </motion.div>
      </div>
    </section>
  );
}