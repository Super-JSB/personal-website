"use client";

import { useEffect, useState } from "react";
import { site, buildStack } from "@/content/site";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString([], { hour12: false }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mt-auto border-t border-[var(--color-glass-border)]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-lg">{site.name}</p>
            <p className="text-sm text-[var(--foreground-muted)]">{site.tagline}</p>
          </div>
          <SocialLinks />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-[var(--color-glass-border)]">
          <span className="font-mono text-xs text-[var(--foreground-muted)]">
            {time} · built with {buildStack.aiTool.name}
          </span>
          <div className="flex flex-wrap gap-2">
            {buildStack.stack.slice(0, 3).map((t) => (
              <span
                key={t.name}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-deep)]"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
