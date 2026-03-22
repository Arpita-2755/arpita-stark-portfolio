"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Loader2, Radar
} from "lucide-react";

// --- THE IMMUTABLE DATA MAINFRAME ---
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
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating hallucination through semantic grounding in 700+ verse embeddings. Used L2-normalized FAISS inner-product search with similarity thresholding (0.45) and mean-confidence calibration.", tags: ["FAISS", "MiniLM", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
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

// --- EHA'S BRAIN (Full Data Injection) ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "10th", "12th", "dean"], response: "Arpita holds an 8.11 CGPA at LPU (Top 15%, Dean's List). Schooling: 93.8% in 10th and 84.8% in 12th at Lions English School." },
  { keywords: ["slot", "healthcare", "recommendation", "synthetic"], response: "The Slot Recommender uses synthetic patient datasets and TF-IDF extraction with Logistic Regression to achieve 80%+ intent accuracy for appointment slot mapping." },
  { keywords: ["routemate", "bus", "deque", "race"], response: "RouteMate prevents race conditions in bus bookings using a queue-based seat allocation (deque) and secure session management. Built with Flask/MySQL." },
  { keywords: ["gitarag", "embeddings", "0.45", "hallucination"], response: "GitaRAG indexes 700+ verse embeddings using FAISS L2-normalization with a 0.45 threshold and mean-confidence calibration to eliminate generative hallucination." },
  { keywords: ["sih", "hackathon", "aqua", "quest"], response: "Arpita was Team Leader for SIH 2024, building 'Aqua Quest'—a multi-level web game for groundwater conservation using Firebase." },
  { keywords: ["skill", "python", "stack", "know"], response: "Arpita's stack: Python, C++, SQL, Java. ML Specialty: RAG, CV, LLMs, and Backend Architectures." },
  { keywords: ["who", "arpita", "mishra"], response: "Arpita Mishra is an ML Engineer and Visionary Architect specializing in reliability-driven AI. She is currently running on the MARK-85 protocol." }
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
      className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[1000] hidden lg:flex items-center justify-center ${isDark ? 'border-stark-cyan' : 'border-stark-red'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} />
    </motion.div>
  );
};

