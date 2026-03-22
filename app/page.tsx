"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Terminal as TerminalIcon, Phone, Sun, Moon,
  Users, Coffee, Layers
} from "lucide-react";

// --- 1. THE DATA MAINFRAME (Everything from both CVs) ---

const DATA = {
  profile: {
    name: "Arpita Mishra",
    summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, clustering, similarity calibration, and production deployment. Strong foundation in data structures, backend architecture, and evaluation-driven model design.",
    cgpa: "8.11 (Top 15% of University Batch - Dean's List)",
    matric: "93.8%",
    inter: "84.8%",
    location: "Silvassa, D&NH, India",
    email: "arpitamishra2755@gmail.com",
    phone: "+91-8140006314"
  },
  skills: [
    { title: "Core Processors", icon: <Code />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
    { title: "Neural Networks & GenAI", icon: <Brain />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "Hugging Face", "Prompt Robustness"] },
    { title: "Targeting (CV)", icon: <Eye />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration"] },
    { title: "Support Systems", icon: <Server />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
  ],
  projects: [
    { title: "GitaRAG", subtitle: "Hallucination-Resistant RAG", description: "Engineered a fully extractive RAG pipeline eliminating generative hallucination using MiniLM semantic embeddings and L2-normalized FAISS search.", tags: ["FAISS", "Streamlit", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
    { title: "PromptGuard", subtitle: "LLM Robustness Framework", description: "Designed a deterministic prompt-mutation engine detecting behavioral drift across variants through a model-agnostic evaluation pipeline.", tags: ["distilgpt2", "HuggingFace", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
    { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "NLP system converting patient queries into appointment slots using Logistic Regression & TF-IDF. 80%+ intent accuracy.", tags: ["Scikit-learn", "Streamlit", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
    { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Multi-face real-time recognition using RetinaFace & FaceNet. Sub-second response via optimized nearest-neighbor search.", tags: ["RetinaFace", "FaceNet", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
    { title: "RouteMate", subtitle: "Full-Stack Reservation", description: "Engineered platform supporting concurrent workflows with queue-based seat allocation (deque) and secure session management.", tags: ["Flask", "MySQL", "CI/CD"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
    { title: "Speech Analyzer", subtitle: "Unsupervised Pattern ML", description: "NLP clustering pipeline discovering latent semantic speech patterns via UMAP dimensionality reduction (384→2) and KMeans.", tags: ["KMeans", "UMAP", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
    { title: "Face Verify", subtitle: "DL Face Verification", description: "Siamese-style face verification pipeline with 100% recall through systematic similarity threshold calibration.", tags: ["TensorFlow", "Keras", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
  ],
  experience: [
    { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends.", link: "https://forage-link.com" },
    { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities.", link: null },
    { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops.", link: null },
    { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "Sept 2023 - 2024", desc: "Competed in 36-hour ByteBash coding hackathon; coordinated full-stack workshops.", link: null }
  ],
  achievements: [
    { title: "Team Leader - SIH 2024", desc: "Led 6-member team to build 'Aqua Quest', a groundwater conservation web game." },
    { title: "1st Runner-Up - Speak & Spark", desc: "LPU CPE Creativity Challenge; built functional prototype under 15-min constraint." },
    { title: "HackerRank Software Engineer", desc: "Certified Software Engineer and SQL (Advanced) Specialist." }
  ],
  certificates: [
    { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com/..." },
    { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com/..." },
    { title: "GenAI & Prompt Engineering", issuer: "Infosys Springboard", date: "Aug 2025", link: "https://infosys.com/..." },
    { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://nptel.ac.in/..." }
  ]
};

// --- 2. EHA'S NEURAL NETWORK (Knowledge Base) ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "score", "grade", "education", "percentage", "10", "12"], 
    response: `Arpita has a CGPA of ${DATA.profile.cgpa}. In her school years, she achieved ${DATA.profile.matric} in Matriculation (10th) and ${DATA.profile.inter} in Intermediate (12th). Academic records secured.` },
  { keywords: ["routemate", "bus", "reservation"], 
    response: "RouteMate is a full-stack bus reservation system engineered by Arpita. It uses Flask and MySQL, featuring queue-based seat allocation via deque to prevent race conditions and managed CI/CD workflows." },
  { keywords: ["slot", "healthcare", "recommendation"], 
    response: "This project is an NLP intent classifier that converts free-text queries into appointment slots with 80%+ accuracy using Logistic Regression and TF-IDF." },
  { keywords: ["sih", "hackathon", "aqua", "quest"], 
    response: "Arpita led a 6-member team in the Smart India Hackathon (SIH 2024) to build 'Aqua Quest', a multi-level educational game addressing groundwater conservation." },
  { keywords: ["speak", "spark", "runner up"], 
    response: "Arpita was the 1st Runner-Up in the 'Speak and Spark' Creativity Challenge at LPU CPE, building a functional prototype under a 15-minute constraint." },
  { keywords: ["gitarag", "promptguard", "intellicampus"], 
    response: "These are Arpita's high-impact AI missions. GitaRAG focuses on extractive RAG, PromptGuard on LLM robustness, and IntelliCampus on real-time face identification." },
  { keywords: ["extra", "curricular", "github club", "coding blocks"], 
    response: "She is a core technical member of the GitHub Students Club and DSO Coding Blocks at LPU, where she led workshops and participated in the 36-hour ByteBash hackathon." },
  { keywords: ["github", "repos", "projects"], 
    response: "Arpita has over 20+ active repositories on GitHub, ranging from Full-Stack to Deep Learning. You can access her mainframe in the Nexus section." }
];

// --- 3. UI COMPONENTS ---

const ArcReactor = ({ isDark }: { isDark: boolean }) => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="relative w-48 h-48 flex items-center justify-center mb-10">
    <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-30 ${isDark ? 'border-stark-cyan shadow-[0_0_40px_#22d3ee]' : 'border-stark-red shadow-[0_0_40px_#ef4444]'}`} />
    <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red shadow-[0_0_60px_#ef4444]'}`}>
        <Zap className={isDark ? 'text-black' : 'text-white'} size={32} />
      </div>
    </div>
  </motion.div>
);

const SectionHeading = ({ icon, title, subtitle, isDark }: any) => (
  <div className="mb-16">
    <div className={`flex items-center gap-3 font-mono text-xs tracking-[0.5em] uppercase mb-4 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>
      {icon} {subtitle}
    </div>
    <h4 className="text-5xl font-black uppercase tracking-tighter">{title}</h4>
  </div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Intelligence Online. Systems optimized. Ask me anything about Arpita's missions." }]);
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
      const response = match ? match.response : "Data point not found in primary cache. Note: Arpita's GitHub mainframe contains 20+ other experimental logs.";
      setChatHistory(prev => [...prev, { role: "eha", text: response }]);
    }, 450);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className={`relative min-h-screen transition-all duration-500 ${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      
      {/* POWER MODE (DARK/LIGHT) */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full hover:rotate-180 transition-all shadow-2xl">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* EHA CHAT WIDGET */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className={`mb-4 w-80 h-[480px] border backdrop-blur-3xl rounded-xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40'}`}>
              <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Cpu size={14} /> Eha_Neural_Link</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40 hover:opacity-100 font-bold">×</button>
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
                <button type="submit" className={`px-4 py-2 rounded-lg transition-all ${isDark ? 'bg-stark-cyan text-black hover:bg-cyan-400' : 'bg-stark-red text-white hover:bg-red-500'}`}><Send size={14} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`}>
          <MessageSquare className={`${isDark ? 'text-black' : 'text-white'} w-7 h-7`} />
        </button>
      </div>

      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className={`absolute inset-0 opacity-10 ${isDark ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : ''} pointer-events-none`} />
        <ArcReactor isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 Initialize // Arpita Mishra</h2>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-10 uppercase">ARPITA <span className={isDark ? 'text-stark-red' : 'text-stark-gold'}>MISHRA</span></h1>
          <p className={`font-mono text-xs md:text-sm opacity-80 leading-relaxed max-w-2xl mx-auto border-l-2 pl-4 py-2 ${isDark ? 'text-stark-cyan border-stark-cyan/30 bg-stark-cyan/5' : 'text-stark-red border-stark-red/30 bg-stark-red/5'}`}>
            <span className="font-bold mr-2">[ROOT@EHA]:~#</span>
            {DATA.profile.summary.slice(0, 160)}...
          </p>
          <div className="flex flex-wrap gap-5 justify-center mt-12">
            <button onClick={() => scrollTo('about')} className={`px-12 py-5 font-black uppercase tracking-widest text-xs transition-all border-b-4 rounded-lg ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500' : 'bg-stark-gold border-amber-800 text-white hover:bg-amber-500'}`}>Identity Protocol</button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className={`px-12 py-5 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-lg ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10' : 'border-stark-red text-stark-red hover:bg-stark-red/10'}`}>Secure Dossier</a>
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT (IDENTITY PROTOCOL) */}
      <section id="about" className="py-40 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div className="relative group">
            <div className={`absolute -inset-6 border border-dashed animate-pulse pointer-events-none rounded-xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita Mishra" className={`w-full transition-all duration-1000 rounded-xl shadow-2xl ${isDark ? 'grayscale hover:grayscale-0' : 'hover:scale-[1.02]'}`} />
            <div className={`absolute top-6 left-6 px-4 py-2 font-mono text-[10px] uppercase backdrop-blur-xl border rounded-md ${isDark ? 'bg-black/60 border-stark-cyan/40 text-stark-cyan' : 'bg-white/60 border-stark-red/40 text-stark-red'}`}>
              BIO_SCAN: A. Mishra // MARK-85
            </div>
          </div>
          <div className="space-y-10">
            <SectionHeading icon={<User />} title="The Visionary Architect" subtitle="Identity Protocol" isDark={isDark} />
            <div className={`space-y-8 text-xl font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="italic font-bold text-2xl">"If a system can't prove its logic, it's just noise. I architect reliability."</p>
              <p>Inspired by the relentless innovation of the Stark Legacy, I specialize in building **Intelligent Armor for Data**. My core focus is **Retrieval-Augmented Generation (RAG)** and **Computer Vision**, where I bridge the massive gap between raw inference and actionable, grounded truth.</p>
              <p>As an ML Engineer, I don't just train models; I build missions. From grounding LLMs for scripture in **GitaRAG** to preventing race conditions in **RouteMate**, my goal is the total optimization of human-AI collaboration.</p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Repos</p></div>
              <div><p className={`text-4xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">CGPA</p></div>
              <div><p className={`text-4xl font-black ${isDark ? 'text-green-500' : 'text-green-600'}`}>100%</p><p className="text-[10px] uppercase font-mono tracking-widest opacity-60">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS (ARMOR SPECS) */}
      <section id="specs" className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-5xl font-black text-center uppercase mb-24 tracking-tighter">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DATA.skills.map((cat, i) => (
            <div key={i} className={`p-10 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 hover:shadow-2xl hover:border-stark-red/30'}`}>
              <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>{cat.title}</span></div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map(s => <span key={s} className={`px-3 py-1.5 text-[10px] font-mono transition-colors rounded-md ${isDark ? 'bg-white/5 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCE (MISSION LOGS) */}
      <section className={`py-40 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading icon={<Briefcase />} title="Operational History" subtitle="Mission Logs" isDark={isDark} />
          <div className="space-y-20">
            {DATA.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 group">
                <div className={`font-mono border-t-2 pt-4 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                  <span className="text-2xl font-black tracking-tighter">{exp.date}</span>
                  {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[10px] mt-3 underline italic"><FileCheck size={14} /> VERIFY_LINK</a>}
                </div>
                <div className="border-l border-white/10 pl-10 pb-10">
                  <h5 className="text-3xl font-black uppercase mb-2 group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                  <h6 className={`font-mono text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                  <p className={`text-lg font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS (TACTICAL ARCHIVES) */}
      <section id="missions" className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeading icon={<Layers />} title="Tactical Archives" subtitle="System Missions" isDark={isDark} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DATA.projects.map((p, i) => (
            <div key={i} className={`group relative border p-12 flex flex-col h-full transition-all rounded-xl ${isDark ? 'bg-stark-dark border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200 hover:shadow-2xl hover:border-stark-red/40'}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-100 transition-all duration-500 scale-150 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[10px] mb-4 uppercase tracking-[0.4em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className={`text-sm font-light leading-relaxed mb-10 flex-1 italic opacity-70 group-hover:opacity-100`}>"{p.description}"</p>
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
        <div className="mt-24 text-center p-16 border-2 border-dashed border-white/10 rounded-2xl group hover:border-stark-cyan/40 transition-all">
          <h4 className="text-3xl font-black mb-4 uppercase tracking-tight">Access Global Mainframe</h4>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest">Experimental Nexus // 20+ Active Repositories</p>
          <a href={CONTACT_LINKS.github} target="_blank" className={`px-10 py-5 font-black uppercase rounded-lg transition-all ${isDark ? 'bg-white text-black hover:bg-stark-cyan' : 'bg-stark-red text-white hover:bg-red-500 shadow-xl'}`}>Open GitHub Database</a>
        </div>
      </section>

      {/* 6. ACHIEVEMENTS & EXTRA-CURRICULAR */}
      <section className={`py-40 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={<Trophy />} title="Commendations" subtitle="Field Performance" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {DATA.achievements.map((ach, i) => (
              <div key={i} className={`p-10 border-l-8 rounded-xl ${isDark ? 'bg-white/5 border-stark-gold' : 'bg-white border-amber-500 shadow-xl'}`}>
                <h5 className="text-2xl font-black uppercase mb-2">{ach.title}</h5>
                <p className={`text-lg italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CERTIFICATES */}
      <section className="py-40 px-6 max-w-6xl mx-auto border-t border-white/5 text-center">
        <SectionHeading icon={<Award />} title="System Upgrades" subtitle="Certifications" isDark={isDark} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATA.certificates.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" className={`p-8 border rounded-xl transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
              <h5 className={`text-[10px] font-mono uppercase mb-4 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
              <p className="text-sm font-black uppercase mb-6 leading-tight">{cert.title}</p>
              <div className="text-[10px] font-mono opacity-40 group-hover:opacity-100 flex items-center justify-center gap-2 underline uppercase"><FileCheck size={12} /> Verify_Spec</div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. ACADEMIC MAINFRAME */}
      <section id="education" className={`py-40 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={<GraduationCap />} title="Academic Database" subtitle="Knowledge Source" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "B.Tech CSE", school: "LPU", score: DATA.profile.cgpa, date: "2023 - 2027", color: 'border-stark-cyan' },
              { title: "Intermediate", school: "Lions School", score: DATA.profile.inter, date: "2023", color: 'border-stark-gold' },
              { title: "Matriculation", school: "Lions School", score: DATA.profile.matric, date: "2021", color: 'border-white/30' }
            ].map((edu, i) => (
              <div key={i} className={`p-12 border-t-8 rounded-xl text-center ${isDark ? `bg-white/5 ${edu.color}` : `bg-white shadow-2xl ${edu.color}`}`}>
                <h5 className="text-2xl font-black uppercase mb-2">{edu.title}</h5>
                <p className="text-xs font-mono mb-6 opacity-60 tracking-widest">{edu.school} // {edu.date}</p>
                <p className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEXUS */}
      <section id="nexus" className="py-40 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading icon={<Target />} title="Establishing Uplink" subtitle="Global Nexus" isDark={isDark} />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { icon: <Mail />, label: "Email", link: CONTACT_LINKS.email, color: "hover:bg-red-500" },
              { icon: <Linkedin />, label: "LinkedIn", link: CONTACT_LINKS.linkedin, color: "hover:bg-blue-600" },
              { icon: <Github />, label: "GitHub", link: CONTACT_LINKS.github, color: "hover:bg-gray-700" },
              { icon: <Code />, label: "LeetCode", link: CONTACT_LINKS.leetcode, color: "hover:bg-orange-500" },
              { icon: <BookOpen />, label: "Medium", link: CONTACT_LINKS.medium, color: "hover:bg-green-600" },
              { icon: <Twitter />, label: "X", link: CONTACT_LINKS.x, color: "hover:bg-sky-500" },
              { icon: <Phone />, label: "Call", link: `tel:${CONTACT_LINKS.contact}`, color: "hover:bg-stark-cyan hover:text-black" },
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-4 p-8 border rounded-xl transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
                <div className={`transition-transform scale-150 group-hover:scale-[1.7]`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest mt-2">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.8em] border-t border-white/5 opacity-50">
        Arpita Mishra // Eha Mainframe // Silvassa, India
      </footer>
    </main>
  );
}