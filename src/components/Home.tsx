import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, FileText, Settings, Menu, ShieldCheck, ShieldAlert, Award } from "lucide-react";
import { Clue } from "../types";

interface HomeProps {
  onNavigate: (page: string) => void;
  clues: Clue[];
  key?: string;
}

// @ts-ignore
import barracksRoomImg from "../assets/images/barracks_room_main_1780032563826.png";
// @ts-ignore
import dutyOfficeImg from "../assets/images/duty_office_main_1780032582200.png";

export default function Home({ onNavigate, clues }: HomeProps) {
  const room2Unlocked = clues.some((c) => c.id === "sq1_erasedLog");
  const completedAll = clues.length >= 5;
  
  const [activeChannel, setActiveChannel] = useState<"cam1" | "cam2" | "split">("cam1");
  const [cctvMode, setCctvMode] = useState<"grayscale" | "night" | "color">("grayscale");
  const [currentTime, setCurrentTime] = useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("ko-KR", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter styles based on mode selected
  const getFilterStyle = () => {
    switch (cctvMode) {
      case "grayscale":
        return "grayscale(1) contrast(1.3) brightness(0.8) sepia(0.08)";
      case "night":
        return "sepia(0.65) saturate(1.4) hue-rotate(88deg) contrast(1.3) brightness(0.9)";
      case "color":
        return "contrast(1.08) brightness(0.95) saturate(0.85)";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto select-none sm:px-4">
      {/* Embedded Custom Keyframes for Immersive Slow Pan Camera and CRT Glitch */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cctvSlowPan1 {
          0% { transform: perspective(800px) rotateX(24deg) translateY(-8%) scale(1.4) rotate(-0.5deg) translateX(-1%); }
          50% { transform: perspective(800px) rotateX(24deg) translateY(-8%) scale(1.4) rotate(0.5deg) translateX(1%); }
          100% { transform: perspective(800px) rotateX(24deg) translateY(-8%) scale(1.4) rotate(-0.5deg) translateX(-1%); }
        }
        @keyframes cctvSlowPan2 {
          0% { transform: perspective(800px) rotateX(22deg) translateY(-6%) scale(1.35) rotate(0.5deg) translateX(1%); }
          50% { transform: perspective(800px) rotateX(22deg) translateY(-6%) scale(1.35) rotate(-0.5deg) translateX(-1%); }
          100% { transform: perspective(800px) rotateX(22deg) translateY(-6%) scale(1.35) rotate(0.5deg) translateX(1%); }
        }
        @keyframes redDotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes scanlineScroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes vhsTapeTrackingLine {
          0% { top: -10%; }
          30% { top: 110%; }
          100% { top: 110%; }
        }
        @keyframes vhsNoiseGrain {
          0% { transform: translate(0, 0); }
          25% { transform: translate(0.5% , -0.5%); }
          50% { transform: translate(-0.3%, 0.6%); }
          75% { transform: translate(0.8%, 0.3%); }
          100% { transform: translate(-0.6%, -0.4%); }
        }
        @keyframes crtFlicker {
          0%, 100% { opacity: 0.98; }
          50% { opacity: 1; }
        }
      `}} />

      {/* 1. Main Titles Row */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <span className="rounded-full bg-red-600/10 px-4 py-1.5 text-[11px] font-black tracking-[0.4em] text-red-500 border border-red-500/30 uppercase">
            전방 소초 심리추리 활성 수사극
          </span>
        </motion.div>
        
        <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-zinc-100 leading-none">
          사라진 총기,
          <br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-stone-300 to-zinc-400">숨겨진 진실</span>
        </h1>
        
        <p className="mt-4 text-xs font-mono tracking-[0.35em] text-zinc-500 uppercase">
          KOREAN OUTPOST MILITARY TRAGEDY WEB PROTOTYPE
        </p>
      </div>

      {/* 2. Interactive Military CCTV Surveillance Monitoring Console */}
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 shadow-2xl shadow-black/85">
        
        {/* Dynamic CCTV Instrument Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-4 border-b border-zinc-900 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-950/20 border border-red-500/30 text-red-500">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" style={{ animation: "redDotBlink 1.5s infinite" }} />
            </div>
            <div>
              <div className="font-mono text-xs font-black text-zinc-300 tracking-wider">GP SENTRY SECURITY CH-502 // 실시간 감찰 피드</div>
              <p className="text-[10px] text-zinc-500 font-mono">LOCATION: WEST AREA SENTRY COMMAND POST</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Camera Channel Controls */}
            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-805 text-zinc-400 text-[10px] font-mono font-bold">
              <button
                onClick={() => setActiveChannel("cam1")}
                className={`px-2.5 py-1 rounded-lg transition ${activeChannel === "cam1" ? "bg-[#cf2727] text-white" : "hover:text-zinc-200"}`}
              >
                CAM_01 생활관
              </button>
              <button
                onClick={() => setActiveChannel("cam2")}
                className={`px-2.5 py-1 rounded-lg transition ${activeChannel === "cam2" ? "bg-[#cf2727] text-white" : "hover:text-zinc-200"}`}
              >
                CAM_02 당직실
              </button>
              <button
                onClick={() => setActiveChannel("split")}
                className={`px-2.5 py-1 rounded-lg transition ${activeChannel === "split" ? "bg-[#cf2727] text-white" : "hover:text-zinc-200"}`}
              >
                SPLIT 분할화면
              </button>
            </div>

            {/* Camera Visualizer Modes */}
            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-805 text-zinc-400 text-[10px] font-mono font-bold">
              <button
                onClick={() => setCctvMode("grayscale")}
                className={`px-2 py-1 rounded-lg transition ${cctvMode === "grayscale" ? "bg-zinc-700 text-white" : "hover:text-zinc-200"}`}
              >
                수사 흑백
              </button>
              <button
                onClick={() => setCctvMode("night")}
                className={`px-2 py-1 rounded-lg transition ${cctvMode === "night" ? "bg-emerald-800 text-white font-black" : "hover:text-zinc-200"}`}
              >
                야간 녹외
              </button>
              <button
                onClick={() => setCctvMode("color")}
                className={`px-2 py-1 rounded-lg transition ${cctvMode === "color" ? "bg-zinc-700 text-white" : "hover:text-zinc-200"}`}
              >
                원본 컬러
              </button>
            </div>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div 
          className="relative aspect-video w-full bg-black rounded-2xl border border-zinc-900 overflow-hidden shadow-inner flex items-center justify-center"
          style={{ animation: "crtFlicker 0.25s infinite" }}
        >
          
          {/* Tactical screen vignette */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.92)_100%)]" />
          
          {/* Moving scanline shadow */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none opacity-[0.06] bg-gradient-to-b from-white via-transparent to-transparent h-1/2 w-full"
            style={{ animation: "scanlineScroll 6s linear infinite" }}
          />

          {/* CRT lines overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:100%_4px]" />

          {/* VHS Analog Tracking Glitch Band */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-25 opacity-15">
            <div 
              className="absolute left-0 right-0 h-4 bg-zinc-350/20 blur-xs border-y border-zinc-500/20"
              style={{ animation: "vhsTapeTrackingLine 5s linear infinite" }}
            />
            <div 
              className="absolute left-0 right-0 h-[8px] bg-white/25 blur-2xs"
              style={{ animation: "vhsTapeTrackingLine 8s linear infinite", animationDelay: "2s" }}
            />
          </div>

          {/* VHS Fractal Scan Noise Grain Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-25 opacity-[0.075]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "220px 220px",
              animation: "vhsNoiseGrain 0.4s steps(5) infinite"
            }}
          />

          {/* CCTV Feed Rendering Area */}
          <div className="absolute inset-0 w-full h-full flex transition-all duration-300">
            {activeChannel === "cam1" && (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={barracksRoomImg}
                  alt="Barracks CCTV Feed"
                  className="w-full h-full object-cover transition-all"
                  style={{
                    filter: getFilterStyle(),
                    animation: "cctvSlowPan1 18s ease-in-out infinite"
                  }}
                />
              </div>
            )}

            {activeChannel === "cam2" && (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={dutyOfficeImg}
                  alt="Duty Office CCTV Feed"
                  className="w-full h-full object-cover transition-all"
                  style={{
                    filter: getFilterStyle(),
                    animation: "cctvSlowPan2 18s ease-in-out infinite"
                  }}
                />
              </div>
            )}

            {activeChannel === "split" && (
              <div className="w-full h-full flex flex-col sm:flex-row gap-px bg-zinc-950">
                {/* Left pane Cam 1 */}
                <div className="relative flex-1 h-full overflow-hidden">
                  <img
                    src={barracksRoomImg}
                    alt="Barracks CCTV Feed"
                    className="w-full h-full object-cover"
                    style={{
                      filter: getFilterStyle(),
                      animation: "cctvSlowPan1 24s ease-in-out infinite"
                    }}
                  />
                  <div className="absolute top-3 left-3 z-30 bg-black/85 text-[8px] font-mono tracking-widest text-green-400 px-2 py-0.5 rounded border border-zinc-800 font-bold">
                    [CH_01] BARRACK_L
                  </div>
                </div>

                {/* Right pane Cam 2 */}
                <div className="relative flex-1 h-full overflow-hidden">
                  <img
                    src={dutyOfficeImg}
                    alt="Duty Office CCTV Feed"
                    className="w-full h-full object-cover"
                    style={{
                      filter: getFilterStyle(),
                      animation: "cctvSlowPan2 24s ease-in-out infinite"
                    }}
                  />
                  <div className="absolute top-3 left-3 z-30 bg-black/85 text-[8px] font-mono tracking-widest text-green-400 px-2 py-0.5 rounded border border-zinc-800 font-bold">
                    [CH_02] DUTY_OFF
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Retro VHS OSD (On-Screen Display) Glowing Phosphor Overlay */}
          <div className="absolute inset-6 pointer-events-none z-30 flex flex-col justify-between text-green-400 font-mono text-[11px] font-bold tracking-widest select-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)]">
            
            {/* Top Row: PLAY / REC Blink & Channel Info */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 min-w-[70px]">
                  <span>PLAY</span>
                  <span className="text-[10px] scale-y-125 animate-pulse">▶</span>
                </div>
                <div className="text-[9px] text-green-400/75 tracking-wider uppercase font-medium">
                  {activeChannel === "cam1" ? "CAM-01 생활관" : activeChannel === "cam2" ? "CAM-02 당직실" : "INDEX: MULTI"}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-1.5 text-red-500 font-extrabold drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)]">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" style={{ animation: "redDotBlink 1s infinite" }} />
                  <span className="tracking-widest">REC</span>
                </div>
                <div className="text-[9px] text-green-400/75">VCR-502 // GP-NET</div>
              </div>
            </div>

            {/* Middle Row: Tracking Status (Subtle) */}
            <div className="flex justify-between items-center text-[9px] text-green-400/50">
              <div>AUTO TRACKING...</div>
              <div>SLP (SUPER LONG PLAY)</div>
            </div>

            {/* Bottom Row: Date & Clock Time (Simulation of tape index) */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div>MAY 29, 2026</div>
                <div className="text-[9px] text-green-400/70">수색 분석도: {clues.length * 20}% CLEAR</div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-sm font-extrabold tracking-[0.15em]">
                  {currentTime || "05:35:08"}
                </div>
                <div className="text-[8px] text-green-400/60 font-mono">TAPE P.REF // 120min</div>
              </div>
            </div>

          </div>

          {/* Soft Bezel CRT Lens Mask Frame */}
          <div className="absolute inset-0 pointer-events-none z-28 shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]" style={{ borderRadius: "inherit" }} />

        </div>
      </div>

      {/* Game completion trophy/badge if they cracked all 6 clues */}
      {completedAll && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
              <Award size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-yellow-400 font-mono uppercase tracking-widest">수사 종결 완료</h4>
              <p className="text-xs text-zinc-400 mt-0.5">GP 내 모든 비공식 감찰 단서(5/5)를 수집하여 묵인된 침묵에 대한 실마리를 완전히 풀었습니다.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. Primary Action Button Grid - Elevated Styling */}
      <nav className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
        <button
          onClick={() => onNavigate("roomSelect")}
          className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100 flex flex-col justify-between p-5 text-left transition hover:bg-white hover:border-white w-full h-[150px]"
        >
          <Play className="text-black shrink-0" size={24} />
          <div>
            <div className="text-xs font-bold text-zinc-500 font-mono uppercase tracking-wider">GAME START</div>
            <div className="text-lg font-black text-black leading-tight mt-1">수사 시작하기</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("devNote")}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col justify-between p-5 text-left transition hover:border-zinc-500 hover:bg-zinc-900/30 w-full h-[150px]"
        >
          <FileText className="text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" size={24} />
          <div>
            <div className="text-xs font-bold text-zinc-500 font-mono uppercase tracking-wider">DIRECTOR'S NOTE</div>
            <div className="text-lg font-black text-zinc-300 leading-tight mt-1">개발자 감찰지</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("menu")}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col justify-between p-5 text-left transition hover:border-zinc-500 hover:bg-zinc-900/30 w-full h-[150px]"
        >
          <Menu className="text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" size={24} />
          <div>
            <div className="text-xs font-bold text-zinc-500 font-mono uppercase tracking-wider">COMMAND MENU</div>
            <div className="text-lg font-black text-zinc-300 leading-tight mt-1">서브 메뉴 열기</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col justify-between p-5 text-left transition hover:border-zinc-500 hover:bg-zinc-900/30 w-full h-[150px]"
        >
          <Settings className="text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" size={24} />
          <div>
            <div className="text-xs font-bold text-zinc-500 font-mono uppercase tracking-wider">SYSTEM CONFIG</div>
            <div className="text-lg font-black text-zinc-300 leading-tight mt-1">감찰 설정</div>
          </div>
        </button>
      </nav>

      <p className="mt-12 text-center text-xs tracking-[0.35em] text-zinc-600 sm:text-zinc-500 font-sans">
        “ 범인은 단 한 명이었지만, 비행은 우리들의 방조 아래 침묵으로 완성되었다. ”
      </p>

      {/* Active unlocked rooms diagnostic radar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-900">
        <div className="flex items-center gap-2">
          {room2Unlocked ? (
            <ShieldCheck className="text-emerald-500" size={16} />
          ) : (
            <ShieldAlert className="text-amber-500 animate-pulse" size={16} />
          )}
          <span className="font-mono text-[10px] text-zinc-400">
            {room2Unlocked 
              ? "STATUS: 당직사령 지휘 통제실(방 2)의 실시간 접근 승인 완료" 
              : "STATUS: 생활관 내(방 1) 소총 실인정 분포 분석 대기중 (방 2는 잠겨있습니다)"
            }
          </span>
        </div>
        <div className="font-mono text-[9px] text-zinc-600">
          SECURE_ID: b5836841_GP_NET
        </div>
      </div>
    </div>
  );
}
