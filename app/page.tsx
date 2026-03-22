"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Menu, X, Scan, BarChart3, Radar
} from "lucide-react";

// --- 1. DATA MAINFRAME (MOVED TO TOP TO PREVENT BUILD ERRORS) ---

const PROFILE = {
  name: "Arpita Mishra",
  summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and production deployment.",
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
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings using FAISS L2-normalized search (Threshold: 0.45).", tags: ["FAISS", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "Converted free-text patient queries into appointment slots. Implemented hierarchical strategy with 80%+ intent accuracy using synthetic datasets, TF-IDF, and Logistic Regression.", tags: ["Scikit-learn", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability without required ground truth. Enforced inference determinism.", tags: ["distilgpt2", "Safety"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second multi-face identification using RetinaFace and FaceNet. Features automatic FAISS index rebuilding and modular AI engine decoupled from Flask routes.", tags: ["OpenCV", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack system using queue-based seat allocation (deque) to prevent race conditions. Managed via structured Git CI/CD and secure session management.", tags: ["Flask", "MySQL"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Fully unsupervised NLP clustering pipeline discovering latent semantic speech patterns via contextual MiniLM embeddings and UMAP dimensionality reduction (384 to 2).", tags: ["UMAP", "KMeans"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Siamese-style face verification pipeline with frozen FaceNet embeddings. Achieved 100% recall on fixed evaluation pairs via similarity threshold calibration.", tags: ["TensorFlow", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends.", link: "https://forage-link.com" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities; applied inclusive teaching strategies.", link: null },
  { role: "Core & Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git workshops.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash hackathon; led full-stack workshops.", link: null }
];

const ACHIEVEMENTS = [
  { title: "Team Leader - SIH 2024", desc: "Led 6-member team to architect 'Aqua Quest' web game (HTML/CSS/JS + Firebase) for groundwater conservation." },
  { title: "1st Runner-Up - Speak & Spark", desc: "Creativity Challenge, LPU CPE. Built functional prototype under a 15-minute constraint." }
];

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "GenAI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025", link: "https://infosys.com" },
  { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://nptel.ac.in" }
];

const EDUCATION = [
  { title: "B.Tech CSE", school: "LPU", score: "8.11 CGPA", date: "2023 - 2027", detail: "Top 15% - Dean's List" },
  { title: "Intermediate", school: "Lions School", score: "84.8%", date: "2023", detail: "PCM Distinction" },
  { title: "Matriculation", school: "Lions School", score: "93.8%", date: "2021", detail: "High Distinction" }
];

const CONTACTS = [
  { icon: <Mail />, label: "Email", link: `mailto:${PROFILE.email}` },
  { icon: <Linkedin />, label: "LinkedIn", link: "https://linkedin.com/in/arpita2755" },
  { icon: <Github />, label: "GitHub", link: "https://github.com/Arpita-2755" },
  { icon: <Code />, label: "LeetCode", link: "https://leetcode.com/u/Arpita_2755/" },
  { icon: <BookOpen />, label: "Medium", link: "https://medium.com/@arpitamishra2755" },
  { icon: <Twitter />, label: "X", link: "https://x.com/ArpitaM_2755" },
  { icon: <Phone />, label: "Call", link: `tel:${PROFILE.phone}` }
];

// --- EHA'S KNOWLEDGE CORE ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "10th", "12th"], response: "Arpita's records: 8.11 CGPA at LPU (Dean's List), 93.8% in 10th grade, and 84.8% in 12th grade at Lions English School." },
  { keywords: ["slot", "healthcare", "synthetic", "logistic"], response: "The Slot Recommender mission achieved 80%+ accuracy using synthetic patient query generation, TF-IDF extraction, and a hierarchical Logistic Regression strategy." },
  { keywords: ["routemate", "bus", "deque", "race"], response: "RouteMate prevents race conditions in bus bookings using a queue-based seat allocation system (deque). Built with Flask and MySQL." },
  { keywords: ["gitarag", "embeddings", "0.45", "hallucination"], response: "GitaRAG indexes 700+ verse embeddings using FAISS L2-normalization with a 0.45 threshold and mean-confidence calibration to ground AI in scripture." },
  { keywords: ["sih", "hackathon", "aqua"], response: "Arpita led a 6-member team in SIH 2024 to build 'Aqua Quest', an educational groundwater conservation game using HTML/CSS/JS and Firebase." },
  { keywords: ["who", "arpita"], response: "Arpita Mishra is an ML Engineer and the visionary architect behind my interface. She is currently running on the MARK-85 protocol." }
];

// --- COMPONENTS ---

const HUDCursor = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
  return (
    <motion.div 
      className={`fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-[3000] hidden lg:flex items-center justify-center ${isDark ? 'border-stark-cyan shadow-[0_0_20px_#22d3ee]' : 'border-stark-red shadow-[0_0_20px_#ef4444]'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} />
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
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
      {children}
    </motion.div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-44 h-44 flex items-center justify-center mb-10 mx-auto group">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-30 ${isDark ? 'border-stark-cyan shadow-[0_0_40px_#22d3ee]' : 'border-stark-red shadow-[0_0_40px_#ef4444]'}`} />
    <div className={`w-30 h-30 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <div className={`w-18 h-18 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red shadow-[0_0_60px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} size={24} />
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Online. Mark-85 protocols active. Ask me anything." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setIsBooting(false), 2800); }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [chatHistory]);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase();
    setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Data point not found. Checking GitHub archives..." }]);
    }, 450);
  };

  const handleDownload = () => {
    setIsScanning(true);
    setTimeout(() => { setIsScanning(false); window.open('/Arpita_Mishra_CV.pdf', '_blank'); }, 2500);
  };

  const scrollTo = (id: string) => { setIsSidebarOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  if (isBooting) return (
    <div className="h-screen bg-[#010409] flex flex-col items-center justify-center font-mono p-10 overflow-hidden text-stark-cyan space-y-4">
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p> {">"} INITIALIZING MARK-85 UPLINK... OK</p>
          <p> {">"} ESTABLISHING NEURAL LINK TO EHA... OK</p>
          <p> {">"} SCANNING ARCHIVES (7 MISSIONS)... OK</p>
          <p> {">"} WELCOME BACK, MS. MISHRA</p>
          <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.1, repeat: Infinity }} className="h-4 w-2 bg-stark-cyan inline-block mt-4" />
       </motion.div>
       <div className="absolute bottom-10 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-stark-cyan" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} />
       </div>
    </div>
  );

  return (
    <main className={`relative min-h-screen transition-all duration-1000 ${isDark ? 'bg-[#010409] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      <HUDCursor isDark={isDark} />
      
      {/* HUD SIDEBAR */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-110 shadow-2xl transition-all"><Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /></button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }} className={`fixed top-0 left-0 h-full w-80 z-[210] border-r backdrop-blur-3xl p-12 flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-16 opacity-50"><X /></button>
            <div className="space-y-10">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-2xl font-black uppercase tracking-[0.4em] hover:text-stark-cyan transition-all hover:translate-x-4">{item}</button>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase tracking-widest">Mark-85 // Arpita Mishra</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* BIOMETRIC OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center p-10">
            <Scan className="text-stark-cyan w-24 h-24 animate-pulse mb-8" />
            <h4 className="text-3xl font-black uppercase tracking-[0.4em] text-stark-cyan">Authenticating identity...</h4>
            <div className="w-80 h-1 bg-white/10 mt-8 rounded-full overflow-hidden">
               <motion.div className="h-full bg-stark-cyan shadow-[0_0_20px_#22d3ee]" animate={{ width: "100%" }} transition={{ duration: 2 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EHA CHAT */}
      <div className="fixed bottom-8 right-8 z-[200]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[500px] border backdrop-blur-3xl rounded-[2rem] flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40 shadow-stark-cyan/10' : 'bg-white/95 border-stark-red/40 shadow-stark-red/10'}`}>
              <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Terminal size={18} /> Eha Intelligence</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide text-[11px] font-mono leading-relaxed">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user" ? 'bg-stark-red/20 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 text-gray-700 shadow-sm')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-6 border-t border-white/10 flex gap-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Establish Uplink..." className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none rounded-xl" />
                <button type="submit" className={`px-5 py-2 rounded-xl transition-all ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={16} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan shadow-stark-cyan/40' : 'bg-stark-red shadow-stark-red/40'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} />
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* NEURAL BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(25)].map((_, i) => (
            <motion.div key={i} className={`absolute w-[1px] h-32 ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red shadow-[0_0_10px_#ef4444]'}`} 
            initial={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [-50, 50] }} transition={{ duration: Math.random() * 4 + 2, repeat: Infinity }} />
          ))}
        </div>
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className={`font-mono text-xs tracking-[1.5em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Initialize Mark-85 // Arpita Mishra</h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-10 uppercase select-none">ARPITA <span className={isDark ? 'text-stark-red drop-shadow-[0_0_30px_#ef4444]' : 'text-stark-gold'}>MISHRA</span></h1>
          <div className={`font-mono text-xs md:text-sm opacity-80 leading-relaxed max-w-2xl mx-auto border-l-2 pl-4 py-2 ${isDark ? 'text-stark-cyan border-stark-cyan/30 bg-stark-cyan/5' : 'text-stark-red border-stark-red/30 bg-stark-red/5'}`}>
            <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>
            Accessing neural archives... Machine Learning Engineer specialized in RAG and CV missions active...
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-12">
            <button onClick={() => scrollTo('about')} className={`px-14 py-6 font-black uppercase tracking-widest text-xs transition-all border-b-8 rounded-2xl ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 hover:-translate-y-1' : 'bg-stark-gold border-amber-900 text-white hover:bg-amber-500 shadow-xl'}`}>Identity Protocol</button>
            <button onClick={handleDownload} className={`px-14 py-6 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-2xl ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10 hover:shadow-[0_0_30px_#22d3ee]' : 'border-stark-red text-stark-red hover:bg-stark-red/10 shadow-xl'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <TiltCard className="relative group p-4 border-2 border-dashed border-stark-cyan/20 rounded-[3rem]" isDark={isDark}>
            <div className={`absolute -inset-8 border border-dashed animate-[spin_30s_linear_infinite] rounded-full opacity-20 ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`} />
            <img src="/arpita.jpeg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isDark ? 'grayscale brightness-75 hover:grayscale-0 hover:brightness-100' : ''}`} />
          </TiltCard>
          <div className="space-y-10 text-xl font-light leading-relaxed">
            <h3 className={`font-mono text-sm tracking-[0.8em] uppercase flex items-center gap-4 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Target size={24} /> Neural Summary</h3>
            <p className="italic font-bold text-4xl leading-tight">"Efficiency is the only currency. If a system is noisy, it is failed armor."</p>
            <p className="text-xl font-light leading-relaxed opacity-80">{PROFILE.summary}</p>
            <p className="text-xl font-light leading-relaxed opacity-80">Inspired by the Stark Legacy, I architect Intelligent Armor for Data. My missions prioritize RAG and Computer Vision, where grounding truth in data is the absolute target.</p>
            <div className="grid grid-cols-3 gap-12 pt-10 border-t border-white/10 text-center">
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">Active Repos</p></div>
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">Neural CGPA</p></div>
              <div><p className="text-5xl font-black text-green-500">100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50 mt-4">Recall Success</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-5xl font-black text-center uppercase mb-20 tracking-tighter leading-none">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} className={`p-10 border-2 rounded-[3rem] transition-all group relative overflow-hidden ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200 shadow-2xl'}`} isDark={isDark}>
              <div className={`flex items-center gap-6 mb-10 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.3em]">{cat.title}</span></div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(s => <span key={s} className={`px-4 py-2 text-[10px] font-mono rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/5 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-[#010409]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-20 text-center">
          <h4 className="text-6xl font-black uppercase mb-20 tracking-tighter leading-none">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr] gap-12 group text-left">
              <div className={`font-mono border-t-8 pt-8 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-3xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-2 text-[10px] mt-4 underline italic uppercase tracking-widest hover:text-white"><FileCheck size={16} /> Verify_Log</a>}
              </div>
              <div className="border-l-4 border-white/10 pl-16 pb-16 relative">
                <div className={`absolute -left-[10px] top-0 w-4 h-4 rounded-full ${isDark ? 'bg-stark-cyan shadow-[0_0_20px_#22d3ee]' : 'bg-stark-red shadow-[0_0_20px_#ef4444]'}`} />
                <h5 className="text-4xl font-black uppercase mb-2 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                <h6 className={`font-mono text-lg mb-8 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-xl font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-6xl font-black text-center uppercase mb-20 tracking-tighter leading-none">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`group relative border-2 p-12 flex flex-col h-full transition-all rounded-[3rem] overflow-hidden ${isDark ? 'bg-[#010409] border-white/5 hover:border-stark-cyan/50 shadow-2xl' : 'bg-white border-gray-200 hover:shadow-2xl'}`} isDark={isDark}>
              <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-100 transition-all duration-700 scale-150 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[10px] mb-8 uppercase tracking-[0.5em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Archive: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-sm font-light leading-relaxed mb-10 flex-1 italic opacity-70 group-hover:opacity-100">"{p.description}"</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {p.tags.map(t => <span key={t} className={`text-[9px] px-3 py-1 border font-mono rounded-lg ${isDark ? 'border-white/10 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-10 border-t border-white/10 pt-10 mt-auto justify-center">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Github size={24} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Globe size={24} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-all hover:scale-150"><BookOpen size={24} /></a>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="mt-24 text-center p-20 border-8 border-dashed border-white/5 rounded-[4rem] group hover:border-stark-cyan/20 transition-all">
          <h4 className="text-4xl font-black mb-8 uppercase tracking-tight">Open Global Database</h4>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto font-mono text-base uppercase tracking-[0.4em] italic">Experimental Nexus // 20+ Neural Missions Online</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-16 py-6 font-black uppercase rounded-[2rem] transition-all ${isDark ? 'bg-white text-black hover:bg-stark-cyan shadow-2xl shadow-cyan-400/20' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Open Mainframe</a>
        </div>
      </section>

      {/* ACHIEVEMENTS & EDUCATION */}
      <section className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-5xl font-black uppercase mb-20 flex items-center gap-6"><Trophy className="text-stark-gold" size={50} /> Commendations</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-10 border-l-[15px] rounded-[2.5rem] ${isDark ? 'bg-white/5 border-stark-gold hover:bg-white/[0.08]' : 'bg-white border-amber-500 shadow-2xl'} transition-all`}>
                <h5 className="text-3xl font-black uppercase mb-3">{ach.title}</h5>
                <p className={`text-xl italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="space-y-12">
             <h4 className="text-5xl font-black uppercase mb-20 flex items-center gap-6"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={50} /> Academic DB</h4>
             {EDUCATION.map((edu, i) => (
               <TiltCard key={i} className={`p-10 border-t-[15px] rounded-[2.5rem] ${isDark ? `bg-white/5 border-stark-cyan` : `bg-white shadow-2xl border-stark-red`}`}>
                 <h5 className="text-3xl font-black uppercase mb-2">{edu.title}</h5>
                 <p className="text-sm font-mono opacity-50 tracking-[0.5em] mb-4">{edu.school} // {edu.date}</p>
                 <p className="text-5xl font-black">{edu.score}</p>
                 <p className={`text-[10px] font-bold uppercase tracking-widest mt-4 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{edu.detail}</p>
               </TiltCard>
             ))}
          </div>
        </div>
      </section>

      {/* NEXUS (CONTACTS) */}
      <section id="nexus" className="py-24 px-6 border-t border-white/5 bg-[#010409]">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-5xl font-black uppercase mb-20 tracking-tighter flex items-center justify-center gap-6 text-stark-red"><Target size={50} /> Global Nexus</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
            {CONTACTS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-6 p-10 border rounded-[3rem] transition-all bg-white/[0.02] border-white/10 hover:border-stark-cyan/40 group`}>
                <div className={`transition-transform scale-[1.8] group-hover:scale-[2.4] group-hover:text-stark-cyan text-white`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] mt-4 opacity-40 group-hover:opacity-100">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 text-center text-gray-600 font-mono text-xs uppercase tracking-[1.5em] border-t border-white/5 opacity-50">
        Arpita Mishra // Eha Advanced Interface v6.0 // Silvassa, India
      </footer>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { cursor: none; }
      `}</style>
    </main>
  );
}