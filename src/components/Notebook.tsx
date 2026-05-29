import React from "react";
import { motion } from "motion/react";
import { X, Search, FileText, CheckCircle, Percent, AlertCircle } from "lucide-react";
import { Clue } from "../types";

interface NotebookProps {
  clues: Clue[];
  onClose: () => void;
  totalCluesCount: number;
}

export default function Notebook({ clues, onClose, totalCluesCount }: NotebookProps) {
  const percentSolved = Math.round((clues.length / totalCluesCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/85 p-4 sm:p-6 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
        className="relative max-h-[90vh] w-full max-w-4xl flex flex-col rounded-3xl border border-zinc-700/60 bg-zinc-900 shadow-2xl overflow-hidden text-zinc-100"
      >
        {/* Dossier Header Strip */}
        <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-red-700 via-amber-600 to-red-700" />

        {/* Outer Paper Clip Decal (For flavor) */}
        <div className="absolute right-12 top-4 hidden sm:block w-7 h-16 bg-zinc-400/20 border-2 border-zinc-500/20 rounded-b-xl" />

        <div className="flex items-center justify-between border-b border-zinc-800 p-6 md:p-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-red-600/20 px-2 py-0.5 text-[10px] font-black tracking-widest text-red-500 border border-red-500/40">
                대외비 (CONFIDENTIAL)
              </span>
              <span className="font-mono text-xs text-zinc-500 tracking-wider">GP-DOSSIER:502</span>
            </div>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-black text-zinc-50 tracking-tight flex items-center gap-2">
              <FileText className="text-zinc-400" size={24} />
              사건 감찰 일지
            </h2>
            <p className="mt-1 text-sm text-zinc-400 font-sans">
              전방 소방 초소 총포류 탈취 의혹 사건 진상조사 기록
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:border-zinc-500 hover:text-white hover:bg-zinc-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dashboard Progress Panel */}
        <div className="bg-zinc-950/60 border-b border-zinc-800/80 px-6 py-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2 text-emerald-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">진행률</div>
              <div className="text-sm font-bold text-zinc-300">총 {totalCluesCount}벌의 단서 중 {clues.length}개 획득</div>
            </div>
          </div>

          {/* Progress bar visual container */}
          <div className="flex-1 md:max-w-xs">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>수치화분석</span>
              <span>{percentSolved}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${percentSolved}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Custom classification folder content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {clues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-950 p-4 border border-zinc-800 text-zinc-600 animate-pulse">
                <Search size={32} />
              </div>
              <h4 className="text-lg font-bold text-zinc-400">등록된 수집 단서가 비어 있습니다.</h4>
              <p className="mt-2 text-xs text-zinc-500 max-w-sm leading-relaxed">
                각 수사 현장을 찾아 보관함, 문서첩, 자물쇠 등의 세부 영역을 클릭하여 미궁에 빠진 단서를 탐지하십시오.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {clues.map((clue, idx) => (
                <div
                  key={clue.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 hover:border-zinc-700/80 hover:bg-zinc-950 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute right-4 top-4 font-mono text-[9px] text-zinc-700 font-bold">
                    #{(idx + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-wider text-emerald-500 uppercase font-semibold">
                        {clue.room}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      {clue.title}
                    </h3>
                    <p className="mt-2 text-xs font-sans leading-relaxed text-zinc-300">
                      {clue.text}
                    </p>
                  </div>

                  {clue.details && (
                    <div className="mt-4 border-t border-zinc-900 pt-3 text-[11px] font-mono leading-relaxed text-zinc-500">
                      📝 {clue.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dossier Footer Notes */}
        <div className="border-t border-zinc-800 bg-zinc-950/40 px-6 py-4 md:px-8 flex items-center gap-2 text-zinc-500 text-[10px] font-mono tracking-wider justify-between">
          <span className="flex items-center gap-1.5 uppercase">
            <AlertCircle size={12} className="text-red-500" />
            무단 유출 및 소지 시 형사 처벌 대상자 지정
          </span>
          <span className="hidden sm:inline">COAX-TECH-GP_NET</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
