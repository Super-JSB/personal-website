"use client";

import { motion } from "framer-motion";
import { plans } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export default function Plans() {
  return (
    <section id="plans" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
            Where I&apos;m headed
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Plans</h2>
        </Reveal>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent" />

          <div className="flex flex-col gap-10">
            {plans.map((plan, i) => (
              <Reveal key={plan.title} delay={i * 0.1}>
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="absolute -left-8 sm:-left-10 top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-white/70"
                  />
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="glass-card rounded-2xl p-6 cursor-pointer"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
                      {plan.period}
                    </span>
                    <h3 className="font-display font-semibold text-xl mt-1 mb-1.5">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {plan.description}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
