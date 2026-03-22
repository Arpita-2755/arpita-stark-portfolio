"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck
} from "lucide-react";

// --- DATA STRUCTURES ---

const skillCategories = [
  { title: "Core Processors", icon: <Code className="w-5 h-5 text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural Networks & GenAI", icon: <Brain className="w-5 h-5 text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness"] },
  { title: "Targeting Systems (CV)", icon: <Eye className="w-5 h-5 text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Calibration", "Threshold Optimization"] },
  { title: "Cloud & Infra", icon: <Server className="w-5 h-5 text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "System Design", "Concurrency Control"] }
];

const projects = [
  { 
    title: "GitaRAG", 
    subtitle: "Hallucination-Resistant RAG", 
    description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings.", 
    tags: ["FAISS", "SentenceTransformers", "L2-Normalization", "Streamlit"], 
    github: "https://github.com/Arpita-2755/GitaRAG", 
    demo: "https://gitarag.streamlit.app", 
    medium: "https://medium.com/@arpitamishra2755/gitarag-building-extractive-pipelines", 
    icon: <Database className="w-5 h-5 text-stark-cyan" /> 
  },
  { 
    title: "PromptGuard", 
    subtitle: "LLM Robustness Framework", 
    description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability without labeled ground truth.", 
    tags: ["distilgpt2", "HuggingFace", "Inference Control", "GenAI"], 
    github: "https://github.com/Arpita-2755/PromptGuard", 
    demo: "https://promptguard-llm-robustness.streamlit.app", 
    medium: "https://medium.com/@arpitamishra2755/promptguard-testing-llm-robustness", 
    icon: <Shield className="w-5 h-5 text-stark-red" /> 
  },
  { 
    title: "IntelliCampus", 
    subtitle: "AI Smart Attendance", 
    description: "Sub-second multi-face identification pipeline using RetinaFace and FaceNet (128-d). Features auto-index rebuild logic for FAISS.", 
    tags: ["OpenCV", "SQLAlchemy", "Flask", "Vector Search"], 
    github: "https://github.com/Arpita-2755/IntelliCampus", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755/intellicampus-ai-recognition", 
    icon: <Eye className="w-5 h-5 text-stark-gold" /> 
  },
  { 
    title: "Slot Recommender", 
    subtitle: "Healthcare NLP Intent System", 
    description: "End-to-end NLP system converting free-text patient queries into healthcare appointment slots with 80%+ classification accuracy.", 
    tags: ["Scikit-learn", "TF-IDF", "Logistic Regression", "Streamlit"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Activity className="w-5 h-5 text-green-400" /> 
  },
  { 
    title: "Speech Analyzer", 
    subtitle: "Unsupervised Pattern ML", 
    description: "Fully unsupervised NLP clustering pipeline discovering latent semantic speech patterns using UMAP dimensionality reduction.", 
    tags: ["KMeans", "UMAP", "NLP", "MiniLM"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <MessageSquare className="w-5 h-5 text-blue-400" /> 
  },
  { 
    title: "Face Verify", 
    subtitle: "Deep Learning Siamese Network", 
    description: "Achieved 100% recall on evaluation pairs through systematic similarity threshold calibration for secure authentication.", 
    tags: ["TensorFlow", "Keras", "FaceNet", "Deep Learning"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Cpu className="w-5 h-5 text-purple-400" /> 
  },
  { 
    title: "RouteMate", 
    subtitle: "Full-Stack Reservation", 
    description: "Concurrent platform with queue-based seat allocation (deque) and managed version-controlled CI/CD workflows.", 
    tags: ["Flask", "MySQL", "CI/CD", "System Design"], 
    github: "https://github.com/Arpita-2755", 
    demo: null, 
    medium: "https://medium.com/@arpitamishra2755", 
    icon: <Bus className="w-5 h-5 text-orange-400" /> 
  }
];

const operationalHistory = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", link: "https://forage-certificate-link.com", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends." },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", link: null, desc: "Delivered adaptive STEM instruction for students with disabilities; applied inclusive teaching strategies." },
  { role: "Core & Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", link: null, desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops." },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", link: null, desc: "Competed in 36-hour ByteBash hackathon; coordinated full-stack workshops." }
];

const systemUpgrades = [
  { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025" },
  { title: "Generative AI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025" },
  { title: "Privacy & Security in Social Media (Elite)", issuer: "NPTEL", date: "April 2025" }
];

// --- COMPONENTS ---

const TypewriterSummary = () => {
  const text = "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and similarity calibration. Seeking AI/ML-focused engineering roles with end-to-end system ownership.";
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
      <span className="text-stark-cyan font-bold tracking-tighter mr-2">[ROOT@JARVIS]:~#</span>
      {displayedText}
      <span className="animate-pulse">_</span>
    </div>
  );
};

export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="relative min-h-screen bg-stark-dark text-white selection:bg-stark-cyan selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stark-blue/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 relative">
           <div className="absolute inset-0 bg-stark-cyan/20 blur-2xl rounded-full animate-pulse" />
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="p-1 border-2 border-dashed border-stark-cyan rounded-full relative">
              <div className="p-6 bg-stark-dark/80 rounded-full border border-stark-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <Zap className="w-16 h-16 text-stark-cyan" />
              </div>
           </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-stark-cyan font-mono text-xs tracking-[0.6em] mb-4 uppercase">Protocol Initialize: Arpita Mishra</h2>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase leading-none">
            ARPITA <span className="text-stark-red inline-block hover:skew-x-6 transition-transform">MISHRA</span>
          </h1>
          
          <TypewriterSummary />

          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <button onClick={() => scrollTo('missions')} className="group relative px-10 py-4 bg-stark-red text-white font-black overflow-hidden rounded-sm transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-sm">
                Initialize Missions <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className="px-10 py-4 border-2 border-stark-cyan text-stark-cyan font-black rounded-sm hover:bg-stark-cyan hover:text-black transition-all tracking-widest uppercase text-sm">
              Secure Dossier
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-10 hidden lg:block font-mono text-[10px] text-stark-cyan/40">
           <p className="">// SYSTEM_LATENCY: 14MS</p>
           <p className="">// NEURAL_LINK: STABLE</p>
        </div>
      </section>

      {/* 2. ARMOR SPECS (SKILLS) */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <h3 className="text-stark-cyan font-mono text-sm tracking-widest uppercase mb-4">Specs // 01</h3>
            <h4 className="text-5xl font-black uppercase tracking-tighter leading-none">Armor Specifications</h4>
          </div>
          <div className="h-[2px] flex-1 bg-white/5 mx-10 hidden md:block"></div>
          <p className="text-gray-500 font-mono text-[10px] uppercase text-right tracking-[0.3em]">Total Systems Optimized: 24</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="group p-8 bg-white/[0.03] border border-white/10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-stark-cyan group-hover:h-full transition-all duration-500" />
              <div className="flex items-center gap-4 mb-8">
                {cat.icon}
                <span className="text-xs font-black uppercase tracking-widest text-white">{cat.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(s => (
                  <span key={s} className="px-2 py-1 bg-white/5 border border-white/5 text-[9px] font-mono text-gray-400 group-hover:text-stark-cyan transition-colors">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. OPERATIONAL HISTORY (EXPERIENCE) */}
      <section className="py-32 px-6 bg-white/[0.01] relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <Briefcase className="w-12 h-12 text-stark-red mx-auto mb-6" />
            <h4 className="text-5xl font-black uppercase tracking-tighter">Operational History</h4>
            <p className="text-stark-cyan font-mono text-xs uppercase tracking-[0.5em] mt-2">Mission Logs 2023 - 2025</p>
          </div>

          <div className="space-y-16">
            {operationalHistory.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 group">
                <div className="font-mono pt-2 text-stark-red border-t border-stark-red/20">
                  <span className="text-xl font-black">{exp.date}</span>
                  {exp.link && (
                    <a href={exp.link} target="_blank" className="flex items-center gap-1 text-[9px] mt-2 hover:underline">
                      <FileCheck className="w-3 h-3" /> VERIFY_CREDENTIAL
                    </a>
                  )}
                </div>
                <div className="border-l border-white/10 pl-8 pb-8">
                  <h5 className="text-2xl font-black uppercase group-hover:text-stark-cyan transition-colors">{exp.role}</h5>
                  <h6 className="text-stark-cyan font-mono text-sm mb-4 uppercase tracking-widest">{exp.company}</h6>
                  <p className="text-gray-400 leading-relaxed font-light italic">"{exp.desc}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TACTICAL ARCHIVES (PROJECTS) */}
      <section id="missions" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div>
            <h3 className="text-stark-cyan font-mono text-sm tracking-widest uppercase mb-4">Archives // 02</h3>
            <h4 className="text-5xl font-black uppercase tracking-tighter leading-none">Tactical Projects</h4>
          </div>
          <p className="max-w-xs text-xs text-gray-500 font-mono uppercase tracking-widest leading-relaxed">
            High-impact ML systems focused on retrieval, classification, and biometrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group relative bg-stark-dark border border-white/10 p-10 flex flex-col h-full hover:border-stark-cyan/40 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">{p.icon}</div>
              <span className="font-mono text-[9px] text-stark-cyan mb-4 tracking-[0.4em] uppercase">Log: Mission_{100 + i}</span>
              <h5 className="text-2xl font-black uppercase mb-3 tracking-tighter group-hover:text-stark-cyan transition-colors">{p.title}</h5>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-8 flex-1 italic group-hover:text-white transition-colors">"{p.description}"</p>
              
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.tags.map(t => (
                  <span key={t} className="text-[8px] px-2 py-0.5 border border-white/5 bg-white/5 text-gray-500 font-mono uppercase">{t}</span>
                ))}
              </div>

              <div className="flex gap-6 border-t border-white/5 pt-6 mt-auto">
                <a href={p.github} target="_blank" className="text-white hover:text-stark-cyan transition-colors"><Github className="w-5 h-5" /></a>
                {p.demo && <a href={p.demo} target="_blank" className="text-white hover:text-stark-cyan transition-colors"><Globe className="w-5 h-5" /></a>}
                <a href={p.medium} target="_blank" className="text-white hover:text-stark-gold transition-colors"><BookOpen className="w-5 h-5" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & UPGRADES */}
      <section className="py-32 px-6 bg-white/[0.01] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h4 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-3">
              <Trophy className="text-stark-gold w-8 h-8" /> Field Commendations
            </h4>
            <div className="space-y-8">
              <div className="p-6 border-l-4 border-stark-gold bg-white/5">
                <p className="text-stark-gold font-mono text-[10px] uppercase">Smart India Hackathon 2024</p>
                <h5 className="text-xl font-black uppercase mt-1 text-white">Team Leader // Aqua Quest</h5>
                <p className="text-xs text-gray-400 mt-2">Led 6-member team to architect a multi-level educational game for groundwater conservation.</p>
              </div>
              <div className="p-6 border-l-4 border-stark-gold bg-white/5">
                <p className="text-stark-gold font-mono text-[10px] uppercase">Speak and Spark Challenge</p>
                <h5 className="text-xl font-black uppercase mt-1 text-white">1st Runner-Up</h5>
                <p className="text-xs text-gray-400 mt-2">Built functional prototype under 15-minute constraint demonstrating rapid technical execution.</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-3">
              <Award className="text-stark-cyan w-8 h-8" /> System Upgrades
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemUpgrades.map((u, i) => (
                <div key={i} className="p-4 border border-white/10 hover:border-stark-cyan/30 transition-all">
                  <p className="text-stark-cyan font-mono text-[9px] uppercase tracking-widest">{u.issuer}</p>
                  <p className="text-[11px] font-bold uppercase mt-1 leading-tight">{u.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDUCATION & CONTACT */}
      <footer className="py-32 px-6 border-t border-white/5 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-md">
            <h4 className="text-stark-cyan font-mono text-xs uppercase tracking-widest mb-10">Academic Mainframe</h4>
            <div className="mb-8">
              <p className="text-2xl font-black uppercase tracking-tight">Lovely Professional University</p>
              <p className="text-stark-cyan font-mono text-sm uppercase">B.Tech - Computer Science Engineering</p>
              <div className="flex gap-4 mt-2 text-[10px] font-mono text-gray-500 uppercase">
                 <span>CGPA: 8.11</span>
                 <span>//</span>
                 <span>Dean's List (Top 15%)</span>
              </div>
            </div>
            <div className="opacity-40">
              <p className="font-bold text-sm uppercase">Lions English School</p>
              <p className="text-[10px] font-mono uppercase tracking-widest">Matriculation: 93.8% // Intermediate: 84.8%</p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <h4 className="text-stark-cyan font-mono text-xs uppercase tracking-widest mb-10 text-right">Contact Uplink</h4>
            <div className="flex gap-8 mb-12">
              <a href="https://linkedin.com/in/arpita2755" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-stark-cyan hover:text-black transition-all"><Linkedin className="w-6 h-6" /></a>
              <a href="https://github.com/Arpita-2755" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-stark-cyan hover:text-black transition-all"><Github className="w-6 h-6" /></a>
              <a href="mailto:arpitamishra2755@gmail.com" className="p-4 bg-white/5 rounded-full hover:bg-stark-red hover:text-white transition-all"><Mail className="w-6 h-6" /></a>
            </div>
            <p className="font-mono text-xs text-stark-cyan/40 text-right tracking-[0.5em] uppercase">
              Silvassa, D&NH, India // 396230
            </p>
          </div>
        </div>
        
        <div className="mt-40 pt-10 border-t border-white/5 text-center flex flex-col items-center">
           <div className="w-8 h-[2px] bg-stark-red mb-4" />
           <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em]">
              Jarvis-Interface v4.755 // MARK-2755 Deployment // Arpita Mishra © 2026
           </p>
        </div>
      </footer>
    </main>
  );
}