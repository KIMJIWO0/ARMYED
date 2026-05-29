import React from "react";
import { motion } from "motion/react";
import { RefreshCw, Award, LogOut, ShieldAlert, BookOpen, User } from "lucide-react";

interface EndingProps {
  outcome: "correct" | "wrong";
  onReset: () => void;
  key?: string;
}

export default function Ending({ outcome, onReset }: EndingProps) {
  const isCorrect = outcome === "correct";

  return (
    <div className="w-full max-w-3xl mx-auto select-none px-4 md:px-0">
      
      {/* Dynamic cinematic outer box */}
      <div className={`overflow-hidden rounded-3xl border shadow-2xl p-8 backdrop-blur-md relative ${
        isCorrect 
          ? "border-emerald-500/30 bg-zinc-950/90 shadow-emerald-950/20" 
          : "border-red-500/20 bg-zinc-950/90 shadow-red-950/20"
      }`}>
        
        {/* VHS noise inside card */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.95)_100%)] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />

        <div className="relative z-10 text-center">
          
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full border ${
              isCorrect ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" : "bg-red-950/20 border-red-500/30 text-red-500"
            }`}>
              {isCorrect ? <Award size={40} /> : <ShieldAlert size={40} />}
            </div>
          </div>

          <div className="mb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black">
              {isCorrect ? "SYSTEM_DISCHARGE_OUTCOME: ENDING_SUCCESS" : "SYSTEM_DISCHARGE_OUTCOME: ENDING_FAILED"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {isCorrect ? "사라진 총기, 회수된 영혼" : "밝아오는 태양, 무산된 진실"}
          </h2>
          
          <p className="mt-4 text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase">
            {isCorrect ? "GP DISCOVERY REVELATION - EPILOGUE" : "GP TRAGEDY REVELATION - IMPRISONMENT"}
          </p>

          {/* Cinematic Typewriter story block */}
          <div className="my-8 rounded-2xl bg-zinc-900/40 border border-zinc-850 p-6 text-left space-y-4 text-zinc-300 text-xs leading-relaxed font-sans relative overflow-hidden">
            <div className="absolute right-3 top-3 font-mono text-[9px] text-zinc-650 tracking-wider">SEC_DOC_v32</div>

            {isCorrect ? (
              // Correct Ending
              <div className="space-y-4">
                <p>
                  05:30 AM. 희미한 여명이 생활관 창틀을 타고 차갑게 들이칩니다. <br />
                  나는 침상 위 젖혀진 환풍구 깊은 먼지 속에서 안전핀이 이탈되지 않은 빈 K2 소출 한 정을 마침내 성공적으로 회수했습니다.
                </p>
                <div className="border-l-2 border-emerald-500 pl-3 py-1.5 bg-emerald-950/10 rounded">
                  <span className="font-bold text-emerald-400 block mb-1">■ 이준철 이병과의 고요한 대화:</span>
                  보초 근무 복귀 시간, 기둥 구석으로 다가가 이준철에게 조용히 손을 내밀었습니다. 떨리는 눈빛으로 내 무릎을 보던 그는 끝내 참았던 눈물을 흘리며 작게 읊조렸습니다. 
                  <span className="italic block mt-1">"살고 싶었습니다... 그냥 어딘가 먼 곳으로, 이 답답한 침묵에서 도망쳐 사라지고만 싶었습니다..."</span>
                </div>
                <p>
                  나는 이 일을 당직 보고서에 고집스럽게 기재하지 않고 소총 수량을 기어코 맞추어 제자리에 꽂아두었습니다. <br />
                  그리고 아침 7시 30분, 소대 기러기 선기장에 포상휴가 보트를 타기 위해 부대를 떠나며 긴 한숨을 얇게 내뱉었습니다. 
                  비극은 당장 덮였고 나는 휴가를 나섰지만, 마음 한구석의 서글픈 응어리는 영원히 가시지 않았습니다.
                </p>
              </div>
            ) : (
              // Wrong Ending
              <div className="space-y-4">
                <p>
                  06:00 AM. 삐익- 하는 기상 소대 호각 무전음이 생활관 복도를 매섭게 찔러 들어옵니다. <br />
                  시간은 끝끝내 속절없이 지나갔고, 기상 소음과 함께 사건 지목을 완성하지 못한 채 실종 소총의 종적이 수면 위로 급작스럽게 발각되었습니다.
                </p>
                <div className="border-l-2 border-red-500 pl-3 py-1.5 bg-red-950/10 rounded text-red-300">
                  <span className="font-bold text-red-400 block mb-1">■ 군 전산 위반 징계:</span>
                  부대는 발칵 뒤집어졌고 사단 헌병 수사 장교들이 긴급 사이렌과 함께 우리 소초를 압수 수색하기 시작했습니다. 
                  사건 은폐 및 미진한 감찰을 도모한 나의 기획은 완전 전조 발각되어 vacation(휴가)을 철저히 취소 및 구금 징계를 당하게 됩니다. 
                  영원한 진실의 왜곡 아래, 누가 공범인지조차 모르는 침묵만이 GP 장벽 전체에 굳건히 내려앉습니다.
                </div>
              </div>
            )}

            {/* Deep Emotional Epilogue Message */}
            {isCorrect && (
              <div className="border-t border-zinc-900 pt-5 text-center space-y-2 mt-6">
                <p className="text-zinc-500 text-[11px] uppercase font-mono tracking-widest font-bold">THE FINAL MESSAGE</p>
                <blockquote className="text-sm font-semibold text-zinc-100 italic leading-relaxed">
                  “ 총포를 숨긴 범인은 단 한 명이었다. <br />
                  하지만 비행을 이룩한 그 무시무시한 비극 자체는, <br />
                  우리 모두의 침묵과 방조 아래 완성된 것이 아니었을까. ”
                </blockquote>
                <p className="text-[10px] text-zinc-400 font-bold mt-2">
                  — 나 또한 그저 비겁했던 한 명의 반수 방조자였던 것은 아니었을까?
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-white text-zinc-950 text-xs font-black tracking-widest uppercase rounded-xl transition hover:bg-zinc-200 flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={14} />
              시작 화면으로 돌아가기 (다시 시도)
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
