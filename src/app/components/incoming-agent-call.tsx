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
    
    // Only trigger if tariff is high (threshold > 25)
    if (liveTariff <= 25) {
      console.log("[IncomingAgentCall] liveTariff <= 25, aborting show.");
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

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-[99999] animate-in slide-in-from-top-4 fade-in zoom-in-95 duration-300">
      <div className="w-[340px] bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-4 flex flex-col gap-4 text-white relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex gap-3 items-start relative z-10">
          <div className="relative">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-slate-900 rounded-full" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5">
              BetaVolt Agent
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider animate-pulse border border-emerald-500/30">
                Calling
              </span>
            </h3>
            <div className="text-xs text-slate-300 mt-1.5 flex flex-col gap-1 leading-relaxed bg-slate-800/50 p-2 rounded-lg border border-slate-800">
              <span className="flex items-start gap-1.5 text-amber-300 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                High tariff detected: ₹{liveTariff.toFixed(2)}/unit
              </span>
              <span className="text-slate-400 ml-5">
                I have suggestions to optimize devices and save electricity.
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-1 relative z-10">
          <Button 
            variant="destructive" 
            className="flex-1 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 shadow-none h-11 transition-all"
            onClick={handleReject}
          >
            <X className="w-4 h-4 mr-2" /> Decline
          </Button>
          <Button 
            className="flex-[1.5] rounded-xl bg-emerald-500 hover:bg-emerald-600 border-none shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] text-white h-11 transition-all hover:-translate-y-0.5 font-bold"
            onClick={handleAccept}
          >
            <Phone className="w-4 h-4 mr-2 fill-current" /> Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
