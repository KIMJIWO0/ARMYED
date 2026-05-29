import React from "react";
import { motion } from "motion/react";
import { X, Play, FileText, Settings, Menu, Compass } from "lucide-react";
import { PageType } from "../types";

interface MenuOverlayProps {
  onNavigate: (page: PageType) => void;
  onClose: () => void;
}

export default function MenuOverlay({ onNavigate, onClose }: MenuOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/90 p-4 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ y: 25, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 25, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
        className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-2xl relative"
      >
        {/* Top visual tag */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-emerald-500 rounded-b" />

        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-1.5">
            <Compass size={18} className="text-emerald-500 animate-spin [animation-duration:10s]" />
            <h2 className="text-xl font-black text-zinc-50 tracking-tight">작전 메뉴</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-zinc-805 p-1.5 text-zinc-400 hover:border-zinc-500 hover:text-white transition"
          >
            <X size={15} />
          </button>
        </div>

        {/* Buttons List */}
        <div className="grid gap-2.5">
          <MenuButton
            icon={<Play size={15} />}
            label="게임 시작 (수사 장부)"
            onClick={() => {
              onNavigate("roomSelect");
              onClose();
            }}
          />
          <MenuButton
            icon={<FileText size={15} />}
            label="개발자 수사 소견"
            onClick={() => {
              onNavigate("devNote");
              onClose();
            }}
          />
          <MenuButton
            icon={<Menu size={15} />}
            label="메인 화면으로"
            onClick={() => {
              onNavigate("home");
              onClose();
            }}
          />
          <MenuButton
            icon={<Settings size={15} />}
            label="감찰 설정 축소"
            onClick={() => {
              onNavigate("settings");
              onClose();
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function MenuButton({ icon, label, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-left text-xs font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
    >
      <div className="flex items-center gap-3">
        <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors">
          {icon}
        </span>
        <span className="font-sans font-bold">{label}</span>
      </div>
      <span className="font-mono text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase">
        SELECT
      </span>
    </button>
  );
}
