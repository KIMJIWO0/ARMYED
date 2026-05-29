import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, DoorOpen, Lock, Compass, ShieldAlert } from "lucide-react";
import { Clue, Room } from "../types";
import { ROOMS } from "../data/gameData";

interface RoomSelectProps {
  onNavigate: (page: string) => void;
  clues: Clue[];
  key?: string;
}

export default function RoomSelect({ onNavigate, clues }: RoomSelectProps) {
  const isRoomUnlocked = (room: Room) => {
    if (room.required === null) return true;
    return clues.some((c) => c.id === room.required);
  };

  const completedRoomCluesCount = (roomId: string) => {
    if (roomId === "room1") {
      return clues.filter((c) => ["sq1_erasedLog", "sq2_lockedLocker", "sq3_hiddenRifle", "sq4_dvdSecret"].includes(c.id)).length;
    } else {
      return clues.filter((c) => ["sq5_storageTrace"].includes(c.id)).length;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto select-none px-4 md:px-0">
      {/* Back button link */}
      <button
        onClick={() => onNavigate("home")}
        className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition duration-250"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>감찰 본부 홈으로</span>
      </button>

      {/* Accusation Banner when all 5 clues are found */}
      {clues.length === 5 && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-3xl border border-red-500/50 bg-red-950/20 p-6 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none" />
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold mb-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest font-black">ULTIMATE MISSION DISCOVERY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">모든 비공식 감찰 단서(5/5) 확보 성공</h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed font-sans">
            사라진 K2 일반 소총의 수치분포와 전우들의 묵인된 거짓말 고리를 전부 드러냈습니다. <br className="hidden sm:inline" />
            날이 밝아오기 전, 총기를 절취하고 은폐한 진범을 정식으로 지목 및 소집하십시오.
          </p>
          <button
            onClick={() => onNavigate("accusation")}
            className="mt-5 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black tracking-widest uppercase rounded-xl transition duration-200 shadow-xl shadow-red-950/50 animate-pulse"
          >
            최종 용의자 지목 및 사건 종결하기
          </button>
        </motion.div>
      )}

      {/* Main Title Headers */}
      <div className="mb-10">
        <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-[#cf2727]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>감찰 수사 작전 구역</span>
        </div>
        <h2 className="mt-2 text-3xl sm:text-5xl font-black text-zinc-50 tracking-tight leading-tight">
          수색 지역 활성화
        </h2>
        <p className="mt-3 text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
          총기 보관대 파손 흔적을 필두로 단서를 차곡차곡 모아 이종혁 하사가 잠가둔 당직 관리실 등의 상위 감시 구역을 복구하십시오.
        </p>
      </div>

      {/* Areas lists container */}
      <div className="grid gap-6 md:grid-cols-2">
        {ROOMS.map((room) => {
          const unlocked = isRoomUnlocked(room);
          const clueCount = completedRoomCluesCount(room.id);
          const totalCluesForRoom = room.id === "room1" ? 4 : 1;

          return (
            <motion.button
              key={room.id}
              whileHover={unlocked ? { y: -5 } : {}}
              onClick={() => unlocked && onNavigate(room.id)}
              className={`relative min-h-[300px] overflow-hidden rounded-3xl border p-6 text-left shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                unlocked
                  ? "border-zinc-800 bg-zinc-950/75 hover:border-emerald-500/50 hover:bg-zinc-950"
                  : "cursor-not-allowed border-zinc-900 bg-zinc-950/20 opacity-40"
              }`}
            >
              {/* Dynamic decorative radar backdrop only for unlocked room */}
              {unlocked && (
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.06),transparent_40%)]" />
              )}

              <div className="relative z-10 w-full">
                {/* Visual upper layout header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                    {room.time}
                  </span>
                  {unlocked ? (
                    <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] font-bold">
                      <DoorOpen size={14} />
                      <span>수색 허가</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-zinc-650 font-mono text-[10px] font-bold">
                      <Lock size={12} />
                      <span>잠김</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#cf2727]/70 font-semibold mb-1">
                    {room.number}
                  </div>
                  <h3 className="text-2xl font-black text-zinc-100 flex items-center gap-2">
                    {room.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-sans">
                    {room.subtitle}
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-full mt-6">
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mb-4">
                  {room.description}
                </p>

                {/* Completion indicator */}
                <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-3 text-xs">
                  <span className="text-zinc-400">발견한 단서량:</span>
                  <span className="font-mono font-bold text-zinc-200">
                    <span className={clueCount === totalCluesForRoom ? "text-emerald-400" : "text-zinc-200"}>{clueCount}</span> / {totalCluesForRoom}개
                  </span>
                </div>

                {!unlocked && room.required && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-950/20 border border-red-500/20 p-2 text-[10px] text-red-400">
                    <ShieldAlert size={12} />
                    <span>해금 요건: 생활관에서 총기 보관부대 수정 흔적 단서(SQ-01)를 먼저 확보해 올리십시오.</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
