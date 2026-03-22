"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Loader2
} from "lucide-react";

// --- GLOBAL DATA CONSTANTS (Standalone to prevent Vercel Build Errors) ---

const PROFILE = {
  name: "Arpita Mishra",
  summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and production deployment.",
  cgpa: "8.11 (Top 15% of University Batch - Dean's List)",
  matric: "93.8% (Lions English School)",
  inter: "84.8% (Lions English School)",
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
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination using 700+ verse embeddings and FAISS search (0.45 threshold).", tags: ["FAISS", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "Converted patient queries into slots using synthetic datasets and TF-IDF extraction with Logistic Regression. Achieving 80%+ intent accuracy for healthcare primary care.", tags: ["Scikit-learn", "NLP", "Streamlit"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability without ground-truth supervision.", tags: ["HuggingFace", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second face identification using RetinaFace and FaceNet. Optimized FAISS nearest-neighbor search for sub-second similarity lookup with calibrated thresholding (1.0).", tags: ["RetinaFace", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack system using queue-based seat allocation (deque) to prevent race conditions. Managed via structured Git CI/CD workflows.", tags: ["Flask", "MySQL"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "NLP clustering pipeline discovering latent semantic speech patterns via contextual MiniLM embeddings and UMAP reduction.", tags: ["UMAP", "KMeans"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Biometric face verification pipeline with 100% recall on evaluation pairs using Siamese-style FaceNet embeddings.", tags: ["TensorFlow", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends.", link: "https://forage-link.com" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities; applied inclusive teaching strategies.", link: null },
  { role: "Core & Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash hackathon; coordinated full-stack development workshops.", link: null }
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
  { title: "B.Tech CSE", school: "LPU", score: "8.11 CGPA", date: "2023 - 2027", detail: "Dean's List - Top 15%" },
  { title: "Intermediate", school: "Lions School", score: "84.8%", date: "2023", detail: "Distinction" },
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

// --- EHA'S BRAIN (Full Sentience Injection) ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "10", "12"], response: "Arpita holds an 8.11 CGPA at LPU. School marks: 93.8% in 10th and 84.8% in 12th. Secured Dean's List honors." },
  { keywords: ["slot", "healthcare", "synthetic"], response: "The Slot Recommender converts free-text queries to healthcare appointments with 80%+ intent accuracy using synthetic datasets, TF-IDF, and Logistic Regression." },
  { keywords: ["routemate", "deque", "race"], response: "RouteMate prevents race conditions in bus bookings using a queue-based seat allocation system (deque). Built with Flask and MySQL." },
  { keywords: ["sih", "hackathon", "aqua"], response: "Arpita led a 6-member team in SIH 2024 to build 'Aqua Quest', a groundwater conservation web game using HTML/CSS/JS and Firebase." },
  { keywords: ["face", "verify", "recall"], response: "Face Verification mission achieved 100% recall on evaluation pairs using Siamese-style FaceNet embeddings." },
  { keywords: ["skill", "python", "stack"], response: "Arpita's processors: Python, C++, SQL. Neural expertise: RAG, CV, GenAI, and Backend (Flask/Django)." },
  { keywords: ["who", "arpita"], response: "Arpita Mishra is an ML Engineer and the architect of the Eha neural system. Currently running on the MARK-85 protocol." }
];

// --- COMPONENTS ---

const TypewriterHero = () => {
  const [text, setText] = useState("");
  const fullText = "Initializing neural links... Arpita Mishra Protocol active... Accessing archives for ML Engineer specialized in RAG & CV...";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-xs md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5 max-w-xl mx-auto mb-10">
      <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>{text}<span className="animate-pulse">_</span>
    </div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-44 h-44 flex items-center justify-center mb-8 mx-auto">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Online. Ask me anything about Ms. Mishra's missions." }]);
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
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Query not found in primary cache. Note: Arpita has 20+ other repos in her GitHub mainframe." }]);
    }, 450);
  };

  const handleDownload = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => { setIsScanning(false); window.open('/Arpita_Mishra_CV.pdf', '_blank'); }, 500);
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  const scrollTo = (id: string) => {
    setIsSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={`relative min-h-screen transition-all duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:scale-110 shadow-2xl transition-all">
        <Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} />
      </button>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className={`fixed top-0 left-0 h-full w-72 z-[210] border-r backdrop-blur-3xl p-10 flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-10 opacity-50"><X /></button>
            <div className="space-y-8">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-lg font-black uppercase tracking-[0.3em] hover:text-stark-cyan transition-colors">{item}</button>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase tracking-widest">
               Mark-85 // Arpita Mishra
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BIOMETRIC SCANNER */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-10">
            <Scan className="text-stark-cyan w-20 h-20 animate-pulse mb-8" />
            <h4 className="text-2xl font-black uppercase tracking-widest text-stark-cyan mb-4">Biometric Verification in progress...</h4>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
               <motion.div className="h-full bg-stark-cyan" animate={{ width: `${scanProgress}%` }} />
            </div>
            <p className="mt-6 font-mono text-[10px] text-stark-cyan/60 uppercase tracking-[0.4em]">Deciphering identity packet A.MISHRA_DOSSIER</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* 4. EHA WIDGET */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-80 h-[480px] border backdrop-blur-3xl rounded-xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40'}`}>
              <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10' : 'bg-stark-red/10'}`}>
                <span className={`text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Terminal size={14} /> Eha_Neural_Link</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide text-[11px] font-mono">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 text-gray-700')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-4 border-t border-white/10 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask Eha..." className="flex-1 bg-transparent border border-white/10 p-2 text-[10px] focus:outline-none" />
                <button type="submit" className={`p-2 rounded-lg ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={14} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} />
        </button>
      </div>

      {/* 5. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 Initialize // Arpita Mishra</h2>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none mb-10 uppercase">ARPITA <span className={isDark ? 'text-stark-red' : 'text-stark-gold'}>MISHRA</span></h1>
          <TypewriterHero />
          <div className="flex flex-wrap gap-5 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-12 py-5 font-black uppercase tracking-widest text-xs transition-all border-b-4 rounded-lg ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500' : 'bg-stark-gold border-amber-800 text-white hover:bg-amber-500'}`}>Identity Protocol</button>
            <button onClick={handleDownload} className={`px-12 py-5 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-lg ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10' : 'border-stark-red text-stark-red hover:bg-stark-red/10'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* 6. ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div className="relative group">
            <div className={`absolute -inset-6 border border-dashed animate-pulse rounded-xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-xl shadow-2xl ${isDark ? 'grayscale' : ''}`} />
          </div>
          <div className="space-y-8 text-xl font-light leading-relaxed">
            <h4 className="text-5xl font-black uppercase tracking-tighter leading-tight">The Visionary Architect</h4>
            <p className="italic font-bold text-2xl">"Efficiency is the only currency. If a system is noisy, it's failed armor."</p>
            <p>{PROFILE.summary}</p>
            <p>Inspired by the Stark Legacy, I architect Intelligent Armor for Data. My specialties lie in **Retrieval-Augmented Generation (RAG)** and **Computer Vision**, bridging the gap between raw inference and actionable, grounded truth.</p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 text-center">
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Repos</p></div>
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">CGPA</p></div>
              <div><p className="text-4xl font-black text-green-500">100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-16 tracking-tighter">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <div key={i} className={`p-8 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
              <div className="flex items-center gap-4 mb-8">{cat.icon}<span className="text-xs font-black uppercase tracking-widest">{cat.title}</span></div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map(s => <span key={s} className={`px-3 py-1.5 text-[10px] font-mono rounded-md ${isDark ? 'bg-white/5 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXPERIENCE */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <h4 className="text-4xl font-black uppercase text-center mb-16 tracking-tighter">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 group">
              <div className={`font-mono border-t-2 pt-4 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-2xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[10px] mt-3 underline italic uppercase tracking-widest"><FileCheck size={14} /> Verify_Uplink</a>}
              </div>
              <div className="border-l border-white/10 pl-10 pb-8 text-left">
                <h5 className="text-2xl font-black uppercase mb-1 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                <h6 className={`font-mono text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-lg font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PROJECTS */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-4xl font-black text-center uppercase mb-24 tracking-tighter">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`group relative border p-10 flex flex-col h-full transition-all rounded-2xl ${isDark ? 'bg-stark-dark border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200 hover:shadow-2xl hover:border-stark-red/40'}`}>
              <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-all duration-500 scale-150 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[9px] mb-4 uppercase tracking-[0.4em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-sm font-light leading-relaxed mb-10 flex-1 italic opacity-70 group-hover:opacity-100 italic">"{p.description}"</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {p.tags.map(t => <span key={t} className={`text-[9px] px-2.5 py-1 border font-mono rounded ${isDark ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-8 border-t border-white/10 pt-8 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-transform hover:scale-125"><Github size={22} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-transform hover:scale-125"><Globe size={22} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-transform hover:scale-125"><BookOpen size={22} /></a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center p-16 border-2 border-dashed border-white/10 rounded-2xl group hover:border-stark-cyan/40 transition-all">
          <h4 className="text-3xl font-black mb-4 uppercase tracking-tight">Access Global Mainframe</h4>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest italic">Experimental Nexus // 20+ Active Repositories</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-12 py-5 font-black uppercase rounded-lg transition-all ${isDark ? 'bg-white text-black hover:bg-stark-cyan' : 'bg-stark-red text-white hover:bg-red-500 shadow-xl'}`}>Open GitHub Database</a>
        </div>
      </section>

      {/* 10. ACHIEVEMENTS & CERTIFICATES */}
      <section className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h4 className="text-3xl font-black uppercase flex items-center gap-3"><Trophy className="text-stark-gold" /> Commendations</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-8 border-l-8 rounded-xl ${isDark ? 'bg-white/5 border-stark-gold' : 'bg-white border-amber-500 shadow-xl'}`}>
                <h5 className="text-xl font-black uppercase mb-1">{ach.title}</h5>
                <p className={`text-base italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
            <h4 className="text-3xl font-black uppercase col-span-full flex items-center gap-3"><Award className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> System Upgrades</h4>
            {CERTIFICATES.map((cert, i) => (
              <a key={i} href={cert.link} target="_blank" className={`p-6 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
                <h5 className={`text-[9px] font-mono uppercase mb-2 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
                <p className="text-[11px] font-black uppercase leading-tight mb-4">{cert.title}</p>
                <div className="text-[9px] font-mono opacity-30 group-hover:opacity-100 uppercase tracking-widest">Verify_Spec</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EDUCATION */}
      <section id="education" className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-16 tracking-tighter flex items-center justify-center gap-4"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> Academic Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {EDUCATION.map((edu, i) => (
              <div key={i} className={`p-12 border-t-8 rounded-xl text-center ${isDark ? `bg-white/5 border-stark-cyan` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-2xl font-black uppercase mb-1">{edu.title}</h5>
                <p className="text-[10px] font-mono mb-4 opacity-60 tracking-widest">{edu.school} // {edu.date}</p>
                <p className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
                <p className="text-[10px] mt-4 opacity-40 uppercase tracking-widest">{edu.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEXUS */}
      <section id="nexus" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-4xl font-black uppercase mb-16 tracking-tighter flex items-center justify-center gap-4"><Target className="text-stark-red w-10 h-10" /> Establishing Uplink</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {CONTACT_LINKS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-4 p-8 border rounded-xl transition-all ${isDark ? 'border-white/10 hover:bg-white/5 group' : 'border-gray-200 bg-white hover:shadow-xl group'}`}>
                <div className={`transition-transform scale-150 group-hover:scale-[1.8]`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest mt-3">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] border-t border-white/5 opacity-50">
        Arpita Mishra // Eha Mainframe // Silvassa, India
      </footer>
    </main>
  );
}