"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Terminal as TerminalIcon, Phone, Sun, Moon
} from "lucide-react";

// --- 1. THE ARCHIVES (GLOBAL CONSTANTS TO FIX VERCEL ERRORS) ---

const CONTACT_LINKS = {
  email: "mailto:arpitamishra2755@gmail.com",
  linkedin: "https://linkedin.com/in/arpita2755",
  github: "https://github.com/Arpita-2755",
  leetcode: "https://leetcode.com/u/Arpita_2755/",
  medium: "https://medium.com/@arpitamishra2755",
  x: "https://x.com/ArpitaM_2755", 
  contact: "+91-8140006314"
};

const SKILLS = [
  { title: "Core Processors", icon: <Code className="w-5 h-5 text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural Networks & GenAI", icon: <Brain className="w-5 h-5 text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness"] },
  { title: "Targeting Systems (CV)", icon: <Eye className="w-5 h-5 text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Calibration", "Threshold Optimization"] },
  { title: "Cloud & Infra", icon: <Server className="w-5 h-5 text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "System Design", "Concurrency Control"] }
];

const PROJECTS = [
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings.", tags: ["FAISS", "SentenceTransformers", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database className="w-5 h-5 text-stark-cyan" /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability in LLMs.", tags: ["distilgpt2", "HuggingFace", "Inference Control"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield className="w-5 h-5 text-stark-red" /> },
  { title: "IntelliCampus", subtitle: "Smart Attendance", description: "Sub-second multi-face identification pipeline using RetinaFace and FaceNet. Features auto-index rebuild logic.", tags: ["OpenCV", "SQLAlchemy", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye className="w-5 h-5 text-stark-gold" /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP", description: "NLP system converting free-text patient queries into healthcare appointment slots with 80%+ accuracy.", tags: ["Scikit-learn", "TF-IDF", "Logistic Regression"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity className="w-5 h-5 text-green-400" /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Fully unsupervised NLP clustering pipeline discovering latent semantic speech patterns using UMAP.", tags: ["KMeans", "UMAP", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare className="w-5 h-5 text-blue-400" /> },
  { title: "Face Verify", subtitle: "Siamese Network", description: "Achieved 100% recall via systematic similarity threshold calibration for secure authentication.", tags: ["TensorFlow", "Keras", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Concurrent platform with queue-based seat allocation and managed CI/CD workflows.", tags: ["Flask", "MySQL", "CI/CD"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus className="w-5 h-5 text-orange-400" /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", link: "https://forage-link-to-your-certificate", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends." },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", link: null, desc: "Delivered adaptive STEM instruction for students with disabilities." },
  { role: "Core & Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", link: null, desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops." }
];

const EHA_KB = [
  { keywords: ["cgpa", "grade", "score", "marks"], response: "Arpita's current CGPA at LPU is 8.11 (Top 15% of her batch). She scored 93.8% in 10th grade and 84.8% in 12th grade." },
  { keywords: ["skill", "python", "stack", "know"], response: "Her core processors include Python, C++, and SQL. Her neural architecture is specialized in GenAI (RAG), Computer Vision, and Backend (Flask/Django)." },
  { keywords: ["project", "gitarag", "slot", "build"], response: "She has architected 7 major missions, including GitaRAG, PromptGuard, and an AI Healthcare Slot Recommender. Ask me about a specific one!" },
  { keywords: ["who", "about", "arpita"], response: "Arpita Mishra is an ML Engineer specializing in retrieval systems. She is a visionary architect running on the MARK-85 protocol." },
  { keywords: ["contact", "email", "reach"], response: "Uplink via arpitamishra2755@gmail.com. All social links are available in the Nexus section." }
];

// --- 2. COMPONENTS ---

const TypewriterSummary = () => {
  const text = "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and similarity calibration.";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-xs md:text-sm text-stark-cyan opacity-80 leading-relaxed max-w-2xl mx-auto border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5">
      <span className="text-stark-cyan font-bold mr-2">[ROOT@EHA]:~#</span>
      {displayedText}<span className="animate-pulse">_</span>
    </div>
  );
};

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-48 h-48 flex items-center justify-center mb-8">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_30px_#22d3ee]' : 'border-stark-red shadow-[0_0_30px_#ef4444]'}`} />
    <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'bg-stark-red shadow-[0_0_50px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} />
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Protocol Online. How can I assist you with Arpita's database today?" }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.toLowerCase();
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      const response = match ? match.response : "Query not found in primary archives. Accessing GitHub mainframe... Arpita has over 20+ other repos available for review.";
      setChatHistory(prev => [...prev, { role: "eha", text: response }]);
    }, 400);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className={`relative min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      
      {/* 3. POWER MODE TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-6 right-6 z-[100] p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:scale-110 transition-all shadow-xl">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* 4. EHA AI WIDGET */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className={`mb-4 w-80 h-[450px] border backdrop-blur-2xl rounded-lg flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/30' : 'bg-white/95 border-stark-red/30'}`}>
              <div className={`p-3 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><TerminalIcon className="w-3 h-3" /> Eha_Neural_Link</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40 hover:opacity-100">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-sm text-[11px] font-mono ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 text-gray-700')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-3 border-t border-white/10 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask Eha..." className="flex-1 bg-transparent border border-white/10 p-2 text-[10px] focus:outline-none" />
                <button type="submit" className={`p-2 rounded-sm ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send className="w-3 h-3" /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ${isDark ? 'bg-stark-cyan shadow-stark-cyan/50' : 'bg-stark-red shadow-stark-red/50'}`}>
          <MessageSquare className={`${isDark ? 'text-black' : 'text-white'} w-6 h-6`} />
        </button>
      </div>

      {/* 5. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 Initialize // Arpita Mishra</h2>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none mb-8 uppercase">ARPITA <span className={isDark ? 'text-stark-red' : 'text-stark-gold'}>MISHRA</span></h1>
          <TypewriterSummary />
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <button onClick={() => scrollTo('about')} className={`px-10 py-4 font-black uppercase tracking-widest text-xs transition-all border-b-4 rounded-sm ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500' : 'bg-stark-gold border-amber-700 text-white hover:bg-amber-500'}`}>Identity Protocol</button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className={`px-10 py-4 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-sm ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10' : 'border-stark-red text-stark-red hover:bg-stark-red/10'}`}>Secure Dossier</a>
          </div>
        </motion.div>
      </section>

      {/* 6. ABOUT STORYTELLING */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div className="relative group">
            <div className={`absolute -inset-4 border border-dashed animate-pulse pointer-events-none ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpeg" alt="Arpita Mishra" className={`w-full transition-all duration-700 rounded-sm shadow-2xl ${isDark ? 'grayscale hover:grayscale-0' : 'sepia hover:sepia-0'}`} />
            <div className={`absolute top-4 left-4 p-2 font-mono text-[8px] uppercase backdrop-blur-md border ${isDark ? 'bg-black/60 border-stark-cyan/40 text-stark-cyan' : 'bg-white/60 border-stark-red/40 text-stark-red'}`}>Subject: Arpita // Protocol: MARK-85</div>
          </div>
          <div className="space-y-8">
            <h3 className={`font-mono text-sm tracking-widest uppercase flex items-center gap-2 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><User className="w-4 h-4" /> The Visionary Architect</h3>
            <h4 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Intelligence as an Extension of Intent</h4>
            <div className={`space-y-6 text-lg font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="italic font-bold">"Efficiency is the only currency I trade in. If a system isn't optimized, it's just noise."</p>
              <p>Driven by the same relentless innovation that defined the Stark legacy, I architect **intelligent armor for data**. My specialty lies in **Retrieval-Augmented Generation (RAG)** and **Computer Vision**, bridging the gap between raw data and actionable human insight.</p>
              <p>Whether it's grounding LLMs with **GitaRAG** or sub-second biometrics with **IntelliCampus**, I build missions that focus on reliability and precision. This portfolio is the interface to my neural database—and **Eha** is here to guide you through it.</p>
            </div>
            <div className="flex gap-8 border-t border-white/10 pt-8">
              <div><p className="text-3xl font-black text-stark-cyan">20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50">Repositories</p></div>
              <div><p className="text-3xl font-black text-stark-red">8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50">CGPA (LPU)</p></div>
              <div><p className="text-3xl font-black text-stark-gold">100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-50">Recall Success</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKILLS (SPECS) */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-16 tracking-tighter">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((cat, i) => (
            <div key={i} className={`p-8 border rounded-sm transition-all group ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-stark-cyan/30' : 'bg-gray-100 border-gray-200 hover:border-stark-red/30 shadow-sm'}`}>
              <div className="flex items-center gap-4 mb-8">{cat.icon}<span className="text-xs font-black uppercase">{cat.title}</span></div>
              <div className="flex flex-wrap gap-2">{cat.skills.map(s => <span key={s} className={`px-2 py-1 text-[9px] font-mono transition-colors ${isDark ? 'bg-white/5 text-gray-400 group-hover:text-stark-cyan' : 'bg-white text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXPERIENCE (MISSION LOGS) */}
      <section id="history" className={`py-32 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-24 tracking-tighter">Operational History</h4>
          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 group">
                <div className={`font-mono border-t pt-2 ${isDark ? 'text-stark-red border-stark-red/20' : 'text-stark-red border-stark-red/50'}`}>
                  <span className="text-xl font-black">{exp.date}</span>
                  {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[9px] mt-2 underline italic"><FileCheck className="w-3 h-3" /> VERIFY_MISSION</a>}
                </div>
                <div className="border-l border-white/10 pl-8 pb-8">
                  <h5 className="text-2xl font-black uppercase group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                  <h6 className="text-stark-cyan font-mono text-sm mb-4 uppercase tracking-widest">{exp.company}</h6>
                  <p className={`font-light italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PROJECTS */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto">
        <h4 className="text-4xl font-black text-center uppercase mb-24 tracking-tighter">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`group relative border p-10 flex flex-col h-full transition-all ${isDark ? 'bg-stark-dark border-white/10 hover:border-stark-cyan/40' : 'bg-white border-gray-200 hover:border-stark-red/40 shadow-xl'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">{p.icon}</div>
              <span className={`font-mono text-[9px] mb-4 uppercase tracking-[0.3em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-3 tracking-tighter group-hover:text-stark-cyan transition-colors">{p.title}</h5>
              <p className="text-xs font-light leading-relaxed mb-8 flex-1 italic opacity-70 group-hover:opacity-100">"{p.description}"</p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.tags.map(t => <span key={t} className={`text-[8px] px-2 py-0.5 border font-mono ${isDark ? 'border-white/5 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-400'}`}>{t}</span>)}
              </div>
              <div className="flex gap-6 border-t border-white/5 pt-6 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-colors"><Github className="w-5 h-5" /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-colors"><Globe className="w-5 h-5" /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-colors"><BookOpen className="w-5 h-5" /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ACADEMIC MAINFRAME */}
      <section id="education" className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-16 tracking-tighter flex items-center justify-center gap-4"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /> Academic Mainframe</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`p-10 border-t-4 ${isDark ? 'bg-white/5 border-stark-cyan' : 'bg-white border-stark-red shadow-lg'}`}>
              <h5 className="text-xl font-black uppercase leading-none mb-2">B.Tech CSE</h5>
              <p className="text-xs font-mono mb-4 opacity-60">LPU // 2023 - 2027</p>
              <p className={`font-black text-3xl ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>8.11 CGPA</p>
            </div>
            <div className={`p-10 border-t-4 ${isDark ? 'bg-white/5 border-stark-gold' : 'bg-white border-amber-500 shadow-lg'}`}>
              <h5 className="text-xl font-black uppercase leading-none mb-2">Intermediate</h5>
              <p className="text-xs font-mono mb-4 opacity-60">Lions School // 2023</p>
              <p className={`font-black text-3xl ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>84.8%</p>
            </div>
            <div className={`p-10 border-t-4 ${isDark ? 'bg-white/5 border-white/20' : 'bg-white border-gray-400 shadow-lg'}`}>
              <h5 className="text-xl font-black uppercase leading-none mb-2">Matriculation</h5>
              <p className="text-xs font-mono mb-4 opacity-60">Lions School // 2021</p>
              <p className="font-black text-3xl opacity-60">93.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. NEXUS */}
      <section id="nexus" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-4xl font-black uppercase mb-16 tracking-tighter flex items-center justify-center gap-4"><Target className="text-stark-red w-10 h-10" /> Establishing Uplink</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: <Mail />, label: "Email", link: CONTACT_LINKS.email, color: "hover:bg-red-500" },
              { icon: <Linkedin />, label: "LinkedIn", link: CONTACT_LINKS.linkedin, color: "hover:bg-blue-600" },
              { icon: <Github />, label: "GitHub", link: CONTACT_LINKS.github, color: "hover:bg-gray-700" },
              { icon: <Code />, label: "LeetCode", link: CONTACT_LINKS.leetcode, color: "hover:bg-orange-500" },
              { icon: <BookOpen />, label: "Medium", link: CONTACT_LINKS.medium, color: "hover:bg-green-600" },
              { icon: <Twitter />, label: "X", link: CONTACT_LINKS.x, color: "hover:bg-sky-500" },
              { icon: <Phone />, label: "Call", link: `tel:${CONTACT_LINKS.contact}`, color: "hover:bg-stark-cyan hover:text-black" },
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-3 p-6 border transition-all rounded-sm ${isDark ? 'border-white/10 hover:bg-white/5 group' : 'border-gray-200 bg-white hover:shadow-xl group'}`}>
                <div className={`group-hover:scale-125 transition-transform ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] border-t border-white/5">
        Arpita Mishra // Eha Intelligence v4.5 // Silvassa, India
      </footer>
    </main>
  );
}