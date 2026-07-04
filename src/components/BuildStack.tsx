"use client";

import { motion } from "framer-motion";
import { Bot, Terminal } from "lucide-react";
import { buildStack } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export default function BuildStack() {
  return (
    <section id="stack" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
            How this site was made
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">
            Build &amp; Stack
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Reveal>
            <div className="glass-card-strong rounded-2xl p-7 h-full flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                <Bot size={22} />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-primary)] mb-1">
                  AI pair-programmer
                </p>
                <h3 className="font-display font-semibold text-xl mb-1">
                  {buildStack.aiTool.name}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {buildStack.aiTool.role}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card-strong rounded-2xl p-7 h-full flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                <Terminal size={22} />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-primary)] mb-1">
                  Editor
                </p>
                <h3 className="font-display font-semibold text-xl mb-1">
                  {buildStack.editor.name}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {buildStack.editor.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass-card rounded-2xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-primary)] mb-4">
              Tech stack
            </p>
            <div className="flex flex-wrap gap-3">
              {buildStack.stack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <span className="font-mono text-sm px-4 py-2 rounded-full bg-white/60 border border-[var(--color-glass-border)] inline-block cursor-default">
                    {tech.name}
                  </span>
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap text-xs bg-[var(--foreground)] text-white px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {tech.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
