"use client";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, Award, Linkedin, Mail } from "lucide-react";

const skillCategories = [
  { title: "Core Processors", icon: <Code className="w-5 h-5 text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural Networks", icon: <Brain className="w-5 h-5 text-stark-cyan" />, skills: ["TensorFlow", "Keras", "RAG", "LLMs", "SentenceTransformers", "HuggingFace"] },
  { title: "Targeting Systems", icon: <Eye className="w-5 h-5 text-stark-gold" />, skills: ["Face Recognition", "OpenCV", "FAISS", "UMAP", "KMeans", "Similarity Calibration"] },
  { title: "Support Systems", icon: <Server className="w-5 h-5 text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Flask", "Django", "MySQL", "System Design"] }
];

const projects = [
  { title: "GitaRAG", subtitle: "Hallucination-Resistant RAG", description: "Extractive RAG pipeline grounding responses in scripture via MiniLM semantic embeddings and FAISS.", tags: ["FAISS", "SentenceTransformers", "Streamlit", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag-demo.streamlit.app/", medium: "https://medium.com/@arpitamishra2755", icon: <Database className="w-5 h-5 text-stark-cyan" /> },
  { title: "PromptGuard", subtitle: "LLM Robustness Framework", description: "Deterministic prompt-mutation engine detecting behavioral drift and response instability in LLMs.", tags: ["distilgpt2", "HuggingFace", "Python", "GenAI"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-demo.streamlit.app/", medium: "https://medium.com/@arpitamishra2755", icon: <Shield className="w-5 h-5 text-stark-red" /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Real-time multi-face recognition system using RetinaFace, FaceNet (128-d), and FAISS similarity search.", tags: ["RetinaFace", "FaceNet", "Flask", "OpenCV"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye className="w-5 h-5 text-stark-gold" /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised Pattern ML", description: "NLP clustering pipeline using MiniLM embeddings and UMAP dimensionality reduction.", tags: ["KMeans", "UMAP", "NLP", "Scikit-Learn"], github: "https://github.com/Arpita-2755", demo: null, medium: null, icon: <MessageSquare className="w-5 h-5 text-blue-400" /> },
  { title: "Face Verify", subtitle: "Deep Learning Biometrics", description: "Siamese-style face verification pipeline with 100% recall via systematic threshold calibration.", tags: ["TensorFlow", "Keras", "FaceNet", "Deep Learning"], github: "https://github.com/Arpita-2755", demo: null, medium: null, icon: <Cpu className="w-5 h-5 text-purple-400" /> },
  { title: "RouteMate", subtitle: "Full-Stack Reservation", description: "Concurrent bus booking platform with queue-based seat allocation and secure session management.", tags: ["Flask", "MySQL", "JavaScript", "System Design"], github: "https://github.com/Arpita-2755", demo: null, medium: null, icon: <Bus className="w-5 h-5 text-green-400" /> }
];

const experience = [
  { company: "Deloitte Australia", role: "Data Analytics Virtual Experience", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns and modeled business trends." },
  { company: "GitHub Students Club, LPU", role: "Core & Technical Team Member", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git/GitHub workshops." },
  { company: "Smart India Hackathon", role: "Team Leader (SIH 2024)", date: "Oct 2024", desc: "Led 6-member team building educational web game using HTML/CSS/JS + MySQL." }
];

const certificates = [
  { title: "Software Engineer", issuer: "HackerRank", link: "#" },
  { title: "SQL (Advanced)", issuer: "HackerRank", link: "#" },
  { title: "Generative AI & Prompt Engineering", issuer: "Infosys Springboard", link: "#" },
  { title: "Privacy & Security in Online Social Media", issuer: "NPTEL", link: "#" }
];

export default function Home() {
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="relative min-h-screen bg-stark-dark text-white selection:bg-stark-cyan selection:text-black">
      
      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stark-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="inline-block p-1 border-2 border-dashed border-stark-cyan rounded-full mb-6">
            <div className="p-4 bg-stark-blue/10 rounded-full border border-stark-cyan shadow-[0_0_20px_rgba(34,211,238,0.3)]"><Zap className="w-12 h-12 text-stark-cyan" /></div>
          </motion.div>
          <h2 className="text-stark-cyan font-mono text-sm tracking-[0.3em] mb-2 uppercase text-center">System Status: Online</h2>
          <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase">ARPITA <span className="text-stark-red">MISHRA</span></h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8 font-light italic">"Building the future, one neuron at a time."</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollToSection('missions')} className="px-8 py-3 bg-stark-red text-white font-bold rounded-sm border-b-4 border-red-800 hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm">Access Missions</button>
            <a href="/Arpita_Mishra_CV.pdf" target="_blank" className="px-8 py-3 border border-stark-cyan text-stark-cyan font-bold rounded-sm hover:bg-stark-cyan/10 transition-all uppercase tracking-widest text-sm">Download Dossier</a>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] text-stark-cyan/50 uppercase tracking-[0.2em]">
          <div className="flex gap-8"><div>MARK: 2755</div><div>STARK INDUSTRIES VER: 4.2</div></div>
          <div className="animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Neural Link Stable</div>
        </div>
      </section>

      {/* 2. ARMOR SPECS */}
      <section id="specs" className="py-24 px-8 max-w-6xl mx-auto border-t border-white/5">
        <h3 className="text-stark-cyan font-mono text-xs tracking-[0.5em] uppercase mb-4 text-center">System Capabilities</h3>
        <h4 className="text-4xl font-black text-center uppercase tracking-tighter mb-16">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-stark-cyan/30 transition-all">
              <div className="flex items-center gap-3 mb-6">{category.icon}<span className="text-xs font-bold uppercase tracking-widest text-gray-300">{category.title}</span></div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400 hover:text-stark-cyan hover:border-stark-cyan/50 transition-colors">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION LOGS (EXPERIENCE) */}
      <section className="py-24 px-8 max-w-4xl mx-auto border-t border-white/5">
        <h4 className="text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4">
          <Briefcase className="text-stark-red w-8 h-8" /> Operational History
        </h4>
        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="relative pl-8 border-l-2 border-stark-red/30">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stark-red shadow-[0_0_10px_#ef4444]" />
              <span className="text-stark-red font-mono text-[10px] uppercase tracking-widest">{exp.date}</span>
              <h5 className="text-xl font-bold mt-1 uppercase">{exp.role}</h5>
              <h6 className="text-stark-cyan font-mono text-sm mb-4 uppercase">{exp.company}</h6>
              <p className="text-gray-400 text-sm italic font-light">"{exp.desc}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TACTICAL ARCHIVES (PROJECTS) */}
      <section id="missions" className="py-24 px-8 max-w-6xl mx-auto border-t border-white/5">
        <h4 className="text-3xl font-black text-center uppercase tracking-tighter mb-16">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group relative p-8 bg-white/5 border border-white/10 rounded-sm hover:border-stark-cyan/50 hover:bg-white/[0.08] transition-all">
              <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">{p.icon}</div>
              <h4 className="text-[10px] font-mono text-stark-cyan mb-2 uppercase tracking-widest">Mission Log #{100 + i}</h4>
              <h5 className="text-xl font-bold mb-3 group-hover:text-stark-cyan transition-colors uppercase">{p.title}</h5>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed h-12 overflow-hidden italic font-light">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">{p.tags.map(t => <span key={t} className="text-[9px] px-2 py-1 bg-stark-blue/10 border border-stark-blue/20 rounded text-stark-cyan uppercase font-mono">{t}</span>)}</div>
              <div className="flex gap-4 border-t border-white/10 pt-6">
                <a href={p.github} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-white"><Github className="w-3.5 h-3.5" /> REPO</a>
                {p.demo && <a href={p.demo} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-stark-cyan hover:text-white"><Globe className="w-3.5 h-3.5" /> LIVE_DEMO</a>}
                {p.medium && <a href={p.medium} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-stark-gold hover:text-white"><BookOpen className="w-3.5 h-3.5" /> REPORT</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SYSTEM UPGRADES (CERTIFICATES) */}
      <section className="py-24 px-8 max-w-6xl mx-auto border-t border-white/5">
        <h4 className="text-3xl font-black text-center uppercase tracking-tighter mb-16 flex items-center justify-center gap-4">
          <Award className="text-stark-gold w-8 h-8" /> System Upgrades
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" className="p-4 border border-white/10 bg-white/[0.02] hover:bg-stark-gold/10 hover:border-stark-gold/50 transition-all text-center">
              <h5 className="text-[10px] font-mono text-stark-gold uppercase mb-2">{cert.issuer}</h5>
              <p className="text-xs font-bold uppercase leading-tight">{cert.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 6. EDUCATION & FOOTER */}
      <footer className="py-24 px-8 border-t border-white/5 bg-black/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className="text-stark-cyan font-mono text-xs tracking-widest uppercase mb-6">Academic Record</h4>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg uppercase leading-tight">Bachelor of Technology - CSE</p>
                <p className="text-gray-400 text-sm uppercase">Lovely Professional University // CGPA: 8.11</p>
              </div>
              <div className="opacity-50">
                <p className="font-bold text-sm uppercase">Intermediate (Class XII)</p>
                <p className="text-gray-400 text-[10px] uppercase">Lions English School // 84.8%</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-stark-cyan font-mono text-xs tracking-widest uppercase mb-6">Direct Uplink</h4>
            <div className="flex justify-end gap-6 text-gray-400">
              <a href="https://linkedin.com/in/arpita2755" className="hover:text-stark-cyan transition-colors"><Linkedin /></a>
              <a href="https://github.com/Arpita-2755" className="hover:text-stark-cyan transition-colors"><Github /></a>
              <a href="mailto:arpitamishra2755@gmail.com" className="hover:text-stark-cyan transition-colors"><Mail /></a>
            </div>
            <p className="mt-8 text-stark-cyan/30 font-mono text-[10px] uppercase tracking-widest">Silvassa, D&NH, India</p>
          </div>
        </div>
        <p className="text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em]">
          Arpita Mishra // Jarvis Protocol v4.5 // Built for the future
        </p>
      </footer>
    </main>
  );
}