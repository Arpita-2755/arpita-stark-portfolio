"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Search, Terminal as TerminalIcon, Info
} from "lucide-react";

// --- DATA: INPUT YOUR REAL LINKS HERE ---
const CONTACT_LINKS = {
  email: "mailto:arpitamishra2755@gmail.com",
  linkedin: "https://linkedin.com/in/arpita2755",
  github: "https://github.com/Arpita-2755",
  leetcode: "https://leetcode.com/u/Arpita_2755/",
  medium: "https://medium.com/@arpitamishra2755",
  x: "https://x.com/your_handle", // Replace this
  contact: "+91-8140006314"
};

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/...", date: "Sept 2025" },
  { title: "SQL (Advanced)", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/...", date: "Sept 2025" },
  { title: "Generative AI & Prompt Engineering", issuer: "Infosys", link: "https://infosys-link.com", date: "Aug 2025" },
  { title: "Privacy & Security in Social Media (Elite)", issuer: "NPTEL", link: "https://nptel.ac.in/noc/Ecertificate/...", date: "April 2025" }
];

// --- JARVIS KNOWLEDGE BASE (Simple RAG-like Logic) ---
const JARVIS_KB = [
  { keywords: ["skill", "stack", "know", "language"], response: "Arpita's core processors include Python, C++, and SQL. Her neural architecture is optimized for GenAI, RAG systems, and Computer Vision using TensorFlow and FAISS." },
  { keywords: ["gitarag", "gita", "rag"], response: "GitaRAG is one of Arpita's flagship missions. It's a hallucination-resistant system using extractive RAG to ground LLM responses in religious scripture." },
  { keywords: ["experience", "deloitte", "work"], response: "Operational history shows a Data Analytics tenure at Deloitte Australia and leadership roles at GitHub Students Club, LPU." },
  { keywords: ["contact", "email", "reach", "hire"], response: "You can establish a secure link via email at arpitamishra2755@gmail.com or via the LinkedIn uplink in the Nexus section." },
  { keywords: ["who", "arpita", "mishra"], response: "Arpita Mishra is a Machine Learning Engineer specializing in retrieval systems and representation learning. She is currently running on the MARK-2755 Protocol." }
];

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "jarvis", text: "Systems online. I am JARVIS. How can I assist you with Ms. Mishra's database today?" }]);
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // JARVIS Logic
  const handleJarvisChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.toLowerCase();
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      const match = JARVIS_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      const response = match ? match.response : "Query not found in current archives. Accessing external GitHub mainframe... Arpita has 20+ other repositories you might want to check.";
      setChatHistory(prev => [...prev, { role: "jarvis", text: response }]);
    }, 600);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white selection:bg-stark-cyan selection:text-black overflow-x-hidden font-sans">
      
      {/* 1. HUD OVERLAY (The Stark Vibe) */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[20px] border-white/5 opacity-20" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stark-cyan to-transparent opacity-50 z-50 shadow-[0_0_10px_#22d3ee]" />

      {/* 2. JARVIS CHAT WIDGET (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isJarvisOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="mb-4 w-80 h-96 bg-black/90 border border-stark-cyan/30 backdrop-blur-xl rounded-lg flex flex-col shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-white/10 bg-stark-cyan/10 flex justify-between items-center">
                <span className="text-[10px] font-mono text-stark-cyan tracking-widest uppercase flex items-center gap-2">
                  <TerminalIcon className="w-3 h-3" /> Jarvis_v4.2.lnk
                </span>
                <button onClick={() => setIsJarvisOpen(false)} className="text-white/40 hover:text-white">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-2 rounded-sm text-[11px] font-mono ${msg.role === "user" ? "bg-stark-red/20 border border-stark-red/30" : "bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleJarvisChat} className="p-2 border-t border-white/10 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask JARVIS..." className="flex-1 bg-white/5 border border-white/10 p-2 text-[10px] focus:outline-none focus:border-stark-cyan" />
                <button type="submit" className="p-2 bg-stark-cyan text-black rounded-sm"><Send className="w-3 h-3" /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsJarvisOpen(!isJarvisOpen)} className="w-14 h-14 bg-stark-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_#22d3ee] hover:scale-110 transition-transform">
          <MessageSquare className="text-black w-6 h-6" />
        </button>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stark-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-stark-cyan font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60">System Online // Mark 2755</h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-8">
            ARPITA <span className="text-stark-red relative">MISHRA
              <span className="absolute -top-4 -right-8 text-[10px] font-mono text-white/20 tracking-normal italic leading-none">AI_REVOLUTION_v4</span>
            </span>
          </h1>
          <div className="flex gap-4 justify-center">
            <button onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-4 bg-stark-red text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all border-b-4 border-red-900 active:border-b-0">Initialize Identity</button>
            <button onClick={() => document.getElementById('nexus')?.scrollIntoView({behavior:'smooth'})} className="px-10 py-4 border border-stark-cyan text-stark-cyan font-black uppercase tracking-widest text-xs hover:bg-stark-cyan/10 transition-all">Establish Uplink</button>
          </div>
        </motion.div>
      </section>

      {/* 4. IDENTITY SCAN (Detailed About Me) */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-stark-cyan/30 animate-pulse pointer-events-none" />
            <div className="absolute -inset-1 border border-stark-red/30 animate-ping pointer-events-none" />
            <img src="/arpita.jpg" alt="Arpita Mishra" className="w-full grayscale hover:grayscale-0 transition-all duration-700 rounded-sm shadow-2xl" />
            <div className="absolute top-4 left-4 p-2 bg-black/60 border border-stark-cyan/40 font-mono text-[8px] text-stark-cyan uppercase tracking-tighter">
              Subject: A. Mishra <br /> Status: Active Intern
            </div>
          </div>
          <div>
            <h3 className="text-stark-cyan font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <User className="w-4 h-4" /> Identity Protocol
            </h3>
            <h4 className="text-5xl font-black uppercase tracking-tighter mb-8">The Story of MARK-2755</h4>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg italic">
              <p>
                "Some people call me an Engineer. Some call me a Visionary. I just call myself someone who hates inefficient code." 
              </p>
              <p className="not-italic text-white/80">
                Driven by the same relentless innovation that defines Stark Industries, I have dedicated my career to building "intelligent armor" for data. My journey started with a fascination for how machines see the world, which led me to specialize in **Computer Vision and Retrieval-Augmented Generation (RAG)**.
              </p>
              <p className="not-italic text-white/80">
                Whether I'm engineering hallucination-resistant pipelines for sacred scriptures (**GitaRAG**) or architecting sub-second face recognition systems for campus security, I believe every project is a "Mission." I don't just build models; I build robust, reliability-focused systems that bridge the gap between human curiosity and artificial precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE NEXUS (Socials & Contacts) */}
      <section id="nexus" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-4xl font-black uppercase tracking-tighter mb-16 flex items-center justify-center gap-4">
            <Target className="text-stark-red w-10 h-10" /> The Global Nexus
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: <Mail />, label: "Email", link: CONTACT_LINKS.email, color: "hover:bg-red-500" },
              { icon: <Linkedin />, label: "LinkedIn", link: CONTACT_LINKS.linkedin, color: "hover:bg-blue-600" },
              { icon: <Github />, label: "GitHub", link: CONTACT_LINKS.github, color: "hover:bg-gray-700" },
              { icon: <Code />, label: "LeetCode", link: CONTACT_LINKS.leetcode, color: "hover:bg-orange-500" },
              { icon: <BookOpen />, label: "Medium", link: CONTACT_LINKS.medium, color: "hover:bg-green-600" },
              { icon: <Twitter />, label: "X / Twitter", link: CONTACT_LINKS.x, color: "hover:bg-sky-500" },
              { icon: <Zap />, label: "Contact", link: `tel:${CONTACT_LINKS.contact}`, color: "hover:bg-stark-cyan hover:text-black" },
            ].map((social, i) => (
              <a key={i} href={social.link} target="_blank" className={`flex flex-col items-center gap-3 p-6 border border-white/10 transition-all ${social.color} group`}>
                <div className="group-hover:scale-125 transition-transform">{social.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ACADEMIC MAINFRAME */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <h4 className="text-3xl font-black uppercase tracking-tighter mb-16 flex items-center gap-4">
          <GraduationCap className="text-stark-cyan w-8 h-8" /> Academic Mainframe
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border-l-4 border-stark-cyan bg-white/5">
            <span className="font-mono text-[10px] text-stark-cyan">2023 - 2027</span>
            <h5 className="text-xl font-black uppercase mt-2">B.Tech CSE</h5>
            <p className="text-sm text-gray-400">Lovely Professional University</p>
            <p className="mt-4 text-stark-cyan font-bold">CGPA: 8.11 // Top 15%</p>
          </div>
          <div className="p-8 border-l-4 border-white/20 bg-white/5">
            <span className="font-mono text-[10px] text-gray-500">2022 - 2023</span>
            <h5 className="text-xl font-black uppercase mt-2">Intermediate</h5>
            <p className="text-sm text-gray-400">Lions English School</p>
            <p className="mt-4 text-white/60 font-bold">Percentage: 84.8%</p>
          </div>
          <div className="p-8 border-l-4 border-white/20 bg-white/5">
            <span className="font-mono text-[10px] text-gray-500">2020 - 2021</span>
            <h5 className="text-xl font-black uppercase mt-2">Matriculation (10th)</h5>
            <p className="text-sm text-gray-400">Lions English School</p>
            <p className="mt-4 text-white/60 font-bold">Percentage: 93.8%</p>
          </div>
        </div>
      </section>

      {/* 7. SYSTEM UPGRADES (CERTIFICATES) */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <h4 className="text-3xl font-black uppercase tracking-tighter mb-16 flex items-center justify-center gap-4">
          <Award className="text-stark-gold w-8 h-8" /> System Upgrades
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATES.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" className="p-6 border border-white/10 bg-white/[0.02] hover:bg-stark-gold/10 hover:border-stark-gold/50 transition-all text-center group">
              <h5 className="text-[10px] font-mono text-stark-gold uppercase mb-2">{cert.issuer}</h5>
              <p className="text-xs font-bold uppercase leading-tight mb-4">{cert.title}</p>
              <div className="text-[9px] font-mono text-white/30 group-hover:text-white flex items-center justify-center gap-2">
                <FileCheck className="w-3 h-3" /> VERIFY_SYSTEM_UPGRADE
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em] border-t border-white/5">
        Arpita Mishra // Jarvis Protocol v4.5 // Silvassa, India
      </footer>
    </main>
  );
}