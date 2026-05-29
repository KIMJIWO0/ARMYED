import React, { useState } from "react";
import { motion } from "motion/react";

interface BackgroundEffectProps {
  isPlayingVideo: boolean;
  videoSrc?: string;
}

export default function BackgroundEffect({
  isPlayingVideo,
  videoSrc = "/trailer.mp4",
}: BackgroundEffectProps) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="fixed inset-0 overflow-hidden bg-zinc-950">
      {/* 1. Cinematic Background Video with Smart Fallback */}
      {!videoError && isPlayingVideo ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-20 blur-[1px] grayscale transition-opacity duration-1000"
        />
      ) : null}

      {/* 2. Tactical Night-Vision Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,35,15,0.4),transparent_65%)]" />
      
      {/* Moving coordinate lines */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Rotating Radar Sweep Simulation */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {/* Radar sweep radial tail */}
        <div className="absolute top-0 left-1/2 h-1/2 w-1 bg-gradient-to-t from-transparent to-emerald-500/40 origin-bottom" style={{ transform: "rotate(30deg)" }} />
        <div className="absolute inset-10 rounded-full border border-emerald-500/5" />
        <div className="absolute inset-24 rounded-full border border-emerald-500/5" />
      </motion.div>

      {/* Tactical Data Overlays (Sparsely placed for clean visual rhythm) */}
      <div className="absolute bottom-8 left-8 hidden font-mono text-[9px] tracking-widest text-emerald-500/40 sm:block">
        <div>SYS: GP-TACTICAL_NET v0.42</div>
        <div>COORDINATES: 38°15'04.2\"N 127°02'11.8\"E</div>
        <div>SECURE LINK: STABLE</div>
      </div>

      <div className="absolute right-8 top-24 hidden font-mono text-[9px] tracking-widest text-emerald-500/40 sm:block">
        <div>SIGNAL: VHF-154MHZ</div>
        <div>BANDWIDTH: LOW</div>
        <div>REC STATE: ARMED</div>
      </div>

      {/* Floating Tactical Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping [animation-duration:3s]" />
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-green-300 rounded-full animate-bounce [animation-duration:4s]" />
      </div>

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black pointer-events-none" />
    </div>
  );
}
