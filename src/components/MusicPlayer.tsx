"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { track } from "@/content/site";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrent(value);
  }

  function restart() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrent(0);
  }

  return (
    <div className="glass-card-strong rounded-3xl p-6 flex flex-col gap-5 h-full">
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div className="flex items-center gap-4">
        <motion.div
          className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/70 shrink-0"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 8, ease: "linear", repeat: Infinity }
              : { duration: 0.3 }
          }
        >
          <Image src={track.cover} alt="" fill className="object-cover" sizes="64px" />
        </motion.div>
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-primary)] font-mono">
            Now Playing
          </p>
          <p className="font-display font-semibold text-lg truncate">{track.title}</p>
          <p className="text-sm text-[var(--foreground-muted)] truncate">{track.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--foreground-muted)] w-10 text-right">
          {formatTime(current)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={seek}
          className="flex-1 accent-[var(--color-primary)] cursor-pointer"
          aria-label="Seek"
        />
        <span className="font-mono text-xs text-[var(--foreground-muted)] w-10">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={restart}
          className="text-[var(--foreground-muted)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
          aria-label="Restart track"
        >
          <SkipBack size={20} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggle}
          className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="text-[var(--foreground-muted)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
          aria-label="Next track"
          disabled
        >
          <SkipForward size={20} />
        </motion.button>
      </div>
    </div>
  );
}
