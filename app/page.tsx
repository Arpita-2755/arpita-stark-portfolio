"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers
} from "lucide-react";

// --- THE MASTER DATA MAINFRAME ---
const MAINFRAME = {
  profile: {
    name: "Arpita Mishra",
    summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, clustering, similarity calibration, and production deployment. Strong foundation in data structures, backend architecture, and evaluation-driven model design.",
    cgpa: "8.11 (Dean's List - Top 15% of Batch)",
    matric: "93.8% (Lions English School)",
    inter: "84.8% (Lions English School)",
    location: "Silvassa, D&NH, India",
    email: "arpitamishra2755@gmail.com",
    phone: "+91-8140006314"
  },
  contact: {
    github: "https://github.com/Arpita-2755",
    linkedin: "https://linkedin.com/in/arpita2755",
    leetcode: "https://leetcode.com/u/Arpita_2755/",
    medium: "https://medium.com/@arpitamishra2755",
    x: "https://x.com/ArpitaM_2755"
  },
  skills: [
    { title: "Core Processors", icon: <Code className="w-5 h-5 text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
    { title: "Neural & GenAI", icon: <Brain className="w-5 h-5 text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness", "TF-IDF"] },
    { title: "Targeting (CV)", icon: <Eye className="w-5 h-5 text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration", "RetinaFace", "FaceNet"] },
    { title: "Cloud & Support", icon: <Server className="w-5 h-5 text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
  ],
  projects: [
    { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings using FAISS L2-normalization and confidence calibration.", tags: ["FAISS", "SentenceTransformers", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
    { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "Converted free-text patient queries into appointment slots. Used synthetic datasets and TF-IDF extraction with Logistic Regression to achieve 80%+ intent accuracy.", tags: ["Scikit-learn", "TF-IDF", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
    { title: "PromptGuard", subtitle: "LLM Robustness", description: "Designed a deterministic prompt-mutation engine for detecting behavioral drift and response instability in LLMs without ground-truth supervision.", tags: ["distilgpt2", "HuggingFace", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
    { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second multi-face identification using RetinaFace and FaceNet (128-d). Features calibrated similarity threshold (1.0) and modular AI engine.", tags: ["RetinaFace", "FaceNet", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
    { title: "RouteMate", subtitle: "Bus Reservation", description: "Concurrent user/admin workflows using queue-based seat allocation (deque) to prevent race conditions. Managed via structured Git CI/CD.", tags: ["Flask", "MySQL", "CI/CD"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
    { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Fully unsupervised NLP clustering pipeline using contextual MiniLM embeddings and UMAP reduction (384 to 2) with KMeans.", tags: ["KMeans", "UMAP", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
    { title: "Face Verify", subtitle: "DL Siamese Network", description: "Face verification pipeline using frozen FaceNet embeddings and custom Euclidean similarity layer. Achieved 100% recall on fixed pairs.", tags: ["TensorFlow", "Keras", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
  ],
  experience: [
    { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends.", link: "https://forage-link.com" },
    { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities; applied inclusive teaching strategies.", link: null },
    { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops.", link: null },
    { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash coding hackathon; coordinated full-stack workshops.", link: null }
  ],
  achievements: [
    { title: "Team Leader - SIH 2024", desc: "Led 6-member team for 'Aqua Quest', address groundwater conservation via educational web game (HTML/CSS/JS + Firebase)." },
    { title: "1st Runner-Up - Speak & Spark", desc: "Creativity Challenge, LPU CPE. Built functional prototype under 15-minute constraint." }
  ],
  certificates: [
    { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
    { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
    { title: "GenAI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025", link: "https://infosys.com" },
    { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://nptel.ac.in" }
  ]
};

// --- EHA'S BRAIN (Knowledge Base) ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "rank", "10th", "12th"], response: "Arpita holds an 8.11 CGPA at LPU (Dean's List). She scored 93.8% in 10th grade and 84.8% in 12th grade at Lions English School." },
  { keywords: ["routemate", "bus", "reservation", "seat"], response: "RouteMate is a full-stack reservation system. It uses a queue-based seat allocation (deque) to prevent race conditions and features secure session management with Flask/MySQL." },
  { keywords: ["slot", "healthcare", "recommendation", "appointment"], response: "The Slot Recommendation project converted free-text patient queries into appointments using Logistic Regression & TF-IDF, achieving 80%+ intent accuracy." },
  { keywords: ["sih", "aqua quest", "groundwater"], response: "As Team Leader for SIH 2024, Arpita built 'Aqua Quest', a game for groundwater conservation using HTML/CSS/JS and Firebase." },
  { keywords: ["face", "verify", "verification", "recall"], response: "Her Face Verification system achieved 100% recall. It uses a Siamese-style pipeline with frozen FaceNet embeddings." },
  { keywords: ["gitarag", "hallucination", "verse"], response: "GitaRAG is an extractive RAG system indexing 700+ verse embeddings using L2-normalized FAISS search to ensure zero hallucination." },
  { keywords: ["skill", "python", "stack", "language"], response: "Core skills include Python, C++, SQL, and Java. Specialist in RAG, Computer Vision, and Backend systems." },
  { keywords: ["who", "about", "arpita"], response: "Arpita Mishra is an ML Engineer specializing in retrieval systems and reliability-focused AI. I, Eha, am her primary neural interface." }
];

// --- COMPONENTS ---

const HUDNavbar = ({ isDark, scrollTo }: { isDark: boolean, scrollTo: (id: string) => void }) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[95%] md:w-[600px]">
      <div className={`backdrop-blur-xl border rounded-2xl p-4 flex justify-between items-center shadow-2xl ${isDark ? 'bg-black/60 border-stark-cyan/30' : 'bg-white/60 border-stark-red/30'}`}>
        {['about', 'specs', 'missions', 'nexus'].map((item) => (
          <button key={item} onClick={() => scrollTo(item)} className={`text-[10px] font-mono uppercase tracking-widest hover:scale-110 transition-transform ${isDark ? 'text-white/60 hover:text-stark-cyan' : 'text-black/60 hover:text-stark-red'}`}>
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-40 h-40 flex items-center justify-center mb-6">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-30 ${isDark ? 'border-stark-cyan shadow-[0_0_40px_#22d3ee]' : 'border-stark-red shadow-[0_0_40px_#ef4444]'}`} />
    <div className={`w-28 h-28 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red shadow-[0_0_60px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} size={24} />
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Online. Ask me anything about Arpita's missions." }]);
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
      const response = match ? match.response : "Query not found in primary cache. Arpita's GitHub mainframe contains 20+ other experimental logs.";
      setChatHistory(prev => [...prev, { role: "eha", text: response }]);
    }, 450);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={`relative min-h-screen transition-all duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      
      <HUDNavbar isDark={isDark} scrollTo={scrollTo} />

      <button onClick={() => setIsDark(!isDark)} className="fixed bottom-32 right-8 z-[110] p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className={`mb-4 w-80 h-[480px] border backdrop-blur-3xl rounded-xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40'}`}>
              <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Terminal size={14} /> Eha_Neural_Link</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40 font-bold">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-[11px] font-mono leading-relaxed ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 text-gray-700')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-4 border-t border-white/10 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query Eha..." className="flex-1 bg-transparent border border-white/10 p-2 text-[10px] focus:outline-none" />
                <button type="submit" className={`p-2 rounded-lg ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={14} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} />
        </button>
      </div>

      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 Initialize // Arpita Mishra</h2>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none mb-6 uppercase">ARPITA <span className={isDark ? 'text-stark-red' : 'text-stark-gold'}>MISHRA</span></h1>
          <div className={`font-mono text-xs md:text-sm opacity-80 leading-relaxed max-w-2xl mx-auto border-l-2 pl-4 py-2 ${isDark ? 'text-stark-cyan border-stark-cyan/30 bg-stark-cyan/5' : 'text-stark-red border-stark-red/30 bg-stark-red/5'}`}>
            <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>
            {MAINFRAME.profile.summary.slice(0, 150)}...
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-10 py-4 font-black uppercase tracking-widest text-xs transition-all border-b-4 rounded-lg ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500' : 'bg-stark-gold border-amber-800 text-white hover:bg-amber-500'}`}>Identity Protocol</button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className={`px-10 py-4 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-lg ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10' : 'border-stark-red text-stark-red hover:bg-stark-red/10'}`}>Secure Dossier</a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
          <div className="relative group">
            <div className={`absolute -inset-6 border border-dashed animate-pulse pointer-events-none rounded-xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita Mishra" className={`w-full transition-all duration-1000 rounded-xl shadow-2xl ${isDark ? 'grayscale hover:grayscale-0' : 'hover:scale-[1.02]'}`} />
          </div>
          <div className="space-y-8 text-xl font-light leading-relaxed">
            <h4 className="text-5xl font-black uppercase tracking-tighter leading-tight">The Visionary Architect</h4>
            <p className="italic font-bold text-2xl">"Innovation isn't just about code; it's about building armor for intelligence."</p>
            <p>{MAINFRAME.profile.summary}</p>
            <p>Inspired by the relentless innovation of the Stark Legacy, I specialize in building Intelligent Armor for Data. Whether it's grounding LLMs with GitaRAG or sub-second biometrics with IntelliCampus, my focus is always on reliability and precision.</p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Repos</p></div>
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">CGPA</p></div>
              <div><p className={`text-4xl font-black ${isDark ? 'text-green-500' : 'text-green-600'}`}>100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-16 tracking-tighter">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MAINFRAME.skills.map((cat, i) => (
            <div key={i} className={`p-10 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 hover:shadow-2xl hover:border-stark-red/30'}`}>
              <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-xs font-black uppercase tracking-widest">{cat.title}</span></div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map(s => <span key={s} className={`px-3 py-1.5 text-[10px] font-mono rounded-md ${isDark ? 'bg-white/5 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-12">
          <h4 className="text-4xl font-black uppercase text-center mb-16 tracking-tighter">Operational History</h4>
          {MAINFRAME.experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 group">
              <div className={`font-mono border-t-2 pt-4 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[10px] mt-3 underline italic"><FileCheck size={14} /> VERIFY</a>}
              </div>
              <div className="border-l border-white/10 pl-8 pb-8">
                <h5 className="text-2xl font-black uppercase mb-1 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                <h6 className={`font-mono text-sm mb-4 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-base font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-4xl font-black text-center uppercase mb-16 tracking-tighter leading-none">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MAINFRAME.projects.map((p, i) => (
            <div key={i} className={`group relative border p-12 flex flex-col h-full transition-all rounded-xl ${isDark ? 'bg-stark-dark border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200 hover:shadow-2xl hover:border-stark-red/40'}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-100 transition-all duration-500 scale-150 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[9px] mb-4 uppercase tracking-[0.4em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-stark-cyan transition-colors">{p.title}</h5>
              <p className="text-sm font-light leading-relaxed mb-10 flex-1 italic opacity-70 group-hover:opacity-100 italic">"{p.description}"</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {p.tags.map(t => <span key={t} className={`text-[9px] px-2.5 py-1 border font-mono rounded ${isDark ? 'border-white/10 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-8 border-t border-white/10 pt-8 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-transform hover:scale-125"><Github size={22} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-transform hover:scale-125"><Globe size={22} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-transform hover:scale-125"><BookOpen size={22} /></a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center p-16 border-2 border-dashed border-white/10 rounded-2xl group hover:border-stark-cyan/40 transition-all">
          <h4 className="text-3xl font-black mb-4 uppercase tracking-tight">Access Global Mainframe</h4>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest">Experimental Nexus // 20+ Active Repositories</p>
          <a href={MAINFRAME.contact.github} target="_blank" className={`px-10 py-5 font-black uppercase rounded-lg transition-all ${isDark ? 'bg-white text-black hover:bg-stark-cyan' : 'bg-stark-red text-white hover:bg-red-500 shadow-xl'}`}>Open GitHub Database</a>
        </div>
      </section>

      {/* ACHIEVEMENTS & CERTIFICATES */}
      <section className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h4 className="text-3xl font-black uppercase mb-12 flex items-center gap-3"><Trophy className="text-stark-gold" /> Commendations</h4>
            {MAINFRAME.achievements.map((ach, i) => (
              <div key={i} className={`p-8 border-l-8 rounded-xl ${isDark ? 'bg-white/5 border-stark-gold' : 'bg-white border-amber-500 shadow-xl'}`}>
                <h5 className="text-xl font-black uppercase mb-1">{ach.title}</h5>
                <p className={`text-base italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h4 className="text-3xl font-black uppercase mb-12 col-span-full flex items-center gap-3"><Award className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> System Upgrades</h4>
            {MAINFRAME.certificates.map((cert, i) => (
              <a key={i} href={cert.link} target="_blank" className={`p-6 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
                <h5 className={`text-[9px] font-mono uppercase mb-2 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
                <p className="text-[11px] font-black uppercase leading-tight">{cert.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={`py-24 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-16 tracking-tighter flex items-center justify-center gap-4"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> Academic Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {MAINFRAME.education.map((edu, i) => (
              <div key={i} className={`p-12 border-t-8 rounded-xl text-center ${isDark ? `bg-white/5 border-stark-cyan` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-2xl font-black uppercase mb-2">{edu.title}</h5>
                <p className="text-[10px] font-mono mb-4 opacity-60 tracking-widest">{edu.school} // {edu.date}</p>
                <p className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXUS */}
      <section id="nexus" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-4xl font-black uppercase mb-16 tracking-tighter flex items-center justify-center gap-4"><Target className="text-stark-red w-10 h-10" /> Establishing Uplink</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { icon: <Mail />, label: "Email", link: MAINFRAME.contact.email, color: "hover:bg-red-500" },
              { icon: <Linkedin />, label: "LinkedIn", link: MAINFRAME.contact.linkedin, color: "hover:bg-blue-600" },
              { icon: <Github />, label: "GitHub", link: MAINFRAME.contact.github, color: "hover:bg-gray-700" },
              { icon: <Code />, label: "LeetCode", link: MAINFRAME.contact.leetcode, color: "hover:bg-orange-500" },
              { icon: <BookOpen />, label: "Medium", link: MAINFRAME.contact.medium, color: "hover:bg-green-600" },
              { icon: <Twitter />, label: "X", link: MAINFRAME.contact.x, color: "hover:bg-sky-500" },
              { icon: <Phone />, label: "Call", link: `tel:${MAINFRAME.contact.phone}`, color: "hover:bg-stark-cyan hover:text-black" },
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-4 p-8 border transition-all rounded-xl ${isDark ? 'border-white/10 hover:bg-white/5 group' : 'border-gray-200 bg-white hover:shadow-xl group'}`}>
                <div className={`transition-transform scale-150 group-hover:scale-[1.7]`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest mt-2">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] border-t border-white/5">
        Arpita Mishra // Eha Mainframe // Silvassa, India
      </footer>
    </main>
  );
}