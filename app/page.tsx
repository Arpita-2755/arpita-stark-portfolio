"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Loader2, Radar
} from "lucide-react";

// --- DATA REPOSITORY (UNTOUCHED) ---
const PROFILE = {
  name: "Arpita Mishra",
  summary: "Designing intelligent systems that don't just predict — they understand. ML Engineer focused on Retrieval-Augmented Generation, Computer Vision, and production-grade AI pipelines built for reliability, not demos.",
  cgpa: "8.11 (Dean's List - Top 15%)",
  matric: "93.8%",
  inter: "84.8%",
  phone: "+91-8140006314",
  email: "arpitamishra2755@gmail.com"
};

const SKILLS = [
  { title: "Core Engineering", icon: <Code className="text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "ML & GenAI Systems", icon: <Brain className="text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness", "TF-IDF"] },
  { title: "Computer Vision", icon: <Eye className="text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration", "RetinaFace", "FaceNet"] },
  { title: "Infrastructure & Deployment", icon: <Server className="text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
];

const PROJECTS = [
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination through semantic grounding in 700+ verse embeddings using FAISS L2-normalized search (0.45 threshold) and mean-confidence calibration.", tags: ["FAISS", "MiniLM", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app/", medium: "https://medium.com/@arpitamishra2755/️-building-gitarag-a-hallucination-resistant-retrieval-system-for-the-bhagavad-gita-872bbd122784", icon: <Database /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and response instability in LLMs without requiring labeled ground truth. Enforced inference determinism.", tags: ["distilgpt2", "HuggingFace", "Python"], github: "https://github.com/Arpita-2755/promptguard-llm-robustness", demo: "https://promptguard-llm-robustness.streamlit.app/", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second multi-face identification using RetinaFace and FaceNet. Built a modular AI engine decoupled from Flask routes, supporting automatic FAISS index rebuilding.", tags: ["RetinaFace", "FaceNet", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755/building-intellicampus-an-ai-powered-face-recognition-attendance-system-end-to-end-architecture-86f422e0c6d9", icon: <Eye /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "Unsupervised NLP clustering pipeline discovering latent semantic speech patterns using contextual MiniLM embeddings and UMAP dimensionality reduction (384 to 2) followed by KMeans (k=3).", tags: ["UMAP", "KMeans", "NLP"], github: "https://github.com/Arpita-2755/unsupervised-speech-pattern-analysis", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Face verification pipeline using frozen FaceNet embeddings and custom Euclidean similarity layer. Achieved 100% recall on fixed evaluation pairs via similarity threshold calibration.", tags: ["TensorFlow", "Keras", "FaceNet"], github: "https://github.com/Arpita-2755/Face_Verification_App", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack reservation platform using queue-based seat allocation (deque) to prevent race conditions. Implemented secure session management and automated notifications.", tags: ["Flask", "MySQL", "System Design"], github: "https://github.com/Arpita-2755/RouteMate", demo: null, medium: "https://medium.com/@arpitamishra2755/routemate-designing-a-fair-modern-bus-reservation-system-with-flask-c4407b66610e", icon: <Bus /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "NLP system converting patient queries into appointment slots. Implemented hierarchical recommendation mapping intent to urgency levels with 80%+ accuracy using synthetic datasets and TF-IDF.", tags: ["Scikit-learn", "TF-IDF", "Streamlit"], github: "https://github.com/Arpita-2755/healthcare-appointment-slot-recommendation-nlp", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to detect anomalies and extract actionable patterns. Built data-driven insights for trend modeling and anomaly detection in structured datasets.", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_DgRXPzHLgAapZKy5Z_1752003393777_completion_certificate.pdf" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM education for students with disabilities. Focused on inclusive teaching methods and applied problem-solving approaches.", link: null },
  { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Contributed to scaling a 300+ member tech community. Led Git & GitHub workshops and supported peer learning initiatives.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Participated in competitive hackathons and full-stack workshops. Built rapid prototypes under time constraints and collaborated in high-pressure environments.", link: null }
];

const ACHIEVEMENTS = [
  { title: "Team Leader - SIH 2024", desc: "Led 6-member team to build 'Aqua Quest', address groundwater conservation via educational web game (HTML/CSS/JS + Firebase)." },
  { title: "1st Runner-Up - Speak & Spark", desc: "Creativity Challenge, LPU CPE. Built functional tech prototype under a 15-minute constraint." }
];

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://www.hackerrank.com/certificates/4e6f57b068ee" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://www.hackerrank.com/certificates/dadc73f559b0" },
  { title: "GenAI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025", link: "https://drive.google.com/drive/folders/1ILY2TIo-1WFJB7W4fFisIFTKVlJr9CMa" },
  { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs79/Course/NPTEL25CS79S24750097504479896.pdf" }
];

const EDUCATION = [
  { title: "B.Tech CSE", school: "Lovely Professional University | Phagwara, Punjab", score: "8.11 CGPA", date: "2023 - 2027", detail: "Dean's List - Top 15%" },
  { title: "Intermediate", school: "Lions English School | Silvassa, D&NH", score: "84.8%", date: "2022 - 2023", detail: "PCM Distinction" },
  { title: "Matriculation", school: "Lions English School | Silvassa, D&NH", score: "93.8%", date: "2020 - 2021", detail: "Distinction" }
];

const CONTACT_LINKS = [
  { icon: <Mail />, label: "Email", link: `mailto:${PROFILE.email}`, color: "hover:bg-red-500" },
  { icon: <Linkedin />, label: "LinkedIn", link: "https://linkedin.com/in/arpita2755", color: "hover:bg-blue-600" },
  { icon: <Github />, label: "GitHub", link: "https://github.com/Arpita-2755", color: "hover:bg-gray-700" },
  { icon: <Code />, label: "LeetCode", link: "https://leetcode.com/u/Arpita-27/", color: "hover:bg-orange-500" },
  { icon: <BookOpen />, label: "Medium", link: "https://medium.com/@arpitamishra2755", color: "hover:bg-green-600" },
  { icon: <Twitter />, label: "X", link: "https://x.com/Arpita2109", color: "hover:bg-sky-500" },
  { icon: <Phone />, label: "Call", link: `tel:${PROFILE.phone}`, color: "hover:bg-stark-cyan hover:text-black" }
];

const EHA_KB = [

  // 🧠 IDENTITY
  {
    keywords: ["who", "arpita", "mishra"],
    response: "Arpita Mishra is a Machine Learning Engineer specializing in retrieval systems, representation learning, and reliability-focused AI system design. She builds end-to-end ML pipelines involving embeddings, vector search, clustering, and production deployment. Her work focuses on grounded AI systems — not just accurate, but dependable and interpretable."
  },

  // 🎯 CAREER OBJECTIVE
  {
    keywords: ["goal", "objective", "career", "seeking", "looking"],
    response: "Arpita is seeking AI/ML engineering roles and software engineering internships where she can own end-to-end system development — from modeling to deployment — with a strong focus on real-world reliability and system design."
  },

  // 🎓 EDUCATION
  {
    keywords: ["cgpa", "marks", "score", "grade", "education", "10th", "12th", "school", "college", "dean"],
    response: "Arpita is pursuing B.Tech in Computer Science at Lovely Professional University with an 8.11 CGPA, ranking in the top 15% (Dean’s List). She scored 84.8% in Intermediate and 93.8% in Matriculation from Lions English School."
  },

  // 💻 TECH STACK
  {
    keywords: ["skills", "tech", "stack", "languages", "tools", "technologies"],
    response: "Arpita's stack includes Python, C++, C, Java, SQL, and JavaScript. She works with TensorFlow, Keras, Scikit-learn, SentenceTransformers (MiniLM), FAISS, UMAP, and KMeans. Her expertise spans RAG systems, prompt robustness testing, Computer Vision (FaceNet, RetinaFace), and backend systems using Flask, Django, and REST APIs. She also has experience with AWS (EC2, S3), Docker, Git, and system design principles."
  },

  // 🧠 CORE ML EXPERTISE
  {
    keywords: ["ml", "ai", "specialization", "domain", "focus"],
    response: "Her core expertise lies in Retrieval-Augmented Generation (RAG), embedding systems, vector similarity search, unsupervised learning, prompt robustness testing, and Computer Vision pipelines. She focuses on building reliable AI systems using threshold calibration, inference control, and evaluation-driven design."
  },

  // 🔍 GITARAG
  {
    keywords: ["gitarag", "rag", "hallucination", "faiss", "embedding"],
    response: "GitaRAG is a hallucination-resistant RAG system engineered using MiniLM embeddings and FAISS vector search over 700+ verse-level embeddings. It uses L2-normalization, a 0.45 similarity threshold, and mean-confidence calibration to suppress weak matches. A thematic clustering layer ensures doctrinal consistency, and an interactive interface validates retrieval quality."
  },

  // 🛡️ PROMPTGUARD
  {
    keywords: ["promptguard", "llm", "robustness", "drift", "mutation"],
    response: "PromptGuard is a model-agnostic LLM robustness evaluation framework. It uses a deterministic prompt mutation engine to generate controlled semantic variations and detect behavioral drift without labeled data. The system enforces deterministic inference via temperature and token constraints and provides an interactive evaluation dashboard."
  },

  // 🎯 INTELLICAMPUS
  {
    keywords: ["intellicampus", "attendance", "face", "recognition", "facenet"],
    response: "IntelliCampus is a real-time AI attendance system combining RetinaFace detection, FaceNet embeddings (128-d), and FAISS similarity search. It achieves sub-second identification latency and uses calibrated thresholds (production: 1.0). The system features a modular architecture, automatic FAISS index rebuilding, and attendance analytics."
  },

  // 🧠 SPEECH ANALYZER
  {
    keywords: ["speech", "analyzer", "unsupervised", "nlp", "clustering"],
    response: "The Unsupervised Speech Pattern Analyzer is an NLP pipeline using MiniLM embeddings, UMAP dimensionality reduction (384→2), and KMeans clustering (k=3). It discovers latent semantic speech patterns without labeled data and includes an interactive visualization dashboard for cluster analysis."
  },

  // 🔐 FACE VERIFICATION
  {
    keywords: ["face verification", "siamese", "deep learning"],
    response: "Arpita built an end-to-end face verification system using a Siamese-style architecture with FaceNet embeddings and a custom Euclidean similarity layer. Through systematic threshold calibration, the model achieved 100% recall on evaluation pairs, prioritizing secure authentication with minimal false negatives."
  },

  // 🚌 ROUTEMATE
  {
    keywords: ["routemate", "bus", "booking", "deque", "race condition"],
    response: "RouteMate is a full-stack bus reservation system built with Flask and MySQL. It prevents race conditions using a queue-based seat allocation system (deque), supports concurrent user/admin workflows, and includes secure session management with automated notifications."
  },

  // 🏥 SLOT RECOMMENDER (NEW ADDITION)
  {
    keywords: ["slot", "healthcare", "recommendation", "nlp", "tfidf"],
    response: "The Appointment Slot Recommendation system is an end-to-end NLP pipeline that converts free-text patient queries into structured healthcare appointment slots. It uses TF-IDF feature extraction and Logistic Regression, achieving 80%+ intent classification accuracy. A hierarchical mapping system links user intent to department, urgency, and optimal time slot, and the system is deployed via Streamlit for real-time interaction."
  },

  // 💼 EXPERIENCE
  {
    keywords: ["experience", "work", "deloitte", "internship"],
    response: "Arpita participated in the Deloitte Australia Data Analytics Virtual Experience, where she analyzed transactional datasets to identify anomalies and model business trends. She also worked as a Community Service Intern at the Indian Red Cross Society, delivering adaptive STEM education using inclusive teaching strategies."
  },

  // 👥 LEADERSHIP
  {
    keywords: ["leadership", "team", "club", "github", "coding blocks"],
    response: "Arpita is an active technical contributor and leader. At the GitHub Students Club (LPU), she supported recruitment of 300+ members and conducted Git/GitHub workshops. She was also part of Coding Blocks (DSO), where she participated in hackathons and coordinated full-stack development workshops."
  },

  // 🏆 ACHIEVEMENTS
  {
    keywords: ["achievement", "award", "sih", "hackathon", "winner"],
    response: "Arpita was Team Leader at Smart India Hackathon 2024, leading a 6-member team to build Aqua Quest — a web-based educational game for groundwater conservation using HTML, CSS, JavaScript, and Firebase. She is also a 1st Runner-Up in the Speak & Spark Creativity Challenge, where she built a functional prototype within 15 minutes."
  },

  // 📜 CERTIFICATIONS
  {
    keywords: ["certificates", "certifications", "hackerRank", "nptel", "infosys"],
    response: "Arpita holds certifications including Software Engineer and SQL (Advanced) from HackerRank, Generative AI & Prompt Engineering from Infosys Springboard, and Privacy & Security in Social Media (Elite) from NPTEL."
  },

  // ⚙️ SYSTEM DESIGN MINDSET
  {
    keywords: ["design", "approach", "philosophy", "system"],
    response: "Arpita approaches AI as a systems engineering problem. Her focus is on building modular, scalable, and reliable pipelines with strong evaluation frameworks, threshold calibration, and controlled inference. She prioritizes grounded outputs over black-box predictions."
  },
  {
  keywords: ["why hire", "why you", "why arpita"],
  response: "Because I don't just build models — I build systems that work in the real world. My focus is on reliability, grounding, and end-to-end ownership. I care about what happens after deployment — not just accuracy on a notebook."
}
];

// --- UI HELPERS ---

const NeuralBackground = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let particles: any[] = [];
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: Math.random() * 2 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(239, 68, 68, 0.4)';
      ctx.strokeStyle = isDark ? 'rgba(34, 211, 238, 0.05)' : 'rgba(239, 68, 68, 0.05)';
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]; const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        }
      });
      requestAnimationFrame(draw);
    }; draw();
  }, [isDark]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

