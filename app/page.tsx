"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Loader2, Radar
} from "lucide-react";

// --- DATA REPOSITORY (UNTOUCHED) ---
const PROFILE = {
  name: "Arpita Mishra",
  summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Architect of end-to-end ML pipelines spanning embedding generation, vector search optimization, and production deployment.",
  cgpa: "8.11 (Dean's List - Top 15%)",
  matric: "93.8%",
  inter: "84.8%",
  phone: "+91-8140006314",
  email: "arpitamishra2755@gmail.com"
};

const SKILLS = [
  { title: "Core Processors", icon: <Code className="text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural & GenAI", icon: <Brain className="text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness", "TF-IDF"] },
  { title: "Targeting (CV)", icon: <Eye className="text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration", "RetinaFace", "FaceNet"] },
  { title: "Cloud & Support", icon: <Server className="text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
];

const PROJECTS = [
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating hallucination through semantic grounding in 700+ verse embeddings using FAISS L2-normalized search (0.45 threshold) and mean-confidence calibration.", tags: ["FAISS", "MiniLM", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "NLP system converting patient queries into healthcare appointment slots. Implemented hierarchical recommendation strategy mapping user intent to urgency levels with 80%+ accuracy using synthetic datasets and TF-IDF.", tags: ["Scikit-learn", "TF-IDF", "Streamlit"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability in LLMs without requiring labeled ground truth. Enforced inference determinism via temperature and token limit control.", tags: ["distilgpt2", "HuggingFace", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second multi-face identification using RetinaFace and FaceNet. Built a modular AI engine decoupled from Flask routes, supporting automatic FAISS index rebuilding and attendance analytics.", tags: ["RetinaFace", "FaceNet", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack reservation platform using queue-based seat allocation (deque) to prevent race conditions. Implemented secure session management and automated notifications with a structured Git CI/CD workflow.", tags: ["Flask", "MySQL", "System Design"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Unsupervised NLP clustering pipeline discovering latent semantic speech patterns using contextual MiniLM embeddings and UMAP dimensionality reduction (384 to 2) followed by KMeans (k=3).", tags: ["UMAP", "KMeans", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Siamese-style face verification pipeline using frozen FaceNet embeddings and custom Euclidean similarity layer. Achieved 100% recall on fixed evaluation pairs via systematic similarity threshold calibration.", tags: ["TensorFlow", "Keras", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends.", link: "https://forage-link.com" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities; applied inclusive teaching strategies.", link: null },
  { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash coding hackathon; coordinated full-stack development workshops.", link: null }
];

const ACHIEVEMENTS = [
  { title: "Team Leader - SIH 2024", desc: "Led 6-member team to build 'Aqua Quest', address groundwater conservation via educational web game (HTML/CSS/JS + Firebase)." },
  { title: "1st Runner-Up - Speak & Spark", desc: "Creativity Challenge, LPU CPE. Built functional tech prototype under a 15-minute constraint." }
];

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "GenAI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025", link: "https://infosys.com" },
  { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://nptel.ac.in" }
];

const EDUCATION = [
  { title: "B.Tech CSE", school: "LPU", score: "8.11 CGPA", date: "2023 - 2027", detail: "Dean's List - Top 15% of University Batch" },
  { title: "Intermediate", school: "Lions School", score: "84.8%", date: "2023", detail: "PCM Distinction" },
  { title: "Matriculation", school: "Lions School", score: "93.8%", date: "2021", detail: "Distinction" }
];

const CONTACT_LINKS = [
  { icon: <Mail />, label: "Email", link: `mailto:${PROFILE.email}`, color: "hover:bg-red-500" },
  { icon: <Linkedin />, label: "LinkedIn", link: "https://linkedin.com/in/arpita2755", color: "hover:bg-blue-600" },
  { icon: <Github />, label: "GitHub", link: "https://github.com/Arpita-2755", color: "hover:bg-gray-700" },
  { icon: <Code />, label: "LeetCode", link: "https://leetcode.com/u/Arpita_2755/", color: "hover:bg-orange-500" },
  { icon: <BookOpen />, label: "Medium", link: "https://medium.com/@arpitamishra2755", color: "hover:bg-green-600" },
  { icon: <Twitter />, label: "X", link: "https://x.com/ArpitaM_2755", color: "hover:bg-sky-500" },
  { icon: <Phone />, label: "Call", link: `tel:${PROFILE.phone}`, color: "hover:bg-stark-cyan hover:text-black" }
];

const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "10th", "12th", "dean"], response: "Arpita holds an 8.11 CGPA at LPU (Top 15%, Dean's List). Schooling: 93.8% in 10th and 84.8% in 12th at Lions English School." },
  { keywords: ["slot", "healthcare", "synthetic"], response: "The Slot Recommender uses synthetic patient datasets and TF-IDF extraction with Logistic Regression to achieve 80%+ intent accuracy." },
  { keywords: ["routemate", "bus", "deque", "race"], response: "RouteMate prevents race conditions in bus bookings using a queue-based seat allocation (deque). Built with Flask/MySQL." },
  { keywords: ["gitarag", "embeddings", "0.45"], response: "GitaRAG indexes 700+ verse embeddings using FAISS L2-normalization with a 0.45 threshold and mean-confidence calibration." },
  { keywords: ["who", "arpita"], response: "Arpita Mishra is an ML Engineer and Visionary Architect specializing in reliability-driven AI on the MARK-85 protocol." }
];

