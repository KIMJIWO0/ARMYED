/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { PageType, Clue } from "./types";

// Component imports
import BackgroundEffect from "./components/BackgroundEffect";
import VhsLayer from "./components/VhsLayer";
import Hud from "./components/Hud";
import ClueToast from "./components/ClueToast";
import Notebook from "./components/Notebook";

// Pages
import Home from "./components/Home";
import RoomSelect from "./components/RoomSelect";
import RoomOne from "./components/RoomOne";
import RoomTwo from "./components/RoomTwo";
import DevNote from "./components/DevNote";
import SettingsPage from "./components/SettingsPage";
import MenuOverlay from "./components/MenuOverlay";
import Accusation from "./components/Accusation";
import Ending from "./components/Ending";

// Synthesizer beep for military surveillance feedback
function playSyntheticChirp(type: "click" | "clue" | "alert") {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === "click") {
      // Subtle military keypress beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (type === "clue") {
      // High-frequency double chime for forensic registration
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1200, now);
      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(now + 0.12);

      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1600, now);
        gain2.gain.setValueAtTime(0.04, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(now + 0.18);
      }, 80);
    } else if (type === "alert") {
      // Warning chime for error or warning screens
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.3);
    }
  } catch (err) {
    console.debug("Web Audio blocked by user gesture requirements", err);
  }
}

export default function App() {
  // Navigation
  const [page, setPage] = useState<PageType>("home");
  const [previousPage, setPreviousPage] = useState<PageType>("home");
  
  // Game forensic state
  const [clues, setClues] = useState<Clue[]>([]);
  const [toast, setToast] = useState<Clue | null>(null);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [menuOverlayOpen, setMenuOverlayOpen] = useState(false);
  const [endingOutcome, setEndingOutcome] = useState<"correct" | "wrong">("correct");

  // Settings configs
  const [vhsStrength, setVhsStrength] = useState<"weak" | "medium" | "strong" | "off">("strong");
  const [soundOn, setSoundOn] = useState(true);
  const [autoLog, setAutoLog] = useState(true);

  // Sound triggers
  const triggerSound = (type: "click" | "clue" | "alert") => {
    if (soundOn) {
      playSyntheticChirp(type);
    }
  };

  // Safe navigation wrapper with audio chime
  const navigate = (nextPage: PageType) => {
    triggerSound("click");
    if (nextPage === "menu") {
      setPreviousPage(page);
      setMenuOverlayOpen(true);
    } else {
      setPage(nextPage);
    }
  };

  // Save forensic discoveries
  const addClue = (clue: Clue) => {
    setClues((prev) => {
      const exists = prev.some((c) => c.id === clue.id);
      if (exists) {
        triggerSound("click");
        return prev;
      }
      
      triggerSound("clue");
      setToast(clue);
      return [...prev, clue];
    });
  };

  const handleResetClues = () => {
    triggerSound("alert");
    setClues([]);
    setToast(null);
    setPage("home");
  };

  const handleSelectEnding = (outcome: "correct" | "wrong") => {
    triggerSound("clue");
    setEndingOutcome(outcome);
    setPage("ending");
  };

  return (
    <div className="relative min-h-screen select-none overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* 1. Universal Audio Feedback on any click */}
      <div 
        onClick={() => triggerSound("click")}
        className="contents"
      >
        {/* 2. Atmospheric Background Video & Cyber Radar sweep */}
        <BackgroundEffect isPlayingVideo={page === "home"} />

        {/* 3. Horizontal scanline CRT filters */}
        <VhsLayer vhsStrength={vhsStrength} />

        {/* 4. Persistent HUD Header */}
        {page !== "home" && page !== "menu" && page !== "ending" && (
          <Hud 
            onOpenMenu={() => navigate("menu")}
            onOpenNotebook={() => {
              triggerSound("click");
              setNotebookOpen(true);
            }}
            cluesCount={clues.length}
            totalClues={5}
          />
        )}

        {/* 5. Fluid View Routing via AnimatePresence */}
        <main className="relative z-10 mx-auto min-h-screen px-4 py-28 sm:px-6 md:px-8">
          <AnimatePresence mode="wait">
            {page === "home" && (
              <Home key="home" onNavigate={navigate} clues={clues} />
            )}
            {page === "roomSelect" && (
              <RoomSelect key="roomSelect" onNavigate={navigate} clues={clues} />
            )}
            {page === "room1" && (
              <RoomOne key="room1" onNavigate={navigate} clues={clues} addClue={addClue} />
            )}
            {page === "room2" && (
              <RoomTwo key="room2" onNavigate={navigate} clues={clues} addClue={addClue} />
            )}
            {page === "devNote" && (
              <DevNote key="devNote" onBack={() => navigate("home")} />
            )}
            {page === "settings" && (
              <SettingsPage 
                key="settings" 
                onBack={() => navigate("home")}
                vhsStrength={vhsStrength}
                setVhsStrength={setVhsStrength}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                autoLog={autoLog}
                setAutoLog={setAutoLog}
                onResetClues={handleResetClues}
              />
            )}
            {page === "accusation" && (
              <Accusation 
                key="accusation" 
                onSelectEnding={handleSelectEnding}
                onBack={() => navigate("roomSelect")} 
              />
            )}
            {page === "ending" && (
              <Ending 
                key="ending" 
                outcome={endingOutcome} 
                onReset={handleResetClues} 
              />
            )}
          </AnimatePresence>
        </main>

        {/* 6. Forensic Evidence notebook overlay */}
        <AnimatePresence>
          {notebookOpen && (
            <Notebook 
              clues={clues} 
              totalCluesCount={5}
              onClose={() => {
                triggerSound("click");
                setNotebookOpen(false);
              }} 
            />
          )}
        </AnimatePresence>

        {/* 7. Slideout Menu drawer overlays */}
        <AnimatePresence>
          {menuOverlayOpen && (
            <MenuOverlay 
              onNavigate={navigate} 
              onClose={() => {
                triggerSound("click");
                setMenuOverlayOpen(false);
              }} 
            />
          )}
        </AnimatePresence>

        {/* 8. Forensic Notification banner toasts */}
        <ClueToast clue={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
}
