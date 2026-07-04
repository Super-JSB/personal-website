"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import MusicPlayer from "@/components/MusicPlayer";
import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  return (
    <section id="home" className="relative pt-16 pb-24 px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/background-2.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/40 via-[var(--background)]/70 to-[var(--background)]" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-strong rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row gap-8 items-start"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.96 }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white/70 shrink-0 mx-auto sm:mx-0 shadow-lg"
          >
            <Image src={site.pfp} alt={site.name} fill className="object-cover" sizes="128px" />
          </motion.div>

          <div className="flex-1 text-center sm:text-left">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
              {site.handle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-balance leading-tight">
              {site.name}
            </h1>
            <p className="mt-2 text-[var(--color-primary-deep)] font-medium">{site.tagline}</p>
            <p className="mt-4 text-[var(--foreground-muted)] leading-relaxed max-w-lg">
              {site.bio}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)]">
                <MapPin size={16} />
                {site.location}
              </span>
              <SocialLinks />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <MusicPlayer />
        </motion.div>
      </div>
    </section>
  );
}