// --- ADVANCED UI COMPONENTS ---

const CustomCursor = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className={`fixed top-0 left-0 w-10 h-10 border-[1px] rounded-full pointer-events-none z-[1000] hidden lg:flex items-center justify-center ${isDark ? 'border-stark-cyan/50' : 'border-stark-red/50'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'} animate-ping`} />
    </motion.div>
  );
};

const TiltCard = ({ children, className, isDark }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX);
  const springY = useSpring(rotateY);

  return (
    <motion.div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }} 
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`group relative ${className}`}
    >
      {/* THE ENERGY BEAM ENHANCEMENT */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] opacity-0 group-hover:w-3/4 group-hover:opacity-100 transition-all duration-500 z-20 ${isDark ? 'bg-stark-cyan shadow-[0_0_15px_#22d3ee]' : 'bg-stark-red shadow-[0_0_15px_#ef4444]'}`} />
      {children}
    </motion.div>
  );
};

const TypewriterHero = () => {
  const [text, setText] = useState("");
  const fullText = "Initializing Protocol: Arpita Mishra... Mark-85 Neural Core active... Target: Awe-Struck Level UI...";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => { setText(fullText.slice(0, i)); i++; if (i > fullText.length) clearInterval(timer); }, 30);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-[10px] md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5 max-w-xl mx-auto mb-10">
      <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>{text}<span className="animate-pulse">_</span>
    </div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-44 h-44 flex items-center justify-center mb-10 mx-auto">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'border-stark-red shadow-[0_0_50px_#ef4444]'}`} />
    <div className={`w-30 h-30 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
        className={`w-20 h-20 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_80px_#22d3ee]' : 'bg-stark-red shadow-[0_0_80px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} size={32} />
      </motion.div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Protocol Online. Ask me about Arpita's missions." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase(); setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Segment not found. Accessing GitHub for logs." }]);
    }, 450);
  };

  const handleDownload = () => {
    setIsScanning(true);
    setTimeout(() => { setIsScanning(false); window.open('/Arpita_Mishra_CV.pdf', '_blank'); }, 3000);
  };

  const scrollTo = (id: string) => { setIsSidebarOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className={`relative min-h-screen transition-all duration-700 ${isDark ? 'bg-[#010409] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      <CustomCursor isDark={isDark} />
      
      {/* 1. SIDEBAR */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-110 shadow-2xl transition-all"><Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /></button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -350 }} animate={{ x: 0 }} exit={{ x: -350 }} className={`fixed top-0 left-0 h-full w-80 z-[210] border-r backdrop-blur-3xl p-12 flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-12 opacity-50"><X /></button>
            <div className="space-y-10">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-xl font-black uppercase tracking-[0.4em] hover:text-stark-cyan transition-all hover:translate-x-4">{item}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BIOMETRIC OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-10 text-center">
            <Scan className="text-stark-cyan w-32 h-32 animate-pulse mb-8" />
            <h4 className="text-3xl font-black uppercase tracking-[0.4em] text-stark-cyan mb-4">Decrypting Identity...</h4>
            <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden"><motion.div className="h-full bg-stark-cyan" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:rotate-180 transition-all">{isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}</button>

      {/* 4. EHA CHAT (With Holographic Glow) */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[500px] border backdrop-blur-3xl rounded-2xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'bg-white/95 border-stark-red/40 shadow-black/20'}`}>
              <div className={`p-5 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10 text-stark-cyan' : 'bg-stark-red/10 border-gray-200 text-stark-red'}`}><span className="text-xs font-mono tracking-widest uppercase flex items-center gap-3"><Cpu size={16} /> Eha Intelligence</span><button onClick={() => setIsEhaOpen(false)}>×</button></div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide text-[11px] font-mono leading-relaxed">{chatHistory.map((msg, i) => (<div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] p-4 rounded-xl ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 shadow-sm')}`}>{msg.text}</div></div>))}</div>
              <form onSubmit={handleEhaChat} className="p-5 border-t border-white/10 flex gap-3"><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query Eha..." className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none rounded-lg" /><button type="submit" className={`px-5 py-2 rounded-lg ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={16} /></button></form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan shadow-stark-cyan/40' : 'bg-stark-red shadow-stark-red/40'}`}><MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} /></button>
      </div>

      {/* 5. HERO SECTION (Arc Pulse Name) */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1.5em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 // Online</h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-12 uppercase select-none">
            ARPITA 
            <motion.span 
              animate={{ textShadow: isDark ? ["0 0 5px #ef4444", "0 0 25px #ef4444", "0 0 5px #ef4444"] : [] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className={`ml-6 ${isDark ? 'text-stark-red' : 'text-stark-gold'}`}
            >
              MISHRA
            </motion.span>
          </h1>
          <TypewriterHero />
          <div className="flex flex-wrap gap-6 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-16 py-6 font-black uppercase tracking-widest text-xs transition-all border-b-8 rounded-2xl ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 shadow-xl' : 'bg-stark-gold border-amber-900 text-white hover:bg-amber-500 shadow-xl'}`}>Identity Protocol</button>
            <button onClick={handleDownload} className={`px-16 py-6 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-2xl ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10' : 'border-stark-red text-stark-red hover:bg-stark-red/10 shadow-xl'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* 6. ABOUT (With Node Pulse) */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <TiltCard isDark={isDark} className="relative">
            <div className={`absolute -inset-8 border border-dashed animate-[spin_30s_linear_infinite] rounded-3xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-3xl shadow-2xl ${isDark ? 'grayscale brightness-75 hover:grayscale-0' : ''}`} />
          </TiltCard>
          <div className="space-y-10 text-xl font-light">
            <p className="italic font-bold text-4xl leading-tight">"Efficiency is the only currency. Failure is just a neural adjustment."</p>
            <p>{PROFILE.summary}</p>
            <p>Inspired by the Stark Legacy, I architect Intelligent Armor for Data. My focus is RAG and Computer Vision, bridging raw data and actionable truth.</p>
            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-white/10 text-center">
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Missions</p></div>
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">CGPA</p></div>
              <div><p className="text-5xl font-black text-green-500">100%</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-5xl font-black text-center uppercase mb-20 tracking-tighter">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} isDark={isDark} className={`p-10 border rounded-3xl transition-all ${isDark ? 'bg-[#0a0a0a] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 shadow-2xl'}`}>
              <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.3em]">{cat.title}</span></div>
              <div className="flex flex-wrap gap-3">{cat.skills.map(s => <span key={s} className={`px-4 py-2 text-[10px] font-mono rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 8. EXPERIENCE */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <h4 className="text-5xl font-black uppercase text-center mb-24 tracking-tighter">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr] gap-12 group">
              <div className={`font-mono border-t-4 pt-8 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}><span className="text-4xl font-black tracking-tighter">{exp.date}</span></div>
              <div className="border-l-2 border-white/10 pl-14 pb-16 text-left relative">
                <div className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} />
                <h5 className="text-4xl font-black uppercase mb-2 group-hover:text-stark-cyan transition-all duration-500">{exp.role}</h5>
                <h6 className={`font-mono text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-xl font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. PROJECTS (Missions) */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-5xl font-black text-center uppercase mb-24 tracking-tighter">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} isDark={isDark} className={`p-12 flex flex-col h-full border-2 transition-all rounded-[2.5rem] overflow-hidden ${isDark ? 'bg-[#050505] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-100 shadow-2xl'}`}>
              <span className={`font-mono text-[10px] mb-8 uppercase tracking-[0.6em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mission_Log_v{100+i}</span>
              <h5 className="text-3xl font-black uppercase mb-6 group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-base font-light mb-12 flex-1 italic opacity-70 group-hover:opacity-100">"{p.description}"</p>
              <div className="flex flex-wrap gap-3 mb-12">{p.tags.map(t => <span key={t} className={`text-[11px] px-4 py-1.5 border font-mono rounded-lg ${isDark ? 'border-white/10 bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{t}</span>)}</div>
              <div className="flex gap-12 border-t border-white/10 pt-12 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-[1.8]"><Github size={28} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-[1.8]"><Globe size={28} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-all hover:scale-[1.8]"><BookOpen size={28} /></a>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="mt-32 text-center p-24 border-4 border-dashed border-white/5 rounded-[4rem] group hover:border-stark-cyan/20 transition-all relative">
          <h4 className="text-5xl font-black mb-8 uppercase tracking-tight">Open Global Database</h4>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-20 py-8 font-black uppercase rounded-3xl transition-all relative z-10 text-lg ${isDark ? 'bg-white text-black hover:bg-stark-cyan hover:shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Access Mainframe</a>
        </div>
      </section>

      {/* 10. COMMENDATIONS */}
      <section className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-4xl font-black uppercase flex items-center gap-6"><Trophy className="text-stark-gold" size={40} /> Commendations</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-12 border-l-[16px] rounded-4xl transition-all ${isDark ? 'bg-[#080808] border-stark-gold' : 'bg-white shadow-2xl border-amber-500'}`}>
                <h5 className="text-3xl font-black uppercase mb-4 tracking-tighter">{ach.title}</h5>
                <p className={`text-xl italic font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-fit">
            <h4 className="text-4xl font-black uppercase col-span-full flex items-center gap-6"><Award className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={40} /> System Upgrades</h4>
            {CERTIFICATES.map((cert, i) => (
              <TiltCard key={i} isDark={isDark} className={`p-10 border-2 rounded-[2rem] transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50 shadow-2xl' : 'bg-white border-gray-200 shadow-2xl'}`}>
                <h5 className={`text-xs font-mono uppercase mb-4 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
                <p className="text-sm font-black uppercase leading-tight mb-8 tracking-tighter">{cert.title}</p>
                <a href={cert.link} target="_blank" className="text-[10px] font-mono opacity-30 group-hover:opacity-100 flex items-center gap-3">Verify_Encryption <ChevronRight size={14} /></a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EDUCATION */}
      <section id="education" className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-24 tracking-tighter flex items-center justify-center gap-8"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={50} /> Academic Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
            {EDUCATION.map((edu, i) => (
              <TiltCard key={i} isDark={isDark} className={`p-16 border-t-[14px] rounded-[3rem] transition-all ${isDark ? `bg-white/5 border-stark-cyan shadow-[0_0_40px_rgba(34,211,238,0.1)]` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-3xl font-black uppercase mb-2">{edu.title}</h5>
                <p className="text-xs font-mono mb-8 opacity-50">{edu.school} // {edu.date}</p>
                <p className={`text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
                <p className={`text-xs font-bold px-4 py-2 border inline-block ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`}>{edu.detail}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEXUS */}
      <section id="nexus" className="py-32 px-6 border-t border-white/5 bg-black text-center">
        <h4 className="text-6xl font-black uppercase mb-24 flex items-center justify-center gap-10 tracking-tighter"><Target className="text-stark-red w-16 h-16" /> Establish Uplink</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
          {CONTACT_LINKS.map((s, i) => (
            <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-8 p-12 border rounded-[2.5rem] transition-all bg-white/[0.02] border-white/10 hover:bg-white/5 group shadow-2xl`}>
              <div className={`transition-all duration-500 scale-[2] group-hover:scale-[2.5] group-hover:text-stark-cyan`}>{s.icon}</div>
              <span className="text-[10px] font-mono mt-6 opacity-40 group-hover:opacity-100 uppercase tracking-widest">{s.label}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[1.2em] opacity-50 border-t border-white/5">Arpita Mishra // Eha v5.0 Prestige</footer>
    </main>
  );
}