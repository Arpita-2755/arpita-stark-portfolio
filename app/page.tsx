"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Radar, BarChart3
} from "lucide-react";

// --- THE IMMUTABLE DATA MAINFRAME ---
const PROFILE = {
  name: "Arpita Mishra",
  summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and production deployment.",
  cgpa: "8.11 (Dean's List - Top 15%)",
  matric: "93.8% (Lions School)",
  inter: "84.8% (Lions School)",
  phone: "+91-8140006314",
  email: "arpitamishra2755@gmail.com"
};

const SKILLS = [
  { title: "Core Processors", icon: <Code className="text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural Networks", icon: <Brain className="text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness", "TF-IDF"] },
  { title: "Targeting (CV)", icon: <Eye className="text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration", "RetinaFace", "FaceNet"] },
  { title: "Cloud & Support", icon: <Server className="text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
];

const PROJECTS = [
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings using FAISS L2-normalized search (Threshold: 0.45).", tags: ["FAISS", "RAG", "NLP"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP", description: "Converted patient queries into healthcare appointment slots with 80%+ intent accuracy using synthetic datasets, TF-IDF extraction, and Logistic Regression.", tags: ["Scikit-learn", "TF-IDF", "Streamlit"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Designed a deterministic prompt-mutation engine for detecting behavioral drift and response instability without requiring labeled ground truth. Enforced inference control.", tags: ["LLM Safety", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second face identification using RetinaFace and FaceNet. Optimized FAISS nearest-neighbor search with calibrated thresholding (1.0).", tags: ["OpenCV", "FaceNet"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack reservation platform using queue-based seat allocation (deque) to prevent race conditions. Managed via structured Git CI/CD.", tags: ["Flask", "MySQL", "CI/CD"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Unsupervised NLP clustering pipeline discovering latent semantic speech patterns via contextual MiniLM embeddings and UMAP reduction (384 to 2).", tags: ["KMeans", "UMAP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Face verification pipeline using frozen FaceNet embeddings and custom Euclidean similarity layer. Achieved 100% recall on fixed evaluation pairs.", tags: ["TensorFlow", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns.", link: "https://forage-link.com" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities.", link: null },
  { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git workshops.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash hackathon.", link: null }
];

// --- EHA'S COMPREHENSIVE KNOWLEDGE BASE ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "10th", "12th"], response: "Arpita holds an 8.11 CGPA at LPU. School marks: 93.8% (10th) and 84.8% (12th). Academic records optimized." },
  { keywords: ["slot", "healthcare", "synthetic", "logistic"], response: "The Slot Recommender uses synthetic healthcare datasets and TF-IDF extraction with Logistic Regression to achieve 80%+ intent accuracy." },
  { keywords: ["routemate", "deque", "race"], response: "RouteMate prevents race conditions in bus bookings using a queue-based seat allocation system (deque). Built with Flask/MySQL." },
  { keywords: ["face", "verify", "recall"], response: "Face Verification mission achieved 100% recall on evaluation pairs using Siamese-style FaceNet embeddings." },
  { keywords: ["skill", "python", "stack", "know"], response: "Arpita's processors: Python, C++, SQL. Neural expertise: RAG, CV, and Backend Architectures." },
  { keywords: ["who", "arpita"], response: "Arpita Mishra is an ML Engineer and the architect of my neural interface. Currently running on the MARK-85 protocol." }
];

// --- ADVANCED COMPONENTS ---

const HUDOverlay = ({ isDark }: { isDark: boolean }) => (
  <div className="fixed inset-0 pointer-events-none z-[1000]">
    {/* SCANNING RADAR */}
    <div className={`absolute top-10 right-10 w-32 h-32 opacity-20 border rounded-full ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`}>
       <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-full h-full flex items-center justify-center">
          <div className={`w-[2px] h-1/2 origin-bottom ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red'}`} />
       </motion.div>
    </div>
    {/* SYSTEM METRICS */}
    <div className="absolute top-1/2 left-6 -translate-y-1/2 space-y-8 hidden xl:block">
       {[
         { icon: <Activity size={14} />, label: "NEURAL_LOAD", val: "14%" },
         { icon: <Radar size={14} />, label: "THREAT_SCAN", val: "0%" },
         { icon: <BarChart3 size={14} />, label: "ARCHIVE_SYNC", val: "100%" }
       ].map((m, i) => (
         <div key={i} className={`font-mono text-[8px] tracking-[0.3em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'} opacity-40`}>
           <div className="flex items-center gap-2 mb-1">{m.icon} {m.label}</div>
           <div className="w-20 h-[1px] bg-current opacity-20" />
           <div className="mt-1">{m.val}</div>
         </div>
       ))}
    </div>
  </div>
);

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
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
      {children}
    </motion.div>
  );
};

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
      className={`fixed top-0 left-0 w-10 h-10 border pointer-events-none z-[2000] hidden lg:flex items-center justify-center rounded-full border-dashed ${isDark ? 'border-stark-cyan shadow-[0_0_20px_#22d3ee]' : 'border-stark-red'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red'}`} />
    </motion.div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-48 h-48 flex items-center justify-center mb-10 mx-auto group">
    <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'border-stark-red'}`} />
    <div className={`absolute inset-4 rounded-full border-[6px] opacity-20 ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`} />
    <div className={`w-28 h-28 rounded-full border-8 flex items-center justify-center relative overflow-hidden ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
       <div className={`absolute inset-0 ${isDark ? 'bg-stark-cyan/5' : 'bg-stark-red/5'} animate-pulse`} />
       <Zap className={isDark ? 'text-stark-cyan drop-shadow-[0_0_10px_#22d3ee]' : 'text-stark-red'} size={32} />
    </div>
    {[...Array(12)].map((_, i) => (
      <div key={i} className={`absolute w-[2px] h-6 ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red'}`} style={{ transform: `rotate(${i * 30}deg) translateY(-85px)` }} />
    ))}
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Online. Systems at 100%. Protocol: MARK-85." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2500);
  }, []);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase();
    setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Data point not found in primary cache. Checking GitHub mainframe..." }]);
    }, 450);
  };

  const scrollTo = (id: string) => { setIsSidebarOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  if (isBooting) return (
    <div className="h-screen bg-[#010409] flex flex-col items-center justify-center font-mono p-10 overflow-hidden">
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stark-cyan space-y-2 text-xs md:text-sm">
          <p> {">"} INITIALIZING NEURAL_LINK... OK</p>
          <p> {">"} SCANNING ARCHIVES (20+ MISSIONS)... OK</p>
          <p> {">"} AUTHENTICATING MARK-85 PROTOCOL... OK</p>
          <p> {">"} UPLINKING EHA INTELLIGENCE... OK</p>
          <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.1, repeat: Infinity }} className="h-4 w-2 bg-stark-cyan inline-block mt-4" />
       </motion.div>
       <div className="absolute bottom-10 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-stark-cyan shadow-[0_0_20px_#22d3ee]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} />
       </div>
    </div>
  );

  return (
    <main className={`relative min-h-screen transition-all duration-1000 ${isDark ? 'bg-[#010409] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      <CustomCursor isDark={isDark} />
      <HUDOverlay isDark={isDark} />

      {/* BIOMETRIC SCAN OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center p-10">
            <Scan className="text-stark-cyan w-32 h-32 animate-pulse mb-8" />
            <h4 className="text-4xl font-black uppercase tracking-[0.4em] text-stark-cyan mb-4">Decrypting Identity...</h4>
            <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div className="h-full bg-stark-cyan" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-110 shadow-2xl transition-all"><Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /></button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }} className={`fixed top-0 left-0 h-full w-85 z-[210] border-r backdrop-blur-3xl p-12 flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-16 opacity-50"><X /></button>
            <div className="space-y-12">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-2xl font-black uppercase tracking-[0.4em] hover:text-stark-cyan transition-all hover:translate-x-6">{item}</button>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase tracking-[0.5em]">Mark-85 // Online</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EHA WIDGET */}
      <div className="fixed bottom-8 right-8 z-[200]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[520px] border backdrop-blur-3xl rounded-[2rem] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.4)] ${isDark ? 'bg-black/95 border-stark-cyan/40 shadow-stark-cyan/10' : 'bg-white/95 border-stark-red/40 shadow-stark-red/10'}`}>
              <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10' : 'bg-stark-red/10'}`}>
                <span className={`text-xs font-mono tracking-[0.3em] uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Cpu size={18} /> Eha_Neural_Link</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-[11px] font-mono leading-relaxed">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user" ? 'bg-stark-red/20 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 text-gray-700')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-6 border-t border-white/10 flex gap-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Establish Uplink..." className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none rounded-xl" />
                <button type="submit" className={`px-6 py-2 rounded-xl transition-all ${isDark ? 'bg-stark-cyan text-black hover:bg-cyan-300' : 'bg-stark-red text-white hover:bg-red-400'}`}><Send size={18} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-18 h-18 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan shadow-stark-cyan/40' : 'bg-stark-red shadow-stark-red/40'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={32} />
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* NEURAL BACKGROUND PARTICLES */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(30)].map((_, i) => (
            <motion.div key={i} className={`absolute w-[1px] h-40 ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red'}`} 
            initial={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [-50, 50] }}
            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity }}
            />
          ))}
        </div>
        
        <ArcReactor isDark={isDark} />
        
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className={`font-mono text-xs tracking-[1.5em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 // Optimal Strength</h2>
          <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-none mb-12 uppercase select-none group">
            ARPITA <span className={isDark ? 'text-stark-red drop-shadow-[0_0_30px_#ef4444]' : 'text-stark-gold'}>MISHRA</span>
          </h1>
          
          <div className="font-mono text-xs md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-6 py-3 bg-stark-cyan/5 max-w-2xl mx-auto mb-12 shadow-2xl backdrop-blur-md">
            <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>
            Initializing neural archives for ML Engineer specialized in RAG, Computer Vision, and reliability-driven AI missions...
          </div>

          <div className="flex flex-wrap gap-8 justify-center mt-12">
            <button onClick={() => scrollTo('about')} className={`px-16 py-6 font-black uppercase tracking-[0.3em] text-xs transition-all border-b-8 rounded-[2rem] ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 hover:shadow-[0_0_30px_#ef4444]' : 'bg-stark-gold border-amber-900 text-white hover:bg-amber-500 shadow-xl'}`}>Identity Protocol</button>
            <button onClick={() => { setIsScanning(true); setTimeout(() => { setIsScanning(false); window.open('/Arpita_Mishra_CV.pdf', '_blank'); }, 2500); }} className={`px-16 py-6 border-2 font-black uppercase tracking-[0.3em] text-xs transition-all rounded-[2rem] ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10 hover:shadow-[0_0_40px_#22d3ee]' : 'border-stark-red text-stark-red hover:bg-stark-red/10 shadow-xl'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT (IDENTITY SCAN) */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-24 items-center">
          <TiltCard className="relative group p-4 border-2 border-dashed border-stark-cyan/20 rounded-[3rem]" isDark={isDark}>
            <div className={`absolute -inset-10 border border-dashed animate-[spin_40s_linear_infinite] rounded-full opacity-20 ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`} />
            <img src="/arpita.jpg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] ${isDark ? 'grayscale brightness-75 hover:grayscale-0 hover:brightness-100' : ''}`} />
          </TiltCard>
          <div className="space-y-12">
            <h3 className={`font-mono text-sm tracking-[0.8em] uppercase flex items-center gap-4 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Target size={24} /> Neural Summary</h3>
            <p className="italic font-bold text-4xl leading-tight">"Innovation is the bridge between raw data and grounded human precision."</p>
            <p className="text-xl font-light leading-relaxed opacity-80">{PROFILE.summary}</p>
            <p className="text-xl font-light leading-relaxed opacity-80">Inspired by the Stark Legacy, I specialize in building **Intelligent Armor for Data**. My missions focus on **RAG** and **Computer Vision**, where reliability is the ultimate metric.</p>
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10 text-center">
              <div><p className={`text-6xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">Active Repos</p></div>
              <div><p className={`text-6xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">University CGPA</p></div>
              <div><p className="text-6xl font-black text-green-500">100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">Recall Metric</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-6xl font-black text-center uppercase mb-24 tracking-tighter leading-none">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} className={`p-12 border-2 rounded-[3rem] transition-all group relative overflow-hidden ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200'}`} isDark={isDark}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${isDark ? 'via-stark-cyan' : 'via-stark-red'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`flex items-center gap-6 mb-10 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.3em]">{cat.title}</span></div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(s => <span key={s} className={`px-4 py-2 text-[10px] font-mono rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/5 text-gray-400 group-hover:text-stark-cyan group-hover:border-stark-cyan/50' : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="history" className={`py-32 px-6 border-y border-white/5 ${isDark ? 'bg-[#010409]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-24">
          <h4 className="text-6xl font-black uppercase text-center mb-24 tracking-tighter leading-none">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] gap-16 group">
              <div className={`font-mono border-t-8 pt-8 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-4xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-3 text-xs mt-6 underline italic uppercase tracking-[0.2em] hover:text-white"><FileCheck size={20} /> Verify_Uplink</a>}
              </div>
              <div className="border-l-4 border-white/10 pl-16 pb-16 text-left relative">
                <div className={`absolute -left-[12px] top-0 w-5 h-5 rounded-full ${isDark ? 'bg-stark-cyan shadow-[0_0_20px_#22d3ee]' : 'bg-stark-red shadow-[0_0_20px_#ef4444]'}`} />
                <h5 className="text-4xl font-black uppercase mb-4 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                <h6 className={`font-mono text-lg mb-8 uppercase tracking-[0.4em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-xl font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS (TACTICAL ARCHIVES) */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto">
        <h4 className="text-6xl font-black text-center uppercase mb-24 tracking-tighter leading-none">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`group relative border-2 p-14 flex flex-col h-full transition-all rounded-[3rem] overflow-hidden ${isDark ? 'bg-[#010409] border-white/5 hover:border-stark-cyan/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 hover:shadow-2xl'}`} isDark={isDark}>
              <div className={`absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-100 transition-all duration-700 scale-[2] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[10px] mb-8 uppercase tracking-[0.6em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Archive: Mission_{100+i}</span>
              <h5 className="text-3xl font-black uppercase mb-6 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-base font-light leading-relaxed mb-12 flex-1 italic opacity-70 group-hover:opacity-100 italic">"{p.description}"</p>
              <div className="flex flex-wrap gap-3 mb-12">
                {p.tags.map(t => <span key={t} className={`text-[10px] px-4 py-1.5 border font-mono rounded-xl ${isDark ? 'border-white/10 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-12 border-t border-white/10 pt-12 mt-auto justify-center">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Github size={30} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Globe size={30} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-all hover:scale-150"><BookOpen size={30} /></a>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="mt-32 text-center p-24 border-8 border-dashed border-white/5 rounded-[5rem] group hover:border-stark-cyan/20 transition-all relative overflow-hidden">
          <h4 className="text-5xl font-black mb-8 uppercase tracking-tight">Open Global Database</h4>
          <p className="text-gray-500 mb-16 max-w-xl mx-auto font-mono text-base uppercase tracking-[0.4em] italic">Experimental Mainframe // 20+ Active Missions Integrated</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-24 py-8 font-black uppercase rounded-[2.5rem] transition-all text-xl ${isDark ? 'bg-white text-black hover:bg-stark-cyan hover:shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Initialize Mainframe</a>
        </div>
      </section>

      {/* ACHIEVEMENTS & EDUCATION (MERGED) */}
      <section className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-5xl font-black uppercase mb-20 flex items-center gap-6"><Trophy className="text-stark-gold" size={50} /> Commendations</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-14 border-l-[20px] rounded-[3rem] ${isDark ? 'bg-white/5 border-stark-gold hover:bg-white/[0.08]' : 'bg-white border-amber-500 shadow-2xl'} transition-all`}>
                <h5 className="text-3xl font-black uppercase mb-4">{ach.title}</h5>
                <p className={`text-xl italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="space-y-12">
             <h4 className="text-5xl font-black uppercase mb-20 flex items-center gap-6"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={50} /> Academic DB</h4>
             <div className="space-y-8">
               {EDUCATION.map((edu, i) => (
                 <TiltCard key={i} className={`p-10 border-t-[15px] rounded-[3rem] ${isDark ? `bg-white/5 border-stark-cyan` : `bg-white shadow-2xl border-stark-red`}`}>
                   <h5 className="text-3xl font-black uppercase mb-2">{edu.title}</h5>
                   <p className="text-sm font-mono opacity-50 tracking-[0.5em] mb-6">{edu.school} // {edu.date}</p>
                   <p className="text-5xl font-black">{edu.score}</p>
                 </TiltCard>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* NEXUS */}
      <section id="nexus" className="py-40 px-6 border-t border-white/5 bg-[#010409]">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-6xl font-black uppercase mb-24 tracking-tighter flex items-center justify-center gap-8"><Target className="text-stark-red w-16 h-16" /> Global Nexus</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
            {CONTACT_LINKS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-8 p-12 border rounded-[3rem] transition-all bg-white/[0.02] border-white/10 hover:border-stark-cyan/40 group`}>
                <div className={`transition-transform scale-[2.2] group-hover:scale-[2.8] group-hover:text-stark-cyan`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] mt-6 opacity-40 group-hover:opacity-100">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 text-center text-gray-600 font-mono text-xs uppercase tracking-[1.5em] border-t border-white/5 opacity-40">
        Arpita Mishra // Eha Advanced Intelligence v6.0 // Silvassa, India
      </footer>
      
      <style jsx global>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { cursor: none; }
      `}</style>
    </main>
  );
}

// --- CONSTANTS ---
const ACHIEVEMENTS = [
  { title: "Team Leader - SIH 2024", desc: "Led 6-member team to build 'Aqua Quest', a groundwater conservation web game via HTML/CSS/JS + Firebase." },
  { title: "1st Runner-Up - Speak & Spark", desc: "Creativity Challenge, LPU CPE. Built functional prototype under 15-minute constraint." }
];

const CONTACT_LINKS = [
  { icon: <Mail />, label: "Email", link: "mailto:arpitamishra2755@gmail.com" },
  { icon: <Linkedin />, label: "LinkedIn", link: "https://linkedin.com/in/arpita2755" },
  { icon: <Github />, label: "GitHub", link: "https://github.com/Arpita-2755" },
  { icon: <Code />, label: "LeetCode", link: "https://leetcode.com/u/Arpita_2755/" },
  { icon: <BookOpen />, label: "Medium", link: "https://medium.com/@arpitamishra2755" },
  { icon: <Twitter />, label: "X", link: "https://x.com/ArpitaM_2755" },
  { icon: <Phone />, label: "Call", link: "tel:+91-8140006314" }
];