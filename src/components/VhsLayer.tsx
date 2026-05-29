import React from "react";
import { motion } from "motion/react";

interface VhsLayerProps {
  vhsStrength?: "weak" | "medium" | "strong" | "off";
}

export default function VhsLayer({ vhsStrength = "strong" }: VhsLayerProps) {
  if (vhsStrength === "off") return null;

  const strengthOpacity = {
    weak: 0.15,
    medium: 0.28,
    strong: 0.42,
  }[vhsStrength];

  const scanlineDensity = {
    weak: "bg-[length:100%_4px]",
    medium: "bg-[length:100%_3px]",
    strong: "bg-[length:100%_2.2px]",
  }[vhsStrength];

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-screen"
      style={{ opacity: strengthOpacity }}
    >
      {/* Horizontal CRT Scanlines */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] ${scanlineDensity}`} />
      
      {/* Ambient Vignette Shadow (CRT Glass curve feeling) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" style={{ mixBlendMode: "multiply" }} />
      
      {/* Static tracking glitch bar */}
      <motion.div
        className="absolute inset-x-0 h-16 bg-white/5 blur-md"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Horizontal jitter line for static noise feel */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-emerald-500/20"
        animate={{ y: ["0%", "100%", "20%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Screen Flickering Grain */}
      <motion.div
        className="absolute inset-0 bg-white/[0.015] blur-[0.5px]"
        animate={{ opacity: [0.8, 1, 0.9, 0.75, 0.95, 0.8] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
