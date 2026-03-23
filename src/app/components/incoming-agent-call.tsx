"use client";

import { useState, useEffect } from "react";
import { Phone, X, Bot, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncomingAgentCallProps {
  liveTariff: number;
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingAgentCall({ liveTariff, onAccept, onReject }: IncomingAgentCallProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    console.log("[IncomingAgentCall] Checking condition. liveTariff =", liveTariff);
    
    // Only trigger if tariff is high (threshold > 20)
    if (liveTariff <= 20) {
      console.log("[IncomingAgentCall] liveTariff <= 20, aborting show.");
      return;
    }

    // Check cooldown to avoid disturbing user frequently
    const lastCall = localStorage.getItem("last_agent_call");
    console.log("[IncomingAgentCall] lastCall in storage =", lastCall);
    if (lastCall) {
      // 10 seconds cooldown for testing (instead of 1 hour)
      const secondsSince = (Date.now() - parseInt(lastCall)) / 1000;
      console.log("[IncomingAgentCall] secondsSince last call =", secondsSince);
      if (secondsSince < 10) {
        console.log("[IncomingAgentCall] Cooldown active, aborting show.");
        return;
      }
    }

    console.log("[IncomingAgentCall] All conditions met. Waiting 2s to show popup...");

    // Wait 2 seconds before showing the call
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      
      // Ringing timeout (30 seconds)
      const ringTimeout = setTimeout(() => {
        setIsVisible(false);
        handleEnd(); // Store cooldown even if missed
      }, 30000);

      return () => clearTimeout(ringTimeout);
    }, 2000);

    return () => clearTimeout(showTimeout);
  }, [liveTariff]);

  const handleEnd = () => {
    localStorage.setItem("last_agent_call", Date.now().toString());
  };

  const handleAccept = () => {
    setIsVisible(false);
    handleEnd();
    onAccept();
  };

  const handleReject = () => {
    setIsVisible(false);
    handleEnd();
    onReject();
  };

  useEffect(() => {
    if (!isVisible) return;

    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();

    const playTone = () => {
      if (ctx.state === "closed") return;
      
      // Approximate iPhone "Marimba" style percussive ringtone
      const notes = [
        659.25, // E5
        587.33, // D5
        440.00, // A4
        392.00, // G4
        329.63, // E4
        440.00, // A4
        587.33, // D5
        392.00, // G4
        659.25, // E5
      ];

      const now = ctx.currentTime;
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Using sine and a sharp decay for that bell/marimba feel
        osc.type = "sine";
        osc.frequency.value = freq;
        
        // Attack & percussive decay envelope
        const startTime = now + i * 0.15;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.6, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.14);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.15);
      });
    };

    // Play immediately, then loop every 3 seconds (1.35s play, 1.65s pause)
    playTone();
    const interval = setInterval(playTone, 3000);

    return () => {
      clearInterval(interval);
      ctx.close().catch(console.error);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-6 pointer-events-auto">
      {/* Backdrop (Light mode aware) */}
      <div className="absolute inset-0 bg-slate-900/90 dark:bg-[#0a0f1a]/95 backdrop-blur-md transition-opacity duration-700" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-10 w-full h-full animate-in fade-in zoom-in-95 duration-500">
        
        {/* The expanding circle / Avatar area */}
        <div
          className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          style={{
            width: 220,
            height: 220,
            boxShadow: `0 0 50px 10px rgba(52,211,153,0.35)`,
            transition: "box-shadow 90ms ease-out",
          }}
        >
          {/* Orbit rings */}
          <span className="absolute rounded-full border border-emerald-400/50 pointer-events-none" style={{ width: 290, height: 290, animation: "incomingAgentPing 2.0s cubic-bezier(0,0,0.2,1) infinite" }} />
          <span className="absolute rounded-full border border-emerald-400/30 pointer-events-none" style={{ width: 370, height: 370, animation: "incomingAgentPing 2.7s cubic-bezier(0,0,0.2,1) infinite", animationDelay: "0.35s" }} />
          <span className="absolute rounded-full border border-emerald-400/20 pointer-events-none" style={{ width: 460, height: 460, animation: "incomingAgentPing 3.4s cubic-bezier(0,0,0.2,1) infinite", animationDelay: "0.7s" }} />

          {/* Inner face */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="text-white drop-shadow flex items-center justify-center text-6xl">
              🤖
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-2 mt-10">
          <h2 className="text-white text-3xl font-bold tracking-wide animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            BetaVolt Agent Calling...
          </h2>
          <div className="flex items-center gap-2 mt-2 px-4 py-2 bg-red-500/20 text-red-100 rounded-lg border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-base">High Grid Tariff Alert: ₹{liveTariff.toFixed(2)}/unit</span>
          </div>
          <p className="text-slate-300 font-medium mt-2 text-lg">Accept call to optimize your appliances and reduce the bill.</p>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-12">
          <button
            onClick={handleReject}
            className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 border-none cursor-pointer flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] hover:scale-110 transition-all duration-300"
            title="Decline"
          >
            <X className="w-8 h-8 text-white" strokeWidth={3} />
          </button>

          <button
            onClick={handleAccept}
            className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-600 border-none cursor-pointer flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] hover:scale-110 transition-all duration-300 animate-[bounce_2s_infinite]"
            title="Accept"
          >
            <Phone className="w-8 h-8 text-white fill-current" />
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes incomingAgentPing {
          0% { transform: scale(0.8); opacity: 0; }
          5% { opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
