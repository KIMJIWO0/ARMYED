import React from "react";
import { ArrowLeft, BookOpen, AlertCircle, Quote } from "lucide-react";

interface DevNoteProps {
  onBack: () => void;
  key?: string;
}

export default function DevNote({ onBack }: DevNoteProps) {
  return (
    <div className="w-full max-w-3xl mx-auto select-none px-4 md:px-0">
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition duration-250"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>감찰 본부 홈으로</span>
      </button>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <BookOpen className="text-emerald-500" size={24} />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            개발 감찰 소견서
          </h1>
        </div>
        <p className="mt-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          DEVELOPER RECONSTRUCTION REPORT // PHILOSOPHY OF DESIGN
        </p>

        <div className="mt-8 space-y-6 leading-relaxed text-zinc-300 font-sans text-sm">
          {/* Main motivational statement block */}
          <div className="relative border-l-2 border-emerald-500 pl-4 py-1 bg-emerald-950/5">
            <Quote className="absolute -top-3 -left-3 text-emerald-500/10" size={48} />
            <p className="font-semibold text-zinc-200 text-base">
              “ 범인은 단 한 명뿐이었지만, 비극은 침묵과 방조로 얼룩진 우리들 모두가 만든 것이었다. ”
            </p>
          </div>

          <p>
            이 게임은 단순한 범인을 지목해 형사 처벌을 달성하는 기계적 추리 시뮬레이터가 아닙니다.
            통제되고 굳게 닫혀 단단한 규칙만이 존재하는 계급 사회, 전방 고선(GP)이라는 폐방된 고정관념 속에서
            한 명의 희생 병사가 구석에서 어떻게 고립되었고 무너져갔는지를 뒤늦게 추적 수사하는 <strong>심리추리 잔흑 서사극</strong>입니다.
          </p>

          <p>
            플레이어는 자물쇠, 군대 관리 일지, 위병소의 카메라 제어판을 관장하며 부조리한 휴가 결재 승인 번복이나 권력을 이용한 은폐 흔적을 차례로 소지하고 발각하게 됩니다.
            우리가 마주할 진실은 화려한 음모가 아닌, 동조하고 방관했던 가해 선임들과 이를 구조적으로 덮기에 급급했던 당직계 사령의 슬픈 침묵들의 연속입니다.
          </p>

          <p>
            프로토타입을 진행하며, 우리 내부에 가려진 비극의 피해자들을 향한 차가운 눈빛들을 한 번씩 돌아볼 수 있는 계기가 되기를 바랍니다.
          </p>
        </div>

        {/* Warning label warning folder */}
        <div className="mt-10 border-t border-zinc-900 pt-6 flex items-center gap-3 text-xs text-zinc-500">
          <AlertCircle size={16} className="text-emerald-500 shrink-0" />
          <span>본 감찰 자료는 가상 시나리오의 설정이며 가상 극에 맞추어 연출되었습니다.</span>
        </div>
      </div>
    </div>
  );
}
