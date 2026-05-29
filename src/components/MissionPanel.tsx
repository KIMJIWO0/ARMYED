import React from "react";
import { AlertTriangle, Check, Compass, ShieldAlert } from "lucide-react";
import { Clue } from "../types";

interface MissionPanelProps {
  title: string;
  body: string;
  items: {
    label: string;
    clueId?: string;
  }[];
  warning: string;
  clues: Clue[];
}

export default function MissionPanel({
  title,
  body,
  items,
  warning,
  clues,
}: MissionPanelProps) {
  
  const isCollected = (clueId?: string) => {
    if (!clueId) return false;
    return clues.some((c) => c.id === clueId);
  };

  return (
    <aside className="h-full flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/75 p-6 shadow-2xl backdrop-blur-md select-none text-zinc-100">
      <div>
        {/* Mission Title Header */}
        <div className="flex items-center gap-2 text-amber-400 font-mono text-sm tracking-widest font-black uppercase">
          <Compass className="animate-spin [animation-duration:12s]" size={18} />
          <span>{title}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400 font-sans">
          {body}
        </p>

        {/* Dynamic Mission Checklist */}
        <div className="mt-8 space-y-3">
          {items.map((item, index) => {
            const completed = item.clueId ? isCollected(item.clueId) : false;
            return (
              <div
                key={index}
                className={`relative flex items-center justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  completed
                    ? "border-emerald-500/20 bg-emerald-950/10 text-emerald-300"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-300"
                }`}
              >
                {/* Horizontal progress accent */}
                {completed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-300 ${
                      completed
                        ? "border-emerald-400 bg-emerald-500/15 text-emerald-400"
                        : "border-zinc-700 bg-zinc-950 text-zinc-500"
                    }`}
                  >
                    {completed ? <Check size={14} className="stroke-[3]" /> : <span className="font-mono text-[10px]">{index + 1}</span>}
                  </div>
                  <span className={`text-xs font-semibold ${completed ? "line-through opacity-80" : "font-sans"}`}>
                    {item.label}
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  {completed ? "수집 완료" : "탐지 대기"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety warnings / high tension panel */}
      <div className="mt-8 rounded-2xl border border-red-950/60 bg-red-950/10 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-red-500/10">
          <ShieldAlert size={64} className="stroke-[1]" />
        </div>
        <div className="flex gap-2.5 text-red-400 items-start">
          <AlertTriangle className="shrink-0 mt-0.5" size={14} />
          <div className="flex-1">
            <div className="text-[10px] font-black tracking-widest uppercase font-mono mb-1 text-red-400">
              안전지대 불신경고
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              {warning}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
