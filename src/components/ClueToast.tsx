import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X, ShieldAlert, Award } from "lucide-react";
import { Clue } from "../types";

interface ClueToastProps {
  clue: Clue | null;
  onClose: () => void;
}

export default function ClueToast({ clue, onClose }: ClueToastProps) {
  return (
    <AnimatePresence>
      {clue && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 120 }}
          className="fixed bottom-6 left-1/2 z-[100] w-[90vw] max-w-xl -translate-x-1/2 rounded-2xl border border-emerald-500/40 bg-zinc-950/95 p-5 text-zinc-100 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-lg select-none"
        >
          {/* Neon side accents */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b from-emerald-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldAlert className="animate-pulse" size={22} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <span>[ 단서 유출 감지 ]</span>
              </div>
              <h3 className="mt-1 text-xl font-black text-zinc-50 tracking-tight leading-snug">
                {clue.title}
              </h3>
              <p className="mt-1.5 text-xs font-mono text-zinc-400">
                {clue.room}
              </p>
              <div className="mt-3 rounded-lg bg-emerald-950/25 border border-emerald-500/10 p-3">
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {clue.text}
                </p>
              </div>
              {clue.details && (
                <p className="mt-2 text-xs text-zinc-500 italic font-mono leading-relaxed bg-zinc-900/50 p-2 rounded">
                  💡 비공식 군사 보고: {clue.details}
                </p>
              )}
            </div>

            <button 
              onClick={onClose} 
              className="mt-0.5 rounded-full border border-zinc-800 p-1.5 text-zinc-500 hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 transition-all duration-200"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
