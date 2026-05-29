import React, { useState } from "react";
import { Search, Monitor, FileText, CheckCircle2, Sliders, EyeOff, ShieldAlert, AlertTriangle, Key, Loader, Power } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Clue } from "../types";
import { CLUE_DATA } from "../data/gameData";
import MissionPanel from "./MissionPanel";

// @ts-ignore
import dutyOfficeImg from "../assets/images/duty_office_main_1780032582200.png";

interface RoomTwoProps {
  onNavigate: (page: string) => void;
  clues: Clue[];
  addClue: (clue: Clue) => void;
  key?: string;
}

export default function RoomTwo({ onNavigate, clues, addClue }: RoomTwoProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // --- POV Camera Focus Control System ---
  const [viewAngle, setViewAngle] = useState<"wide" | "desk" | "storage">("wide");

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

  // --- [SQ-05] 창고의 흔적 Minigame States ---
  const [hasStorageKey, setHasStorageKey] = useState(false);
  const [storageUnlocked, setStorageUnlocked] = useState(false);
  const [comparedBootPrint, setComparedBootPrint] = useState(false);
  const [comparedMessage, setComparedMessage] = useState("");
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>(260);

  const isCollected = (id: string) => clues.some((c) => c.id === id);

  const compareBootSize = () => {
    if (selectedShoeSize === 275) {
      setComparedBootPrint(true);
      setComparedMessage("✔ 완벽한 대조 성립! 군화 밑창의 이중 격자 모양과 뒤축 마모 방향이 당직사관 이종혁 상사의 사물 군화(275mm)와 그대로 매칭됩니다.");
      addClue(CLUE_DATA.sq5_storageTrace);
    } else {
      setComparedMessage(`❌ 불일치: 입력하신 ${selectedShoeSize}mm 전투화 아웃솔 격자 패턴은 흙먼지 속 거대 자국과 대조 매칭에 실패했습니다.`);
    }
  };

  const getCameraTransform = () => {
    switch (viewAngle) {
      case "desk":
        return "scale(1.55) translate(18%, -2%)";
      case "storage":
        return "scale(1.55) translate(-15%, 4%)";
      default:
        return "scale(1.04) translate(0px, 0px)";
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {/* Interactive Command Center View */}
      <div className="relative min-h-[660px] rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none text-zinc-100">
        
        {/* Tactical overlay brackets */}
        <div className="absolute inset-0 pointer-events-none z-20 border-2 border-zinc-800 rounded-3xl" />

        {/* Header toolbar */}
        <div className="relative z-20 flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-black">
              SURVEILLANCE_ROOM.GP-DUTY // 제2당직실 & 행정 제어 대지
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">당직 총서 구역 // 통행승인</span>
        </div>

        {/* First Person Interactive Arena */}
        <div className="relative z-10 flex-1 my-4 rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center">
          
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-full min-h-[440px] cursor-crosshair overflow-hidden"
          >
            {/* Smooth panning zoom viewport */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out bg-cover bg-center"
              style={{
                backgroundImage: `url(${dutyOfficeImg})`,
                transform: getCameraTransform(),
              }}
            >
              {/* Hotspot triggers positioned directly over the physical environment */}

              {/* 1. Search Desk for Storage key */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("deskSearch")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "52%", left: "22%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  hasStorageKey ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    hasStorageKey ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <Key size={11} className="animate-pulse" />
                    <span>{hasStorageKey ? "키 획득함" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white">이종혁 사도 데스크</span>
                </div>
              </motion.button>

              {/* 2. Boot Print Analysis in Storage */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotspot("storageDoor")}
                className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ top: "48%", left: "75%" }}
              >
                <div className={`flex flex-col items-center p-2 rounded bg-black/75 border hover:bg-black/90 transition-all duration-200 shadow-xl ${
                  isCollected("sq5_storageTrace") ? "border-emerald-500/50" : "border-zinc-800 hover:border-amber-500"
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase ${
                    isCollected("sq5_storageTrace") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    <Search size={11} />
                    <span>{isCollected("sq5_storageTrace") ? "수색 완료" : "[ 조사하기 ]"}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 group-hover:text-white">보일러 공구창고 입구</span>
                </div>
              </motion.button>

            </div>

            {/* Simulated sweep-flashlight overlay */}
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

            {/* General assistance tip */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/55 backdrop-blur-sm border border-zinc-800 p-2 rounded-lg max-w-sm">
              <p className="text-[10px] text-zinc-400 leading-tight font-sans">
                손전등 빛을 이종혁 상사의 서랍 및 주변 창고 전단으로 조준하십시오. <br />
                서랍장 수색 후, 획득한 열쇠로 우측 공구창고를 해제하십시오.
              </p>
            </div>

            {/* Scanlines overlay screen effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)))] bg-[size:100%_4px] opacity-10" />

          </div>
        </div>

        {/* POV Camera Controls and General Buttons */}
        <div className="relative z-20 border-t border-zinc-900 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFlashlightOn(!flashlightOn)}
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
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
              지휘실 안쪽의 습기찬 공구함에서 전투조 조작 흔적을 소환하십시오.
            </span>
          </div>

          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 gap-1">
            <span className="text-[9px] font-mono font-bold text-zinc-500 px-2 uppercase shrink-0">카메라 초점 :</span>
            {[
              { id: "wide", label: "전체 시야" },
              { id: "desk", label: "상황실 책상" },
              { id: "storage", label: "창고 전용실" },
            ].map((angle) => (
              <button
                key={angle.id}
                onClick={() => setViewAngle(angle.id as any)}
                className={`px-2 py-1 text-[10px] tracking-tight font-black rounded-lg transition ${
                  viewAngle === angle.id
                    ? "bg-amber-500 text-black font-bold"
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
              
              {/* Desk search trigger (Storage Key) */}
              {selectedHotspot === "deskSearch" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">이종혁 상사의 책상 서랍 수색</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
                    당직 하사가 부재 중인 빈 데스크 영역입니다. 장부 서첩과 무전 가이드 매뉴얼 틈으로, 낡은 열쇠고리가 차가운 금속빛을 슬며시 던집니다.
                  </p>

                  <div className="my-4 rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-center">
                    {hasStorageKey ? (
                      <div className="text-xs text-emerald-400 font-bold font-mono">
                        ✔ 보일러 공구 창고 비상 고정 열쇠 확보 완료 (소지품 탑재)
                      </div>
                    ) : (
                      <span className="text-[10px] text-zinc-500 font-sans">수첩 낱장 고정대 틈에 은밀히 열쇠가 꽂혀 있습니다.</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!hasStorageKey ? (
                      <button
                        onClick={() => setHasStorageKey(true)}
                        className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 text-xs font-semibold"
                      >
                        수첩 낱장 틈새에서 비상 열쇠 끄집어내기
                      </button>
                    ) : (
                      <div className="flex-1 text-center text-xs py-2 bg-emerald-950/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                        열쇠 확보 완료됨
                      </div>
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

              {/* Storage Room door / Boot Print Analysis */}
              {selectedHotspot === "storageDoor" && (
                <motion.div
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 15 }}
                  className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="text-amber-500 text-lg shrink-0" />
                    <h3 className="text-lg font-black text-white font-mono">SQ-05: 보일러 공구 창고 / 군화 흔적 대조</h3>
                  </div>

                  {!storageUnlocked ? (
                    <div className="space-y-4">
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        창고 문과 내지 자물쇠 뭉치가 굳게 체결되어 있습니다. 이종혁의 서랍에서 기확보한 구형 황동 열쇠를 주입하여 잠금을 돌리십시오.
                      </p>
                      
                      <div className="flex gap-2">
                        {hasStorageKey ? (
                          <button
                            onClick={() => setStorageUnlocked(true)}
                            className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-xs font-bold transition"
                          >
                            열쇠 구멍에 꽂고 잠금장치 돌리기
                          </button>
                        ) : (
                          <div className="flex-1 text-center text-xs py-3 border border-red-500/20 bg-red-950/10 text-red-x-400 rounded-xl font-sans text-red-400">
                            ※ 잠김: 열쇠 주입 필요 (이종혁 사도 데스크 서랍을 먼저 기획 수색하여 열쇠를 확보해주십시오.)
                          </div>
                        )}
                        <button
                          onClick={() => setSelectedHotspot(null)}
                          className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                        >
                          되돌아가기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        창고 안쪽의 무거운 시멘트 분진 바위 틈으로 거칠고 시커먼 흙먼지 가루가 유포되어 있습니다. 그 한가운데 깊고 매우 뚜렷하게 발자국이 남겨진 **보급 군화 무늬(이중 격자형)**가 수사관의 긴장을 돋웁니다.
                      </p>

                      <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs">
                        <div className="text-[10px] text-zinc-500 mb-2 uppercase text-center border-b border-zinc-900 pb-1">격자 무늬 흙먼지 군화 자국 대조 장치</div>
                        
                        <div className="flex items-center justify-between gap-2 my-3">
                          <span className="text-[11px] text-zinc-400">전투화 크기(mm) 설정:</span>
                          <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                            {[260, 265, 270, 275, 280].map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedShoeSize(size)}
                                className={`px-2 py-1 text-[11px] font-bold rounded ${
                                  selectedShoeSize === size 
                                    ? "bg-amber-500 text-black font-black" 
                                    : "text-zinc-400 hover:text-white"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {comparedMessage && (
                          <div className={`p-3 rounded text-[11px] leading-relaxed font-sans mt-3 ${
                            comparedBootPrint ? "bg-emerald-950/20 text-emerald-300 border border-emerald-500/20" : "bg-red-950/20 text-red-400 border border-red-500/20"
                          }`}>
                            {comparedMessage}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {!comparedBootPrint ? (
                          <button
                            onClick={compareBootSize}
                            className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 text-xs font-semibold transition"
                          >
                            입력 치수로 흙먼지 자국 프레임 매칭 대조
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedHotspot(null)}
                            className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold transition"
                          >
                            단서 적재 등록 및 수색 마감
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedHotspot(null);
                          }}
                          className="rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 px-4 py-2.5 text-xs"
                        >
                          목록 닫기
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Side Mission Panel */}
      <MissionPanel
        title="당직지휘 제어 진행도"
        body="사건 은폐의 숨은 공모 관계를 파헤칠 마지막 단서입니다. 당직사관 이종혁 상사가 상황 근무를 서며 은밀히 행정 구역과 연계 창고 지역을 정찰 및 오간 진상이 매듭지어집니다."
        items={[
          { label: "SQ-05: 창고 흔적 추적 (이종혁 수첩 열쇠 획득)", clueId: "sq5_storageTrace" }
        ]}
        warning="수사 일안이 완성되면, 밤하늘은 밝아오고 최후의 지목 사건 복구망이 자동으로 승인됩니다."
        clues={clues}
      />
    </div>
  );
}
