import React from "react";
import { ArrowLeft, Volume2, Settings, NotebookTabs, RotateCcw, AlertTriangle, Moon } from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
  vhsStrength: "weak" | "medium" | "strong" | "off";
  setVhsStrength: (s: "weak" | "medium" | "strong" | "off") => void;
  soundOn: boolean;
  setSoundOn: (b: boolean) => void;
  autoLog: boolean;
  setAutoLog: (b: boolean) => void;
  onResetClues: () => void;
  key?: string;
}

export default function SettingsPage({
  onBack,
  vhsStrength,
  setVhsStrength,
  soundOn,
  setSoundOn,
  autoLog,
  setAutoLog,
  onResetClues,
}: SettingsPageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto select-none px-4 md:px-0">
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition duration-250"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>감찰 본부 홈으로</span>
      </button>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2">
          <Settings className="text-emerald-500" size={24} />
          감찰 장부 설정
        </h1>
        <p className="mt-1 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          SYSTEM CONFIGURATION // HARDWARE CALIBRATION
        </p>

        <div className="mt-8 space-y-5">
          {/* Sound configuration */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-2 text-zinc-300">
                <Volume2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-200">감찰 효과음 및 무전음</h4>
                <p className="text-[11px] text-zinc-500">부대 무전 백그라운드 노이즈와 클릭 신호음 활성화</p>
              </div>
            </div>
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-250 ${
                soundOn
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-medium"
                  : "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 font-normal"
              }`}
            >
              {soundOn ? "활성화" : "차단"}
            </button>
          </div>

          {/* VHS Scanner strength options */}
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-2 text-zinc-300">
                <Moon size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-200">수사 CRT/VHS 주파수 강도</h4>
                <p className="text-[11px] text-zinc-500">주변 야간 비전 노이즈 밀도와 CRT 선폭 두께를 조율합니다</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-900">
              {(["off", "weak", "medium", "strong"] as const).map((strength) => (
                <button
                  key={strength}
                  onClick={() => setVhsStrength(strength)}
                  className={`rounded-lg py-2 text-xs font-mono font-black uppercase text-center transition-all ${
                    vhsStrength === strength
                      ? "bg-emerald-600 text-zinc-950 font-bold"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {strength === "off" ? "Off" : strength}
                </button>
              ))}
            </div>
          </div>

          {/* Autolog handbook info */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-2 text-zinc-300">
                <NotebookTabs size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-200">진술 비밀 수첩 자동기록</h4>
                <p className="text-[11px] text-zinc-500">단서 발견 시 수색장부에 즉각 기입 및 백업 생성</p>
              </div>
            </div>
            <button
              onClick={() => setAutoLog(!autoLog)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-250 ${
                autoLog
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50"
              }`}
            >
              {autoLog ? "자동등록" : "수동해제"}
            </button>
          </div>

          {/* Reset progression data */}
          <div className="rounded-2xl border border-red-950/40 bg-zinc-950/30 p-5 mt-6 border-dashed">
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle size={15} /> 단서 초기화 조치 (RESET)
            </h4>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
              현재까지 수사망에 등재된 모든 증거 진술서를 일제 파기하고, 생활관 조사 단계부터 미스터리를 완전 전단 재개합니다. 복구 불가능합니다.
            </p>
            <button
              onClick={() => {
                if (confirm("정말로 모든 단서 일지를 기각하고 수사를 연병장 재배치 초기화하겠습니까?")) {
                  onResetClues();
                  alert("초기화되었습니다.");
                }
              }}
              className="mt-4 flex items-center gap-2 rounded-xl bg-red-950/50 border border-red-500/30 px-4 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-950 hover:text-red-200 transition"
            >
              <RotateCcw size={13} />
              <span>수색 장부 즉시 파기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
