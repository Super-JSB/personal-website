"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { socials } from "@/content/site";
import { GitHubIcon, InstagramIcon, DiscordIcon } from "@/components/icons/BrandIcons";

const iconMap = { github: GitHubIcon, instagram: InstagramIcon, discord: DiscordIcon };

const buttonClass =
  "w-9 h-9 rounded-full glass-card flex items-center justify-center text-[var(--color-primary)] cursor-pointer";

export default function SocialLinks({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard unavailable — feedback still shows the tag was noted
    }
    setCopied(label);
    window.setTimeout(() => setCopied((current) => (current === label ? null : current)), 1500);
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((s) => {
        const Icon = iconMap[s.icon];

        return (
          <div key={s.label} className="relative">
            {"copyValue" in s ? (
              <motion.button
                type="button"
                onClick={() => void handleCopy(s.label, s.copyValue)}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Copy ${s.label} username`}
                className={buttonClass}
              >
                <Icon size={16} />
              </motion.button>
            ) : (
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={s.label}
                className={buttonClass}
              >
                <Icon size={16} />
              </motion.a>
            )}
            <AnimatePresence>
              {copied === s.label && (
                <motion.span
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap text-xs bg-[var(--foreground)] text-white px-2.5 py-1 rounded-lg"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
