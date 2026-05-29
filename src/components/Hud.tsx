import React, { useEffect, useState } from "react";
import { Menu, BookOpen } from "lucide-react";

interface HudProps {
  onOpenMenu: () => void;
  onOpenNotebook?: () => void;
  cluesCount: number;
  totalClues: number;
}

export default function Hud({ 
  onOpenMenu, 
  onOpenNotebook,
  cluesCount,
  totalClues 
}: HudProps) {
  const [timeStr, setTimeStr] = useState("00:10:00");

  useEffect(() => {
    let seconds = 600; // 00:10:00 equivalent
    const interval = setInterval(() => {
      seconds += 1;
      const hrs = Math.floor(seconds / 3600) % 24;
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      const format = (val: number) => String(val).padStart(2, "0");
      setTimeStr(`${format(hrs)}:${format(mins)}:${format(secs)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-start justify-between p-5 text-zinc-100 md:p-8 select-none">
      {/* 2004.05.13 Rec Status */}
      <div className="font-mono text-xs leading-relaxed tracking-[0.2em] text-zinc-400">
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
          <span className="h-2.5 w-2.5 rounded-full bg-red-600 absolute" />
          PLAY [REC]
        </div>
        <div className="text-zinc-200 mt-1">2004.05.13</div>
        <div className="text-emerald-500 font-bold">{timeStr} AM</div>
      </div>

      {/* Clues progress and navigation button */}
      <div className="flex items-center gap-2.5 md:gap-3">
        {onOpenNotebook && (
          <button
            onClick={onOpenNotebook}
            className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 backdrop-blur-md transition hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-950/10"
          >
            <BookOpen size={14} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            단서 수첩 <span className="text-emerald-500/80">({cluesCount}/{totalClues})</span>
          </button>
        )}

        <button
          onClick={onOpenMenu}
          className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 backdrop-blur-md transition hover:border-zinc-300 hover:text-white hover:bg-zinc-900/40"
        >
          <Menu size={14} />
          <span>메뉴</span>
        </button>
      </div>
    </header>
  );
}