const TiltCard = ({ children, className }: any) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX); const springY = useSpring(rotateY);
  return (
    <motion.div 
      onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2); }} 
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CustomCursor = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
  return (
    <motion.div 
      className={`fixed top-0 left-0 w-10 h-10 border-[1px] rounded-full pointer-events-none z-[1000] hidden lg:flex items-center justify-center ${isDark ? 'border-stark-cyan/50' : 'border-stark-red/50'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    ><div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} /></motion.div>
  );
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Protocol Online. Neural links active." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [heroText, setHeroText] = useState("");
  const fullHeroText = "[CORE ONLINE] Building grounded AI systems. [STATUS] RAG | CV | ML Infrastructure | Production Deployment";

  useEffect(() => {
    let i = 0; let isDeleting = false;
    const type = () => {
      const currentText = fullHeroText;
      if (!isDeleting) {
        setHeroText(currentText.slice(0, i + 1)); i++;
        if (i === currentText.length) { setTimeout(() => isDeleting = true, 3000); }
      } else {
        setHeroText(currentText.slice(0, i - 1)); i--;
        if (i === 0) isDeleting = false;
      }
    };
    const timer = setInterval(type, 30); return () => clearInterval(timer);
  }, []);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase(); setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Segment not found. Check GitHub database." }]);
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
      <NeuralBackground isDark={isDark} />
      
      {/* 1. SIDEBAR */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[200] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-110 shadow-2xl transition-all"><Menu className={isDark ? 'text-stark-cyan' : 'text-stark-red'} /></button>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ x: -350 }} animate={{ x: 0 }} exit={{ x: -350 }} className={`fixed top-0 left-0 h-full w-80 z-[210] border-r backdrop-blur-3xl p-12 flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
            <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-12 opacity-50"><X /></button>
            <div className="space-y-10">
              {['about', 'specs', 'history', 'missions', 'nexus'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block text-xl font-black uppercase tracking-[0.4em] hover:text-stark-cyan transition-all hover:translate-x-4">{item}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SCANNING UI */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-10">
            <Scan className="text-stark-cyan w-24 h-24 animate-pulse mb-8" />
            <h4 className="text-3xl font-black uppercase tracking-[0.4em] text-stark-cyan">Decrypting Identity...</h4>
            <div className="w-80 h-1 bg-white/10 rounded-full mt-10 overflow-hidden relative"><motion.div className="absolute h-full bg-stark-cyan" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:rotate-180 transition-all">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* 4. EHA CHAT */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[500px] border backdrop-blur-3xl rounded-2xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40'}`}>
              <div className={`p-5 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Cpu size={16} /> Eha Intelligence</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40">×</button>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide text-[11px] font-mono leading-relaxed">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-xl ${msg.role === "user" ? 'bg-stark-red/10 border border-stark-red/30' : (isDark ? 'bg-stark-cyan/10 border border-stark-cyan/30 text-stark-cyan' : 'bg-gray-100 border border-gray-200 shadow-sm')}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleEhaChat} className="p-5 border-t border-white/10 flex gap-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query Eha..." className="flex-1 bg-transparent border border-white/10 p-3 text-xs focus:outline-none" />
                <button type="submit" className={`px-5 py-2 rounded-lg transition-all ${isDark ? 'bg-stark-cyan text-black' : 'bg-stark-red text-white'}`}><Send size={16} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsEhaOpen(!isEhaOpen)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all ${isDark ? 'bg-stark-cyan shadow-stark-cyan/40' : 'bg-stark-red shadow-stark-red/40'}`}>
          <MessageSquare className={isDark ? 'text-black' : 'text-white'} size={28} />
        </button>
      </div>

      {/* 5. HERO (ENHANCED WITH ARC GLOW) */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div animate={{ rotate: 360, scale: [1, 1.05, 1] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} className="relative w-44 h-44 flex items-center justify-center mb-10 mx-auto">
          <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'border-stark-red shadow-[0_0_50px_#ef4444]'}`} />
          <div className={`w-30 h-30 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
            <div className={`w-18 h-18 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_80px_#22d3ee]' : 'bg-stark-red shadow-[0_0_80px_#ef4444]'}`}>
              <Zap className={isDark ? 'text-black' : 'text-white'} size={28} />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className={`font-mono text-xs tracking-[1.5em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>INITIATING SYSTEM: ML SYSTEMS ENGINEER</h2>
          <h1 className={`text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-12 uppercase select-none transition-all duration-1000 ${isDark ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-pulse' : 'text-gray-900'}`}>
            ARPITA <span className={isDark ? 'text-stark-red drop-shadow-[0_0_20px_#ef4444]' : 'text-stark-gold'}>MISHRA</span>
          </h1>
          <div className="font-mono text-[10px] md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5 max-w-2xl mx-auto mb-10 text-left">
            <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>{heroText}<span className="animate-pulse">_</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-16 py-6 font-black uppercase tracking-widest text-xs transition-all border-b-8 rounded-2xl ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 hover:-translate-y-1' : 'bg-stark-gold border-amber-500 text-white hover:bg-amber-500'}`}>Enter System</button>
            <button onClick={handleDownload} className={`px-16 py-6 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-2xl ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10 hover:shadow-[0_0_30px_#22d3ee]' : 'border-stark-red text-stark-red hover:bg-stark-red/10'}`}>Access Resume</button>
          </div>
        </motion.div>
      </section>

      {/* 6. ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <TiltCard className="relative group">
            <div className={`absolute -inset-8 border border-dashed animate-[spin_30s_linear_infinite] rounded-3xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpeg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-3xl shadow-2xl ${isDark ? 'grayscale brightness-75 hover:grayscale-0' : ''}`} />
          </TiltCard>
          <div className="space-y-10 text-xl font-light leading-relaxed">
            <h4 className="text-5xl font-black uppercase tracking-tighter leading-tight">The Visionary Architect</h4>
            <p className="italic font-bold text-3xl leading-tight">""If your model hallucinates, your system design failed.
Grounding isn't optional — it's the architecture.""</p>
            <p>{PROFILE.summary}</p>
            <p>I build machine learning systems that are not just accurate — but dependable. My work focuses on retrieval-based AI, embedding systems, and real-world ML pipelines where performance, explainability, and stability matter more than hype. From designing vector search systems to optimizing inference pipelines, I approach AI as an engineering discipline — not just experimentation.</p>
<p>I specialize in RAG and Computer Vision, building systems that bridge raw data with grounded intelligence.
Think less "black-box AI" — more "controlled, production-ready intelligence."</p>
<p>Currently seeking ML/AI internships where I can build real-world systems at scale.</p>
            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-white/10 text-center">
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-xs uppercase font-mono tracking-widest opacity-60">Repos</p></div>
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-xs uppercase font-mono tracking-widest opacity-60">CGPA</p></div>
              <div><p className="text-5xl font-black text-green-500">100%</p><p className="text-xs uppercase font-mono tracking-widest opacity-60">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKILLS (FIXED: EVERY-TIME SLIDE-IN FROM LEFT) */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-4xl font-black text-center uppercase mb-20 tracking-tighter">TECH STACK & SYSTEM CAPABILITIES</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 50 }}
            >
              <TiltCard className={`p-8 border rounded-3xl transition-all group relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 shadow-2xl'}`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 ${isDark ? 'bg-stark-cyan shadow-[0_0_15px_#22d3ee]' : 'bg-stark-red shadow-[0_0_15px_#ef4444]'}`} />
                <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.3em]">{cat.title}</span></div>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(s => <span key={s} className={`px-4 py-2 text-[10px] font-mono rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-400 group-hover:text-stark-cyan' : 'bg-gray-100 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. EXPERIENCE (RESTORED SCROLL ANIMATION) */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <h4 className="text-5xl font-black uppercase text-center mb-24 tracking-tighter">EXECUTION LOG</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr] gap-12 group"
            >
              <div className={`font-mono border-t-4 pt-8 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-4xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-3 text-xs mt-6 underline italic uppercase tracking-widest hover:text-white"><FileCheck size={18} /> Verify_Uplink</a>}
              </div>
              <div className="border-l-2 border-white/10 pl-14 pb-16 text-left relative">
                <div className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${isDark ? 'bg-stark-cyan shadow-[0_0_15px_#22d3ee]' : 'bg-stark-red shadow-[0_0_15px_#ef4444]'}`} />
                <h5 className="text-4xl font-black uppercase mb-2 group-hover:text-stark-cyan transition-all duration-500">{exp.role}</h5>
                <h6 className={`font-mono text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{exp.company}</h6>
                <p className={`text-xl font-light italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{exp.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. PROJECTS */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-5xl font-black text-center uppercase mb-24 tracking-tighter leading-none">PROJECT SYSTEMS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`group relative border-2 p-12 flex flex-col h-full transition-all rounded-[2.5rem] overflow-hidden ${isDark ? 'bg-[#050505] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-200 hover:shadow-2xl'}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-100 transition-all duration-700 scale-[2] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[10px] mb-8 uppercase tracking-[0.6em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Log: Mission_v{100+i}</span>
              <h5 className="text-3xl font-black uppercase mb-6 tracking-tighter group-hover:text-stark-cyan transition-colors leading-tight">{p.title}</h5>
              <p className="text-base font-light leading-relaxed mb-12 flex-1 italic opacity-70 group-hover:opacity-100 italic">"{p.description}"</p>
              <div className="flex flex-wrap gap-3 mb-12">
                {p.tags.map(t => <span key={t} className={`text-[11px] px-4 py-1.5 border font-mono rounded-lg ${isDark ? 'border-white/10 bg-white/5 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>{t}</span>)}
              </div>
              <div className="flex gap-12 border-t border-white/10 pt-12 mt-auto">
                <a href={p.github} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-[1.8]"><Github size={28} /></a>
                {p.demo && <a href={p.demo} target="_blank" className="hover:text-stark-cyan transition-all hover:scale-[1.8]"><Globe size={28} /></a>}
                <a href={p.medium} target="_blank" className="hover:text-stark-gold transition-all hover:scale-[1.8]"><BookOpen size={28} /></a>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="mt-32 text-center p-24 border-4 border-dashed border-white/5 rounded-[4rem] group hover:border-stark-cyan/20 transition-all relative overflow-hidden">
          <h4 className="text-5xl font-black mb-8 uppercase tracking-tight">Open Global Database</h4>
          <p className="text-gray-500 mb-16 max-w-xl mx-auto font-mono text-base uppercase tracking-widest italic opacity-60">20+ Multi-Mission Repositories // Mainframe Status: Synchronized</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-20 py-8 font-black uppercase rounded-3xl transition-all relative z-10 text-lg ${isDark ? 'bg-white text-black hover:bg-stark-cyan hover:shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Access Mainframe</a>
        </div>
      </section>

      {/* 10. COMMENDATIONS */}
      <section className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-4xl font-black uppercase flex items-center gap-6"><Trophy className="text-stark-gold" size={40} /> ACHIEVEMENT LOG</h4>
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`p-12 border-l-[16px] rounded-4xl transition-all duration-500 ${isDark ? 'bg-[#080808] border-stark-gold hover:bg-white/[0.05]' : 'bg-white border-amber-500 shadow-2xl'}`}>
                <h5 className="text-3xl font-black uppercase mb-4 tracking-tighter">{ach.title}</h5>
                <p className={`text-xl italic leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{ach.desc}"</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-fit">
            <h4 className="text-4xl font-black uppercase col-span-full flex items-center gap-6"><Award className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={40} /> System Upgrades</h4>
            {CERTIFICATES.map((cert, i) => (
              <TiltCard key={i} className={`p-10 border-2 rounded-[2rem] transition-all group ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-stark-gold/50 shadow-2xl' : 'bg-white border-gray-200 shadow-2xl'}`}>
                <h5 className={`text-xs font-mono uppercase mb-4 ${isDark ? 'text-stark-gold' : 'text-amber-600'}`}>{cert.issuer}</h5>
                <p className="text-sm font-black uppercase leading-tight mb-8 tracking-tighter">{cert.title}</p>
                <a href={cert.link} target="_blank" className="text-[10px] font-mono opacity-30 group-hover:opacity-100 uppercase tracking-widest flex items-center gap-3">Verify_Encryption <ChevronRight size={14} /></a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EDUCATION */}
      <section id="education" className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-5xl font-black uppercase text-center mb-24 tracking-tighter flex items-center justify-center gap-8"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={50} /> ACADEMIC METRICS</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
            {EDUCATION.map((edu, i) => (
              <TiltCard key={i} className={`p-16 border-t-[14px] rounded-[3rem] text-center transition-all ${isDark ? `bg-white/5 border-stark-cyan hover:bg-white/[0.08] shadow-[0_0_40px_rgba(34,211,238,0.1)]` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-3xl font-black uppercase mb-2 tracking-tighter">{edu.title}</h5>
                <p className="text-xs font-mono mb-8 opacity-50 tracking-[0.4em]">{edu.school} | {edu.date}</p>
                <p className={`text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
                <p className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border inline-block ${isDark ? 'border-stark-cyan text-stark-cyan' : 'border-stark-red text-stark-red'}`}>{edu.detail}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEXUS */}
      <section id="nexus" className="py-32 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-6xl font-black uppercase mb-24 tracking-tighter flex items-center justify-center gap-10"><Target className="text-stark-red w-16 h-16" /> Establish Uplink</h4>
          <p className="max-w-2xl mx-auto text-sm font-mono uppercase tracking-widest opacity-60 leading-relaxed">
  Secure channels available for collaboration, high-impact engineering roles, and system-level problem solving.  
  <br className="hidden md:block" />
  If you're building something real — initiate contact.
</p>
<p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 mt-6">
  STATUS: AVAILABLE FOR INTERNSHIPS
</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
            {[
              { icon: <Mail />, label: "Email", link: `mailto:${PROFILE.email}`, color: "hover:bg-red-500" },
              { icon: <Linkedin />, label: "LinkedIn", link: "https://linkedin.com/in/arpita2755", color: "hover:bg-blue-600" },
              { icon: <Github />, label: "GitHub", link: "https://github.com/Arpita-2755", color: "hover:bg-gray-700" },
              { icon: <Code />, label: "LeetCode", link: "https://leetcode.com/u/Arpita_2755/", color: "hover:bg-orange-500" },
              { icon: <BookOpen />, label: "Medium", link: "https://medium.com/@arpitamishra2755", color: "hover:bg-green-600" },
              { icon: <Twitter />, label: "X", link: "https://x.com/ArpitaM_2755", color: "hover:bg-sky-500" },
              { icon: <Phone />, label: "Call", link: `tel:${PROFILE.phone}`, color: "hover:bg-stark-cyan hover:text-black" },
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-8 p-12 border rounded-[2.5rem] transition-all bg-white/[0.02] border-white/10 hover:bg-white/5 group shadow-2xl`}>
                <div className={`transition-all duration-500 scale-[2] group-hover:scale-[2.5] group-hover:text-stark-cyan`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] mt-6 opacity-40 group-hover:opacity-100 group-hover:text-white">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[1.2em] border-t border-white/5 opacity-50">
        Arpita Mishra | Eha Intelligence v5.0 | © 2026 All Rights Reserved
      </footer>
      
      <style jsx global>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}