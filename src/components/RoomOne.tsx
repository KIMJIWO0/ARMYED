import React, { useState } from "react";
import { Search, Eye, Key, AlertTriangle, BookOpen, Layers, Power, Disc, MoveRight, ChevronLeft, ChevronRight, HelpCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Clue } from "../types";
import { CLUE_DATA } from "../data/gameData";
import MissionPanel from "./MissionPanel";

// @ts-ignore
import barracksRoomImg from "../assets/images/barracks_room_main_1780032563826.png";

interface RoomOneProps {
  onNavigate: (page: string) => void;
  clues: Clue[];
  addAddClue?: (clue: Clue) => void; // for backward compatibility if any
  addClue: (clue: Clue) => void;
  key?: string;
}

export default function RoomOne({ onNavigate, clues, addClue }: RoomOneProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // --- Cinematic Navigation Focus System ---
  const [viewAngle, setViewAngle] = useState<"wide" | "right" | "left" | "ceiling">("wide");

  // --- Flashlight Overlay State ---
  const [flashlightOn, setFlashlightOn] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // --- [SQ-01] 지워진 기록 minigame state ---
  const [logInEmergencyLight, setLogInEmergencyLight] = useState(false);

  // --- [SQ-02] 이준철 관물대 state ---
  const [lockerCombo, setLockerCombo] = useState<[string, string, string, string]>(["0", "0", "0", "0"]);
  const [lockerUnlockingMessage, setLockerUnlockingMessage] = useState("");

  // --- [SQ-03] 숨겨진 총기 환풍기 state ---
  const [ventScrewLeft, setVentScrewLeft] = useState(true);
  const [ventScrewRight, setVentScrewRight] = useState(true);
  const [ventCoverShifted, setVentCoverShifted] = useState(false);

  // --- [SQ-04] DVD 안의 비밀 state ---
  const [dvdInspected, setDvdInspected] = useState(false);

  const isCollected = (id: string) => clues.some((c) => c.id === id);

  // Handle D-513 locker passcode
  const handleLockerDial = (idx: number) => {
    if (isCollected("sq2_lockedLocker")) return;
    setLockerCombo((prev) => {
      const next = [...prev] as [string, string, string, string];
      next[idx] = String((Number(next[idx]) + 1) % 10);
      return next;
    });
  };

  const handleLockerUnlock = () => {
    const code = lockerCombo.join("");
    if (code === "0513") {
      setLockerUnlockingMessage("탈칵! 무거운 다이얼 자물쇠가 풀리며 이준철의 먼지 쌓인 일기장이 나타납니다.");
      addClue(CLUE_DATA.sq2_lockedLocker);
    } else {
      setLockerUnlockingMessage("다이얼이 완강하게 고정되어 열리지 않습니다. 조합 번호(날짜)를 다시 생각해보십시오.");
    }
  };

  const handleOpenVent = () => {
    if (!ventScrewLeft && !ventScrewRight) {
      setVentCoverShifted(true);
      addClue(CLUE_DATA.sq3_hiddenRifle);
    }
  };

  // Get dynamic transform for panning room exploration
  const getCameraTransform = () => {
    switch (viewAngle) {
      case "right":
        return "scale(1.6) translate(-18%, 2%)";
      case "left":
        return "scale(1.6) translate(18%, -4%)";
      case "ceiling":
        return "scale(1.9) translate(0%, 18%)";
      default:
        return "scale(1.04) translate(0px, 0px)";
    }
  };

  // Sound buzz simulation for flashlight
  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {/* Cinematic Photorealistic First-Person Viewport */}
      <div className="relative min-h-[660px] rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none text-zinc-100">
        
        {/* Decorative Grid Lines to give military CRT/HUD style */}
        <div className="absolute inset-0 pointer-events-none z-20 border-2 border-zinc-800 rounded-3xl" />
        <div className="absolute top-2 left-6 right-6 h-px bg-zinc-800/40 z-20 pointer-events-none" />

        {/* Top Header Information Overlay */}
        <div className="relative z-20 flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="font-mono text-xs tracking-widest text-[#cf2727] uppercase font-black">
              SURVEILLANCE_ROOM_S1 // 생활관 탐정 초소 01
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400">
            <span>시점: 1인칭 관찰 모드</span>
            <span className="text-zinc-650">|</span>
            <span>야간 비상 등화 가동 중</span>
          </div>
        </div>

        {/* First Person Interactive Arena */}
        <div className="relative z-10 flex-1 my-4 rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center">
          
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-full min-h-[440px] cursor-crosshair overflow-hidden"
          >
            {/* The Back Image that pans and zooms smoothly */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out bg-cover bg-center"
              style={{
                backgroundImage: `url(${barracksRoomImg})`,
                transform: getCameraTransform(),
              }}
            >
              {/* Tactical Camera Focal Interactivity Spotlights inside the Zoom Frame */}
              
              {/* 1. K2 Rifle storage cabinet Slot 4 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("missingRifle")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "43%", left: "80%" }}
              >
                <div className="flex flex-col items-center p-2 rounded bg-black/75 border border-zinc-800 hover:border-red-500 hover:bg-black/90 transition-all duration-200 shadow-xl">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-red-400">
                    <Search size={11} className="animate-pulse text-red-500" />
                    <span>[ 조사하기 ]</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white">4번 총기 거치대</span>
                </div>
              </motion.button>

              {/* 2. SQ-01: Weapon Logbook */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("weaponLog")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "58%", left: "62%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  isCollected("sq1_erasedLog") ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    isCollected("sq1_erasedLog") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <BookOpen size={11} />
                    <span>{isCollected("sq1_erasedLog") ? "완료됨 // 대장" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white font-bold">총기 관리대장</span>
                </div>
              </motion.button>

              {/* 3. SQ-02: Lee Juncheol locker */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("juncheolLocker")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "42%", left: "28%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  isCollected("sq2_lockedLocker") ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    isCollected("sq2_lockedLocker") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <Key size={11} />
                    <span>{isCollected("sq2_lockedLocker") ? "잠금해제됨" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white">개인 물품 관물대</span>
                </div>
              </motion.button>

              {/* 4. SQ-03: Ceiling Vent */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("ventDuct")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "14%", left: "50%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  isCollected("sq3_hiddenRifle") ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    isCollected("sq3_hiddenRifle") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <Layers size={11} />
                    <span>{isCollected("sq3_hiddenRifle") ? "소총 발견됨" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white">천정 환풍구 구멍</span>
                </div>
              </motion.button>

              {/* 5. SQ-04: Kim Jiwoo Shelf DVD Secret */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("jiwooShelf")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "50%", left: "10%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  isCollected("sq4_dvdSecret") ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    isCollected("sq4_dvdSecret") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <Disc size={11} />
                    <span>{isCollected("sq4_dvdSecret") ? "검증 완료" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white font-bold">DVD 보관장 선반</span>
                </div>
              </motion.button>

            </div>

            {/* Immersive Tactical Flashlight Ray Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-150 mix-blend-multiply"
              style={
                flashlightOn
                  ? {
                      background: `radial-gradient(circle 160px at ${mousePos.x}% ${mousePos.y}%, transparent 15%, rgba(0, 0, 0, 0.70) 75%)`,
                    }
                  : {
                      background: "rgba(0, 0, 0, 0.35)",
                    }
              }
            />

            {/* High-intensity Light Beam Overlay */}
            {flashlightOn && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-150 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle 160px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 245, 0.45) 0%, rgba(255, 255, 245, 0.15) 50%, transparent 100%)`,
                }}
              />
            )}

            {/* Edge Warning glow if flashlight close to borders */}
            <div className="absolute inset-0 border border-red-500/10 pointer-events-none" />

            {/* In-game live instructions */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/55 backdrop-blur-sm border border-zinc-800 p-2 rounded-lg max-w-xs">
              <p className="text-[10px] text-zinc-400 leading-tight font-sans">
                마우스를 움직여 <span className="text-white font-bold">손전등 불빛</span>으로 생활관 구석구석을 비추십시오. 감찰 대상에 가까워지면 <span className="text-amber-400 font-bold">[ 조사하기 ]</span> 가 활성화됩니다.
              </p>
            </div>

            {/* HUD Scan Line noise effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)))] bg-[size:100%_4px] opacity-10" />

          </div>
        </div>

        {/* Cinematic POV Camera Control Center */}
        <div className="relative z-20 border-t border-zinc-900 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-xs">
          {/* Flashlight toggle control */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFlashlight}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] font-bold transition-all duration-250 ${
                flashlightOn
                  ? "bg-amber-500 text-black border-amber-400"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800"
              }`}
            >
              <Power size={13} />
              <span>손전등 // {flashlightOn ? "ON (경계유지)" : "OFF"}</span>
            </button>
            <span className="text-[10px] text-zinc-650 font-mono">|</span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
              조사 구역을 클릭 시 카메라가 해당 위치를 근접 확대 촬영합니다.
            </span>
          </div>

          {/* Panoramic Camera Focus Buttons */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 gap-1">
            <span className="text-[9px] font-mono font-bold text-zinc-500 px-2 uppercase shrink-0">카메라 시야각 :</span>
            {[
              { id: "wide", label: "전체 시야" },
              { id: "left", label: "좌측 생활대" },
              { id: "ceiling", label: "천장 구획" },
              { id: "right", label: "우측 보관함" },
            ].map((angle) => (
              <button
                key={angle.id}
                onClick={() => setViewAngle(angle.id as any)}
                className={`px-2 py-1 text-[10px] tracking-tight font-black rounded-lg transition ${
                  viewAngle === angle.id
                    ? "bg-[#cf2727] text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hotspot detail modals */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-950/95 p-5 backdrop-blur-md"
            >
              
              {/* Hotspot 1: Missing Rifle Discovery */}
              {selectedHotspot === "missingRifle" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="text-red-500 text-lg shrink-0 animate-pulse" />
                    <h3 className="text-lg font-black text-white font-mono">4번 총기 거치대 점검 결과</h3>
                  </div>
                  
                  <div className="my-4 rounded-xl border border-red-500/20 bg-red-950/10 p-4 font-mono text-xs leading-relaxed text-red-250">
                    <p className="font-bold mb-1 text-red-400">■ 현장 세부 보고서:</p>
                    <p>어둠 속 야간 생활관 순察 감찰 도중 철제 보관함의 4번 슬롯(상병 총포 거치대)이 기이할 정도로 귓가에 조용히 비어있는 것을 정면으로 관찰했습니다. 자물쇠를 강제로 뜯은 쇠톱 흔적이나 물리적 실랑이 전말은 어디에도 파악되지 않는 무서운 상황입니다.</p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-5 font-medium">
                    내일 아침이면 동트고 포상휴가 보트가 기항지에 도착하는데, 총포 미발견 시 서해 사건이 사단 헌병대와 상위 지휘국에 그대로 보전 보고되어 공장급 폐쇄 정호 수사가 연역될 예정입니다.
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider transition"
                    >
                      상황 수사 및 주변 추적 가동
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Hotspot 2: SQ-01: Erased Logbook */}
              {selectedHotspot === "weaponLog" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">SQ-01: 지워진 기록 (총기 관리대장)</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
                    총기보관함 옆 탁자에 먼지 쌓인 채 방치된 관리일지장입니다. 당직사관 이종혁 하사가 정식 작성한 타임라인 중 22:15 슬롯이 다른 화공 펜이나 고무에 의해 심하게 덧칠되어 지워진 상태입니다. 복도 비상 비경 붉은 빛 아래로 대장을 가깝게 비스듬히 기울여 비추어보십시오.
                  </p>

                  <div className="my-4 rounded-lg bg-zinc-950 border border-zinc-850 p-4 font-mono text-center">
                    {logInEmergencyLight ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-left text-xs space-y-2 text-emerald-400 bg-emerald-950/15 p-3 rounded"
                      >
                        <p className="font-bold border-b border-emerald-900/30 pb-1 mb-1 font-mono text-[10px]">■ 붉은 비상등 극광 정수 투과 결과:</p>
                        <p className="text-sm font-black tracking-wide bg-black/40 px-2 py-1.5 border border-emerald-700/20 text-center">
                          “22:15 — 이준철 이병 보관함 접근 확인 / 당직 이종혁”
                        </p>
                        <p className="text-[10px] text-zinc-400 font-sans mt-2 leading-relaxed">
                          * 분석 결론: 이종혁 하사가 이준철 일병의 접근 사실을 똑똑히 확인하고도 당직 일지 기록을 은폐 및 삭제하였음을 시사합니다.
                        </p>
                      </motion.div>
                    ) : (
                      <div className="py-6 flex flex-col items-center justify-center">
                        <AlertTriangle className="text-red-500 animate-pulse mb-2" size={24} />
                        <span className="text-[10px] text-zinc-500 font-sans">어두워서 하단 수정된 펜 흔적이 보이지 않습니다.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!logInEmergencyLight ? (
                      <button
                        onClick={() => {
                          setLogInEmergencyLight(true);
                        }}
                        className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 text-xs font-semibold"
                      >
                        붉은 비상 조명등 밑으로 비추어 대조해보기
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addClue(CLUE_DATA.sq1_erasedLog);
                          setSelectedHotspot(null);
                        }}
                        className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold"
                      >
                        단서 등록 및 복귀
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedHotspot(null);
                        setLogInEmergencyLight(false);
                      }}
                      className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                    >
                      목록 닫기
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Hotspot 3: SQ-02: Lee Juncheol Locker Dial Lock */}
              {selectedHotspot === "juncheolLocker" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">SQ-02: 잠긴 이준철 개인 관물대 수색</h3>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    관물함 다이얼 자물쇠가 완벽하게 걸려 지탱되어 있습니다. 소대원들의 증언과 단서에 맞춰 4자리 일지 입력구(날짜 등) 조합을 정확하게 기안하십시오.
                    <br />
                    <span className="text-amber-500 font-mono font-bold">힌트: </span>
                    상황실 지도를 해금하는 단서이자 사건 당일 기한적 날짜입니다. (사건 발생 당일 자정: 05월 13일)
                  </p>

                  <div className="my-5 rounded-lg bg-zinc-950 border border-zinc-800 p-4">
                    {/* Dial Selector layout */}
                    <div className="flex justify-center gap-3">
                      {lockerCombo.map((char, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLockerDial(idx)}
                          disabled={isCollected("sq2_lockedLocker")}
                          className="flex h-12 w-10 flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 font-bold hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-40 select-none text-lg text-white"
                        >
                          <span className="text-[8px] text-zinc-500 font-mono">Dial{idx + 1}</span>
                          {char}
                        </button>
                      ))}
                    </div>

                    {lockerUnlockingMessage && (
                      <p className="mt-4 text-center text-xs text-amber-200 bg-zinc-900/60 p-2 rounded font-sans leading-relaxed">
                        {lockerUnlockingMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!isCollected("sq2_lockedLocker") && (
                      <button
                        onClick={handleLockerUnlock}
                        className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 text-xs font-semibold"
                      >
                        자물쇠 해제 시도
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedHotspot(null);
                        setLockerUnlockingMessage("");
                      }}
                      className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                    >
                      목록 닫기
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Hotspot 4: SQ-03: Ventilation Duct above Bed */}
              {selectedHotspot === "ventDuct" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">SQ-03: 침상 상부 구조 환풍구</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
                    이준철 이병 침상 위 천장 환풍구입니다. 다른 곳들에 비해 나사 결합이 미세하게 흠집이 나있고, 한쪽으로 고정 나사가 비틀려 있습니다. 양쪽 나사 손자리를 손톱으로 풀고 수색 장벽을 개방하십시오.
                  </p>

                  <div className="my-4 rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-center">
                    <div className="text-[10px] text-zinc-500 mb-3 uppercase font-bold tracking-wider">나사 조립 상태</div>
                    
                    <div className="flex justify-center gap-4 text-xs mb-3">
                      <button
                        onClick={() => setVentScrewLeft(false)}
                        className={`px-3 py-1.5 rounded border transition-colors ${
                          ventScrewLeft 
                            ? "border-red-500/30 text-red-400 bg-red-950/10 hover:bg-red-900/10" 
                            : "border-zinc-800 text-zinc-650 bg-zinc-900/40 cursor-not-allowed"
                        }`}
                        disabled={!ventScrewLeft}
                      >
                        {ventScrewLeft ? "왼쪽 나사 잠김 해제" : "왼쪽 나사 해제됨"}
                      </button>
                      
                      <button
                        onClick={() => setVentScrewRight(false)}
                        className={`px-3 py-1.5 rounded border transition-colors ${
                          ventScrewRight 
                            ? "border-red-500/30 text-red-400 bg-red-950/10 hover:bg-red-900/10" 
                            : "border-zinc-800 text-zinc-650 bg-zinc-900/40 cursor-not-allowed"
                        }`}
                        disabled={!ventScrewRight}
                      >
                        {ventScrewRight ? "오른쪽 나사 잠김 해제" : "오른쪽 나사 해제됨"}
                      </button>
                    </div>

                    <div className="text-[10px] text-zinc-500">
                      {!ventScrewLeft && !ventScrewRight ? "✔ 이제 천장 환풍 커버 지면이 손으로 당겨집니다." : "양쪽 고정 핀을 전면 해제해야 뜯을 수 있습니다."}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!ventScrewLeft && !ventScrewRight && !isCollected("sq3_hiddenRifle") ? (
                      <button
                        onClick={handleOpenVent}
                        className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold"
                      >
                        환풍구 커버를 힘껏 밀어내 수색하기
                      </button>
                    ) : (
                      isCollected("sq3_hiddenRifle") && (
                        <div className="flex-1 text-center font-bold text-xs text-emerald-400 bg-emerald-950/20 py-2.5 border border-emerald-500/10 rounded-xl">
                          소총 확인 완료 (K2 총포 안치 완료)
                        </div>
                      )
                    )}
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                    >
                      목록 닫기
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Hotspot 5: SQ-04: Kim Jiwoo Shelf DVD Secret */}
              {selectedHotspot === "jiwooShelf" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Disc className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">SQ-04: 김지우 병장의 비밀 매대관</h3>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                    관물함 뒤 보관 케이스 틈새에 먼지를 쓴 채 꽂혀있는 구식 DVD 플라스틱 표지함입니다. 케이스의 이음새와 속지를 정밀 부하 검사하여 은폐된 소소한 필체를 꺼냅니다.
                  </p>

                  <div className="my-4 rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs">
                    {dvdInspected ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3 leading-relaxed text-left text-zinc-200"
                      >
                        <div className="border-b border-zinc-800 pb-1.5 mb-1 text-[10px] text-zinc-500 font-mono">
                          ■ DVD 뒷면 자필 메모 편폭 추출:
                        </div>
                        <p className="text-amber-200 italic font-bold bg-zinc-900 p-2.5 rounded border border-zinc-800">
                          “지우야, 이준철 오늘 총기 쪽 계속 조용히 기린처럼 보던데. 혹시 모르니 영수증 챙기고 선반 좀 봐둬. — 이종혁”
                        </p>
                        <div className="border-t border-zinc-800 pt-2 text-[10px] text-zinc-400 leading-normal font-sans">
                          <span className="font-bold text-emerald-400 font-mono text-[9px] block">■ PX 타각 증명서 (22:05):</span>
                          황 소장 부대 매점 영수 타임라인: 22:05 기록 선서 <br />
                          * 수사 해명: 김지우 병장은 22:05에 부대 매점에 체류했음이 완전 해명되어, 소총 유실 전후 소초 부재가 입증됩니다.
                        </div>
                      </motion.div>
                    ) : (
                      <div className="py-4 text-center">
                        <span className="text-[10px] text-zinc-500 font-sans">구식 DVD의 케이스 뒤쪽 비닐을 뜯어 흔적을 감별해내십시오.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!dvdInspected ? (
                      <button
                        onClick={() => setDvdInspected(true)}
                        className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-xs font-semibold"
                      >
                        비닐 포장 해부 및 수사 흔적 적출
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addClue(CLUE_DATA.sq4_dvdSecret);
                          setSelectedHotspot(null);
                        }}
                        className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold"
                      >
                        중점단서 등단 등록 완료
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedHotspot(null);
                        setDvdInspected(false);
                      }}
                      className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                    >
                      목록 닫기
                    </button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Side info panel list */}
      <MissionPanel
        title="생활관 수색 진행도"
        body="사라진 GP K2 일반 소총을 찾고 지인들의 묵인된 연결 고리를 규명해야만 합니다. 모든 서브 퀘스트를 원만하게 해결해 당직일지 수정액의 진가를 복원하고 다음 지휘통제구역(방 2)의 실마리를 확보하십시오."
        items={[
          { label: "SQ-01: 지워진 일지대장 (복도 비상등 하부 조사)", clueId: "sq1_erasedLog" },
          { label: "SQ-02: 이준철 관물함 암호 자물쇠 해제 (0513 입력)", clueId: "sq2_lockedLocker" },
          { label: "SQ-03: 침상 상부 천장 환풍구 나사 탈각 수색", clueId: "sq3_hiddenRifle" },
          { label: "SQ-04: 김지우 DVD 케이스 내 비밀 자필 메모 해독", clueId: "sq4_dvdSecret" },
        ]}
        warning="생활관 점등 분위기를 크게 깨트리면 상황실의 의심을 사 수색 작전이 강제 정지될 수 있습니다."
        clues={clues}
      />
    </div>
  );
}
