"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Search, Terminal as TerminalIcon, Info, Phone
} from "lucide-react";

// --- 1. DATA REPOSITORY ---

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
  { 
    title: "GitaRAG", 
    subtitle: "Hallucination-Resistant RAG", 
    description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings.", 
    tags: ["FAISS", "SentenceTransformers", "RAG"], 
    github: "https://github.com/Arpita-2755/GitaRAG", 
    demo: "https://gitarag.streamlit.app", 
    medium: "https://medium.com/@arpitamishra2755/gitarag-building-extractive-pipelines", 
    icon: <Database className="w-5 h-5 text-stark-cyan" /> 
  },
  { 
    title: "PromptGuard", 
    subtitle: "LLM Robustness Framework", 
    description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability in LLMs.", 
    tags: ["distilgpt2", "HuggingFace", "Inference Control"], 
    github: "https://github.com/Arpita-2755/PromptGuard", 
    demo: "https://promptguard-llm-robustness.streamlit.app", 
    medium: "https://medium.com/@arpitamishra2755/promptguard-testing-llm-robustness", 
    icon: <Shield className="w-5 h-5 text-stark-red" /> 
  },
  { 
    title: "IntelliCampus", 
    subtitle: "AI Smart Attendance", 
    description: "Sub-second multi-face identification pipeline using RetinaFace and FaceNet. Features auto-index rebuild logic.", 
    tags: ["OpenCV", "SQLAlchemy", "Flask"], 
    github: "https://github.com/Arpita-2755/IntelliCampus", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Eye className="w-5 h-5 text-stark-gold" /> 
  },
  { 
    title: "Slot Recommender", 
    subtitle: "Healthcare NLP Intent", 
    description: "NLP system converting free-text patient queries into healthcare appointment slots with 80%+ accuracy.", 
    tags: ["Scikit-learn", "TF-IDF", "Logistic Regression"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Activity className="w-5 h-5 text-green-400" /> 
  },
  { 
    title: "Speech Analyzer", 
    subtitle: "Unsupervised Pattern ML", 
    description: "Fully unsupervised NLP clustering pipeline discovering latent semantic speech patterns using UMAP.", 
    tags: ["KMeans", "UMAP", "NLP"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <MessageSquare className="w-5 h-5 text-blue-400" /> 
  },
  { 
    title: "Face Verify", 
    subtitle: "Deep Learning Siamese", 
    description: "Achieved 100% recall via systematic similarity threshold calibration for secure authentication.", 
    tags: ["TensorFlow", "Keras", "FaceNet"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Cpu className="w-5 h-5 text-purple-400" /> 
  },
  { 
    title: "RouteMate", 
    subtitle: "Full-Stack Reservation", 
    description: "Concurrent platform with queue-based seat allocation and managed CI/CD workflows.", 
    tags: ["Flask", "MySQL", "CI/CD"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Bus className="w-5 h-5 text-orange-400" /> 
  }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", link: "https://forage-link-to-your-certificate", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends." },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", link: null, desc: "Delivered adaptive STEM instruction for students with disabilities." },
  { role: "Core & Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", link: null, desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops." }
];

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/...", date: "Sept 2025" },
  { title: "SQL (Advanced)", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/...", date: "Sept 2025" },
  { title: "GenAI & Prompt Engineering", issuer: "Infosys", link: "https://infosys-link.com", date: "Aug 2025" },
  { title: "Privacy & Security in Social Media", issuer: "NPTEL", link: "https://nptel.ac.in/...", date: "April 2025" }
];

const JARVIS_KB = [
  { keywords: ["skill", "stack", "know", "language"], response: "Arpita's core processors include Python, C++, and SQL. Her neural architecture is optimized for GenAI and Computer Vision." },
  { keywords: ["gitarag", "gita", "rag"], response: "GitaRAG is a hallucination-resistant system using extractive RAG to ground LLM responses in religious scripture." },
  { keywords: ["experience", "deloitte", "work"], response: "She has experience with Deloitte Australia in Data Analytics and is a core member of LPU's GitHub Students Club." },
  { keywords: ["contact", "email", "reach"], response: "Uplink via arpitamishra2755@gmail.com. Secured links are available in the Nexus section." }
];

// --- 2. COMPONENTS ---

const TypewriterSummary = () => {
  const text = "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and similarity calibration. Seeking AI/ML-focused engineering roles.";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-xs md:text-sm text-stark-cyan/80 leading-relaxed max-w-2xl mx-auto border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5">
      <span className="text-stark-cyan font-bold mr-2">[ROOT@JARVIS]:~#</span>
      {displayedText}<span className="animate-pulse">_</span>
    </div>
  );
};

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "jarvis", text: "Systems online. I am JARVIS. Ask me about Arpita's database." }]);
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleJarvisChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.toLowerCase();
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      const match = JARVIS_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      const response = match ? match.response : "Query not found. Note: Arpita has 20+ other repos in her GitHub mainframe.";
      setChatHistory(prev => [...prev, { role: "jarvis", text: response }]);
    }, 500);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="relative min-h-screen bg-[#020617] text-white selection:bg-stark-cyan overflow-x-hidden font-sans">
      
      {/* 1. JARVIS WIDGET */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isJarvisOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="mb-4 w-80 h-96 bg-black/95 border border-stark-cyan/30 backdrop-blur-xl rounded-lg flex flex-col shadow-2xl">
              <div className="p-3 border-b border-white/10 bg-stark-cyan/10 flex justify-between items-center">
                <span className="text-[10px] font-mono text-stark-cyan tracking-widest uppercase flex items-center gap-2"><TerminalIcon className="w-3 h-3" /> Jarvis_v4.2</span>
                <button onClick={() => setIsJarvisOpen(false)} className="text-white/40 hover:text-white">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-2 rounded-sm text-[11px] font-mono ${msg.role === "user" ? "bg-stark-red/20 border border-stark-red/30" : "bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan"}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleJarvisChat} className="p-2 border-t border-white/10 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query JARVIS..." className="flex-1 bg-white/5 border border-white/10 p-2 text-[10px] focus:outline-none focus:border-stark-cyan" />
                <button type="submit" className="p-2 bg-stark-cyan text-black rounded-sm"><Send className="w-3 h-3" /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsJarvisOpen(!isJarvisOpen)} className="w-14 h-14 bg-stark-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_#22d3ee] hover:scale-110 transition-transform">
          <MessageSquare className="text-black w-6 h-6" />
        </button>
      </div>

      {/* 2. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stark-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-stark-cyan font-mono text-xs tracking-[1em] mb-4 uppercase opacity-60 text-center">Protocol Initialize // Mark 2755</h2>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none text-center">ARPITA <span className="text-stark-red">MISHRA</span></h1>
          <TypewriterSummary />
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <button onClick={() => scrollTo('about')} className="px-10 py-4 bg-stark-red text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 border-b-4 border-red-900 active:border-b-0 transition-all">Identity Protocol</button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className="px-10 py-4 border border-stark-cyan text-stark-cyan font-black uppercase tracking-widest text-xs hover:bg-stark-cyan/10 transition-all">Secure Dossier</a>
          </div>
        </motion.div>
      </section>

      {/* 3. ABOUT (STORYTELLING) */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-stark-cyan/30 animate-pulse pointer-events-none" />
            <img src="/arpita.jpg" alt="Arpita Mishra" className="w-full grayscale hover:grayscale-0 transition-all duration-700 rounded-sm shadow-2xl" />
            <div className="absolute top-4 left-4 p-2 bg-black/60 border border-stark-cyan/40 font-mono text-[8px] text-stark-cyan uppercase">Subject: A. Mishra // Status: Active</div>
          </div>
          <div>
            <h3 className="text-stark-cyan font-mono text-sm tracking-widest uppercase mb-6">Identity Protocol</h3>
            <h4 className="text-5xl font-black uppercase tracking-tighter mb-8">The Story of MARK-2755</h4>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg italic">
              <p>"Some people call me an Engineer. I just call myself someone who hates inefficient code."</p>
              <p className="not-italic text-white/80">Driven by relentless innovation, I have dedicated my career to building 'intelligent armor' for data. I specialize in **Computer Vision and RAG**, bridging the gap between human curiosity and artificial precision. I don't just build models; I build robust, reliability-focused missions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARMOR SPECS (SKILLS) */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-16">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((cat, i) => (
            <div key={i} className="p-8 bg-white/[0.03] border border-white/10 rounded-sm hover:border-stark-cyan/30 transition-all">
              <div className="flex items-center gap-4 mb-8">{cat.icon}<span className="text-xs font-black uppercase text-white">{cat.title}</span></div>
              <div className="flex flex-wrap gap-2">{cat.skills.map(s => <span key={s} className="px-2 py-1 bg-white/5 text-[9px] font-mono text-gray-400 hover:text-stark-cyan">{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OPERATIONAL HISTORY (EXPERIENCE) */}
      <section id="history" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-24">Operational History</h4>
          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 group">
                <div className="font-mono text-stark-red border-t border-stark-red/20 pt-2">
                  <span className="text-xl font-black">{exp.date}</span>
                  {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[9px] mt-2 underline"><FileCheck className="w-3 h-3" /> VERIFY</a>}
                </div>
                <div className="border-l border-white/10 pl-8 pb-8">
                  <h5 className="text-2xl font-black uppercase group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                  <h6 className="text-stark-cyan font-mono text-sm mb-4 uppercase">{exp.company}</h6>
                  <p className="text-gray-400 font-light italic">"{exp.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TACTICAL ARCHIVES (PROJECTS) */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto">
        <h4 className="text-4xl font-black text-center uppercase mb-24">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <div key={i} className="group relative bg-stark-dark border border-white/10 p-10 flex flex-col h-full hover:border-stark-cyan/40 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">{p.icon}</div>
              <span className="font-mono text-[9px] text-stark-cyan mb-4 uppercase">Mission Log_{100+i}</span>
              <h5 className="text-2xl font-black uppercase mb-3 group-hover:text-stark-cyan transition-colors">{p.title}</h5>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-8 flex-1 italic group-hover:text-white transition-colors">"{p.description}"</p>
              <div className="flex flex-wrap gap-1.5 mb-8">{p.tags.map(t => <span key={t} className="text-[8px] px-2 py-0.5 border border-white/5 bg-white/5 text-gray-500 font-mono">{t}</span>)}</div>
              <div className="flex gap-6 border-t border-white/5 pt-6 mt-auto">
                <a href={p.github} target="_blank" className="text-white hover:text-stark-cyan transition-colors"><Github className="w-5 h-5" /></a>
                {p.demo && <a href={p.demo} target="_blank" className="text-white hover:text-stark-cyan transition-colors"><Globe className="w-5 h-5" /></a>}
                <a href={p.medium} target="_blank" className="text-white hover:text-stark-gold transition-colors"><BookOpen className="w-5 h-5" /></a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center p-12 border border-dashed border-white/10 rounded-sm">
          <h4 className="text-xl font-bold mb-4 uppercase">Global Database Access</h4>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-xs italic font-mono uppercase">20+ Experimental Repositories Loaded</p>
          <a href={CONTACT_LINKS.github} target="_blank" className="px-6 py-3 bg-white text-black font-black uppercase text-sm hover:bg-stark-cyan transition-colors">Access Mainframe</a>
        </div>
      </section>

      {/* 7. SYSTEM UPGRADES (CERTIFICATES) */}
      <section id="certificates" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-16 flex items-center justify-center gap-4"><Award className="text-stark-gold w-10 h-10" /> System Upgrades</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATES.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" className="p-6 border border-white/10 bg-white/[0.02] hover:bg-stark-gold/10 hover:border-stark-gold/50 transition-all text-center group">
              <h5 className="text-[10px] font-mono text-stark-gold uppercase mb-2">{cert.issuer}</h5>
              <p className="text-[11px] font-bold uppercase leading-tight mb-4">{cert.title}</p>
              <div className="text-[9px] font-mono text-white/30 group-hover:text-white flex items-center justify-center gap-2"><FileCheck className="w-3 h-3" /> VERIFY_SYSTEM</div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. ACADEMIC MAINFRAME */}
      <section id="education" className="py-32 px-6 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h4 className="text-4xl font-black uppercase text-center mb-16 flex items-center justify-center gap-4"><GraduationCap className="text-stark-cyan w-10 h-10" /> Academic Mainframe</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border-l-4 border-stark-cyan bg-white/5">
              <span className="font-mono text-[10px] text-stark-cyan">2023 - 2027</span>
              <h5 className="text-xl font-black uppercase mt-2">B.Tech CSE</h5>
              <p className="text-sm text-gray-400">LPU // CGPA: 8.11</p>
            </div>
            <div className="p-8 border-l-4 border-white/20 bg-white/5">
              <span className="font-mono text-[10px] text-gray-500">2022 - 2023</span>
              <h5 className="text-xl font-black uppercase mt-2">Intermediate</h5>
              <p className="text-sm text-gray-400">Lions English School // 84.8%</p>
            </div>
            <div className="p-8 border-l-4 border-white/20 bg-white/5">
              <span className="font-mono text-[10px] text-gray-500">2020 - 2021</span>
              <h5 className="text-xl font-black uppercase mt-2">Matriculation</h5>
              <p className="text-sm text-gray-400">Lions English School // 93.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. THE NEXUS (CONTACTS) */}
      <section id="nexus" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-4xl font-black uppercase mb-16 flex items-center justify-center gap-4"><Target className="text-stark-red w-10 h-10" /> The Global Nexus</h4>
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
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-3 p-6 border border-white/10 transition-all ${s.color} group`}>
                <div className="group-hover:scale-125 transition-transform">{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-widest">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em] border-t border-white/5">
        Arpita Mishra // Jarvis Protocol v4.5 // MARK-2755 Online
      </footer>
    </main>
  );
}