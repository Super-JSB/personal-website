"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { csWork } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

export default function CSWork() {
  return (
    <section id="cs-work" className="relative py-24 px-6">
      <SectionBackground src="/images/background-1.jpg" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
            Computer science
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">
            Projects &amp; Coursework
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {csWork.map((item, i) => {
            const isExternal = item.href.startsWith("http");
            return (
            <Reveal key={item.title} delay={i * 0.1}>
              <motion.a
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-2xl p-7 h-full flex flex-col cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <Code2 size={20} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[var(--foreground-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-deep)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
