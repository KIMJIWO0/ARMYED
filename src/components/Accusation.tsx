import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Award, Clock, ArrowLeft, Terminal, AlertCircle } from "lucide-react";

interface AccusationProps {
  onSelectEnding: (outcome: "correct" | "wrong") => void;
  onBack: () => void;
  key?: string;
}

interface Suspect {
  id: string;
  name: string;
  rank: string;
  role: string;
  description: string;
  alibi: string;
  keyEvidence: string;
  isCulprit: boolean;
}

export default function Accusation({ onSelectEnding, onBack }: AccusationProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);

  const suspects: Suspect[] = [
    {
      id: "jiwoo",
      name: "김지우",
      rank: "병장",
      role: "지종혁의 감시 부탁 대행 소대원 (장난이 많은 성격)",
      description: "어젯밤 22:05경 소대 초소 및 생활관을 완전히 이탈한 행적이 확인되었습니다. 평소 장난기가 많아 총기 은폐 용의자가 아닌지 표적이 되었습니다.",
      alibi: "22:05 타각영수증을 통해 황 소장 PX(매점)를 장기 방문했음이 명확히 성립되어 분실 당시 현장 부재가 확정되었습니다.",
      keyEvidence: "DVD 보관함 내부 자필 메모 ('이준철 오늘 총기 쪽 계속 보던데 봐둬')",
      isCulprit: false
    },
    {
      id: "jonghyuk",
      name: "이종혁",
      rank: "상병",
      role: "당직 근무자 (장부 조작 및 증거 은폐 혐의자)",
      description: "소총 관리일지의 은폐 덧칠을 주도했으며 이준철 일병의 거치함 인접 보고를 일방 말소했습니다. 은밀하게 창고 군화 자국을 남기며 조사를 기안했습니다.",
      alibi: "이준철 일병이 정신적 붕괴로 저지른 위반을 평소 안쓰럽게 생각하여 현장에서 목격하고도 묵인해 주기 위해 장부를 은폐 조작한 동정 행방입니다.",
      keyEvidence: "공구 창고 내 275mm 격자 흙먼지 군화자국 및 조작 장부 원본",
      isCulprit: false
    },
    {
      id: "juncheol",
      name: "이준철",
      rank: "이병",
      role: "생활관 최약체 신병 (실제 미포 총기 은폐 인물)",
      description: "극심한 군 생활 부적응과 부대 내외적 심리 붕괴로 인해 야간 복무 도중 총기를 끄집어내 천정 환풍구 구석에 몰래 걸쳐 숨겨두었습니다. 실탄(소화탄약)은 아예 뽑아둔 무제 상태입니다.",
      alibi: "완벽하게 무너진 심리로 도망치길 열망했으며, 일기장 내부에 정서적 일탈과 탈영 자비 서신을 다수 방치했습니다.",
      keyEvidence: "침상 위 환풍구 속 분실 K2 소총 및 비밀 일기장 (D-0513)",
      isCulprit: true
    }
  ];

  const handleAccuse = () => {
    if (!selectedSuspect) return;
    if (selectedSuspect.isCulprit) {
      onSelectEnding("correct");
    } else {
      onSelectEnding("wrong");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto select-none px-4 md:px-0">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition duration-250"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>수색 구역 선택으로</span>
      </button>

      {/* Main Title Headers */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-red-500 border border-red-500/20 px-3 py-1 rounded bg-red-950/10">
          <Clock className="animate-pulse" size={12} />
          <span>최종 판단 단계 (05:20 AM - 일출 직전)</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight leading-none">
          사건의 전말, <span className="text-red-500">지목의 순간</span>
        </h2>
        <p className="mt-4 text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
          WHO IS THE TRUE CULPRIT HIDDEN IN MILITARY SILENCE?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        
        {/* Suspect grid cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono mb-2">
            소집된 용의요원 명판
          </h3>
          {suspects.map((sus) => {
            const isSel = selectedSuspect?.id === sus.id;
            return (
              <motion.button
                key={sus.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedSuspect(sus)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSel 
                    ? "border-red-500 bg-red-950/20 shadow-lg shadow-red-950/20" 
                    : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                }`}
              >
                {isSel && (
                  <div className="absolute right-4 top-4 text-red-500">
                    <ShieldAlert size={18} className="animate-pulse" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">
                    {sus.rank}
                  </span>
                  <h4 className="text-xl font-black text-white mt-1">
                    {sus.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                    {sus.role}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected suspect profiles */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.04),transparent_40%)]" />
          
          <div className="relative z-10">
            {selectedSuspect ? (
              <motion.div
                key={selectedSuspect.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#cf2727] uppercase">
                    MIL_SURVEILLANCE_PROFILE
                  </span>
                  <h3 className="text-3xl font-black text-zinc-100 mt-1 flex items-baseline gap-2">
                    {selectedSuspect.name} <span className="text-xs text-zinc-500 font-normal">{selectedSuspect.rank}</span>
                  </h3>
                </div>

                <div className="text-xs leading-relaxed text-zinc-400 space-y-3 font-sans border-y border-zinc-900 py-4">
                  <div>
                    <span className="font-bold text-zinc-300 block mb-1">■ 혐의 개요:</span>
                    <p>{selectedSuspect.description}</p>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-300 block mb-1">■ 알리바이 및 행방:</span>
                    <p>{selectedSuspect.alibi}</p>
                  </div>
                  <div>
                    <span className="font-bold text-red-400 block mb-1">■ 확보된 중요 대외지/증거:</span>
                    <p className="italic">{selectedSuspect.keyEvidence}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-900/60 p-3.5 border border-zinc-800 text-[11px] text-zinc-500 flex gap-2">
                  <Terminal size={14} className="text-zinc-650 shrink-0 mt-0.5" />
                  <p>선택 수식망이 가동되었습니다. 지목 단세를 가차없이 발령하려면 하단 명령을 개입하십시오.</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-24">
                <AlertCircle size={32} className="text-zinc-700 animate-pulse mb-3" />
                <h4 className="text-sm font-bold text-zinc-400 font-mono text-center">반대 명판 선택 대기</h4>
                <p className="text-xs text-zinc-500 max-w-xs mt-2 leading-relaxed">
                  좌측 소집 명판에서 소총 탈의 은폐 혐의를 기안할 최종 용의자를 선정해 전모를 분석하십시오.
                </p>
              </div>
            )}
          </div>

          <div className="relative z-10 mt-8">
            <button
              onClick={handleAccuse}
              disabled={!selectedSuspect}
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white disabled:bg-zinc-900 disabled:text-zinc-600 text-xs font-black tracking-widest uppercase transition duration-200 shadow-xl shadow-red-950/40"
            >
              {selectedSuspect ? `최종 용의자 [ ${selectedSuspect.name} ] 지목 서명하기` : "용의요원을 먼저 고르십시오"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