const TiltCard = ({ children, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX);
  const springY = useSpring(rotateY);

  function handleMouse(event: any) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div 
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TypewriterHero = () => {
  const [text, setText] = useState("");
  const fullText = "Initializing Arpita Mishra Protocol... MARK-85 Neural Core Online... Accessing ML Repository (20+ missions)... Target: Awe-Struck Level UI...";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i)); i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-xs md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5 max-w-2xl mx-auto mb-10">
      <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>{text}<span className="animate-pulse">_</span>
    </div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-44 h-44 flex items-center justify-center mb-10 mx-auto">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'border-stark-red shadow-[0_0_50px_#ef4444]'}`} />
    <div className={`w-30 h-30 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_80px_#22d3ee]' : 'bg-stark-red shadow-[0_0_80px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} size={28} />
      </div>
    </div>
    {[...Array(8)].map((_, i) => (
      <div key={i} className={`absolute w-1 h-8 ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} style={{ transform: `rotate(${i * 45}deg) translateY(-90px)` }} />
    ))}
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Protocol Online. Neural links active." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase();
    setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Query not found. Check the GitHub database for deeper logs." }]);
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
      
      {/* HUD SCANNING LINE */}
      <div className={`fixed top-0 left-0 w-full h-[2px] z-[500] pointer-events-none opacity-20 animate-[scan_8s_linear_infinity] ${isDark ? 'bg-stark-cyan shadow-[0_0_15px_#22d3ee]' : 'bg-stark-red shadow-[0_0_15px_#ef4444]'}`} />

      {/* SIDEBAR */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-110 shadow-2xl transition-all"><Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /></button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -350 }} animate={{ x: 0 }} exit={{ x: -350 }} className={`fixed top-0 left-0 h-full w-80 z-[210] border-r backdrop-blur-3xl p-12 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-12 opacity-50"><X /></button>
            <div className="space-y-10">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-xl font-black uppercase tracking-[0.4em] hover:text-stark-cyan transition-all hover:translate-x-4">{item}</button>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase tracking-[0.5em]">Mark-85 // Online</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIOMETRIC OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-10">
            <div className="relative mb-12">
               <Scan className="text-stark-cyan w-32 h-32 animate-pulse" />
               <div className="absolute inset-0 border-4 border-stark-cyan animate-ping opacity-20" />
            </div>
            <h4 className="text-3xl font-black uppercase tracking-[0.4em] text-stark-cyan mb-4">Decrypting Identity...</h4>
            <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden relative">
               <motion.div className="absolute h-full bg-stark-cyan" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} />
            </div>
            <p className="mt-8 font-mono text-xs text-stark-cyan/60 uppercase tracking-[0.3em] text-center">Auth_Packet: A.Mishra_Dossier_v4.5.bin<br/>Status: Uplinking...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:rotate-180 transition-all">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* EHA */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[500px] border backdrop-blur-3xl rounded-2xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40 shadow-black/20'}`}>
              <div className={`p-5 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Cpu size={16} /> Eha Intelligence</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide text-[11px] font-mono leading-relaxed">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-xl ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 text-gray-700 shadow-sm')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-5 border-t border-white/10 flex gap-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query Eha..." className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none rounded-lg" />
                <button type="submit" className={`px-5 py-2 rounded-lg transition-all ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={16} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan shadow-stark-cyan/40' : 'bg-stark-red shadow-stark-red/40'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} />
        </button>
      </div>

      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* NEURAL BACKGROUND SIMULATION */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className={`absolute w-[1px] h-32 ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} 
            initial={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-20, 20] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            />
          ))}
        </div>
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1.2em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 Initialize // Arpita Mishra</h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-10 uppercase select-none">ARPITA <span className={isDark ? 'text-stark-red drop-shadow-[0_0_20px_#ef4444]' : 'text-stark-gold'}>MISHRA</span></h1>
          <TypewriterHero />
          <div className="flex flex-wrap gap-6 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-14 py-5 font-black uppercase tracking-widest text-xs transition-all border-b-8 rounded-xl ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 hover:-translate-y-1' : 'bg-stark-gold border-amber-900 text-white hover:bg-amber-500'}`}>Identity Protocol</button>
            <button onClick={handleDownload} className={`px-14 py-5 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-xl ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10 hover:shadow-[0_0_30px_#22d3ee]' : 'border-stark-red text-stark-red hover:bg-stark-red/10 shadow-xl'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <TiltCard className="relative group">
            <div className={`absolute -inset-8 border border-dashed animate-[spin_20s_linear_infinite] rounded-3xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isDark ? 'grayscale brightness-75 hover:grayscale-0 hover:brightness-100' : ''}`} />
          </TiltCard>
          <div className="space-y-10 text-xl font-light leading-relaxed">
            <h3 className={`font-mono text-sm tracking-[0.5em] uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Target size={20} /> The Visionary Architect</h3>
            <p className="italic font-bold text-3xl leading-tight">"If a system can't ground its inference, it's just noise. I build armor for truth."</p>
            <p>{PROFILE.summary}</p>
            <p>Inspired by the relentless optimization of the Stark Legacy, I architect Intelligent Armor for Data. My core focus lies in **Retrieval-Augmented Generation (RAG)** and **Computer Vision**, where I develop missions that bridge raw data with grounded human precision.</p>
            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-white/10 text-center">
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Active Missions</p></div>
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Neural CGPA</p></div>
              <div><p className="text-5xl font-black text-green-500">100%</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Recall Rate</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-5xl font-black text-center uppercase mb-20 tracking-tighter leading-none">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} className={`p-10 border rounded-3xl transition-all group relative overflow-hidden ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 shadow-2xl'}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${isDark ? 'via-stark-cyan' : 'via-stark-red'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.2em]">{cat.title}</span></div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(s => <span key={s} className={`px-3 py-1.5 text-[10px] font-mono rounded-lg border transition-all ${isDark ? 'bg-white/5 border-white/5 text-gray-400 group-hover:text-stark-cyan group-hover:border-stark-cyan/40' : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <h4 className="text-5xl font-black uppercase text-center mb-20 tracking-tighter">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr] gap-12 group">
              <div className={`font-mono border-t-4 pt-6 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-3xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-2 text-xs mt-4 underline italic uppercase tracking-widest hover:text-white"><FileCheck size={16} /> Verify_Mission_Hash</a>}
              </div>
              <div className="border-l-2 border-white/10 pl-12 pb-12 text-left relative">
                <div className={`absolute -left-[6px] top-0 w-3 h-3 rounded-full ${isDark ? 'bg-stark-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-stark-red shadow-[0_0_10px_#ef4444]'}`} />
                <h5 className="text-3xl font-black uppercase mb-2 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                <h6 className={`font-mono text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-lg font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-5xl font-black text-center uppercase mb-20 tracking-tighter leading-none">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`group relative border-2 p-12 flex flex-col h-full transition-all rounded-3xl overflow-hidden ${isDark ? 'bg-[#010409] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-100 hover:shadow-2xl'}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-100 transition-all duration-700 scale-150 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <div className={`absolute -inset-full group-hover:inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none`} />
              <span className={`font-mono text-[10px] mb-6 uppercase tracking-[0.5em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-sm font-light leading-relaxed mb-10 flex-1 italic opacity-70 group-hover:opacity-100">"{p.description}"</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {p.tags.map(t => <span key={t} className={`text-[10px] px-3 py-1 border font-mono rounded-md ${isDark ? 'border-white/10 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-10 border-t border-white/10 pt-10 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Github size={24} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-150"><Globe size={24} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-all hover:scale-150"><BookOpen size={24} /></a>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="mt-24 text-center p-20 border-4 border-dashed border-white/5 rounded-[3rem] group hover:border-stark-cyan/20 transition-all relative overflow-hidden">
          <div className="absolute inset-0 bg-stark-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-4xl font-black mb-6 uppercase tracking-tight">Access Global Mainframe</h4>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest italic">20+ Experimental Repositories // Neural Logs Active</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-16 py-6 font-black uppercase rounded-2xl transition-all relative z-10 ${isDark ? 'bg-white text-black hover:bg-stark-cyan hover:shadow-[0_0_50px_#22d3ee]' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Open GitHub Database</a>
        </div>
      </section>

      {/* COMMENDATIONS */}
      <section className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h4 className="text-4xl font-black uppercase mb-14 flex items-center gap-4"><Trophy className="text-stark-gold" /> Commendations</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-10 border-l-[12px] rounded-3xl ${isDark ? 'bg-white/5 border-stark-gold hover:bg-white/[0.08]' : 'bg-white border-amber-500 shadow-2xl'} transition-all`}>
                <h5 className="text-2xl font-black uppercase mb-3">{ach.title}</h5>
                <p className={`text-lg italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
            <h4 className="text-4xl font-black uppercase mb-14 col-span-full flex items-center gap-4"><Award className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> System Upgrades</h4>
            {CERTIFICATES.map((cert, i) => (
              <TiltCard key={i} className={`p-8 border-2 rounded-3xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
                <h5 className={`text-[10px] font-mono uppercase mb-4 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
                <p className="text-sm font-black uppercase leading-tight mb-6">{cert.title}</p>
                <a href={cert.link} target="_blank" className="text-[10px] font-mono opacity-30 group-hover:opacity-100 uppercase tracking-widest flex items-center gap-2">Verify_Upgrade <ChevronRight size={12} /></a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-20 tracking-tighter flex items-center justify-center gap-4"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> Academic Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {EDUCATION.map((edu, i) => (
              <TiltCard key={i} className={`p-14 border-t-[12px] rounded-3xl text-center ${isDark ? `bg-white/5 border-stark-cyan hover:bg-white/[0.08]` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-2xl font-black uppercase mb-2">{edu.title}</h5>
                <p className="text-xs font-mono mb-6 opacity-50 tracking-[0.3em]">{edu.school} // {edu.date}</p>
                <p className={`text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
                <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{edu.detail}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEXUS */}
      <section id="nexus" className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-5xl font-black uppercase mb-20 tracking-tighter flex items-center justify-center gap-6"><Target className="text-stark-red w-12 h-12" /> Establishing Uplink</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {CONTACT_LINKS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-6 p-10 border rounded-[2rem] transition-all bg-white/[0.02] border-white/10 hover:bg-white/5 group`}>
                <div className={`transition-transform scale-[1.8] group-hover:scale-[2.2] group-hover:text-stark-cyan`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] mt-4 opacity-50 group-hover:opacity-100">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[1em] border-t border-white/5 opacity-50">
        Arpita Mishra // Eha Neural Logic v5.0 // Silvassa, India
      </footer>
      
      <style jsx global>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}