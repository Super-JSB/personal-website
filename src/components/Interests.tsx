"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { interests } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export default function Interests() {
  return (
    <section id="interests" className="relative py-24 px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/interests-background.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
            What I&apos;m into
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Interests</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {interests.map((interest, i) => (
            <Reveal key={interest.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card rounded-2xl p-6 h-full cursor-pointer"
              >
                <Sparkles className="text-[var(--color-primary)] mb-3" size={22} />
                <h3 className="font-display font-semibold text-lg mb-1">{interest.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
