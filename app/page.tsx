"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background Decorative Element: The Arc Reactor Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stark-blue/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="p-1 border-2 border-dashed border-stark-cyan rounded-full"
          >
            <div className="p-4 bg-stark-blue/10 rounded-full border border-stark-cyan shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Zap className="w-12 h-12 text-stark-cyan" />
            </div>
          </motion.div>
        </div>

        <h2 className="text-stark-cyan font-mono text-sm tracking-[0.3em] mb-2 uppercase">
          System Status: Online
        </h2>
        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
          ARPITA <span className="text-stark-red">MISHRA</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8">
          Machine Learning Engineer | GenAI Specialist | Stark Industries Enthusiast
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-stark-red text-white font-bold rounded-sm border-b-4 border-red-800 hover:bg-red-500 transition-all uppercase tracking-widest text-sm">
            View Missions
          </button>
          <button className="px-8 py-3 border border-stark-cyan text-stark-cyan font-bold rounded-sm hover:bg-stark-cyan/10 transition-all uppercase tracking-widest text-sm">
            Download Dossier
          </button>
        </div>
      </motion.div>

      {/* Bottom HUD Bar */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] text-stark-cyan/50 uppercase tracking-[0.2em]">
        <div className="flex gap-8">
          <div>Lat: 22.6708° N</div>
          <div>Long: 71.5724° E</div>
        </div>
        <div className="animate-pulse">Neural Link Stable</div>
      </div>
    </main>
  );
}