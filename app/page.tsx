"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, 
  Bus, Globe, BookOpen, Code, Server, Shield, Briefcase, GraduationCap, 
  Award, Linkedin, Mail, Trophy, Activity, Terminal, ChevronRight, FileCheck,
  Twitter, Target, User, Send, Phone, Sun, Moon, Layers, Menu, X, Scan, Radar, Sparkles
} from "lucide-react";

// --- DATA REPOSITORY (UNTOUCHED & COMPLETE) ---
const PROFILE = {
  name: "Arpita Mishra",
  summary: "Machine Learning Engineer specializing in retrieval systems, representation learning, and applied AI system design. Experienced in building end-to-end ML pipelines spanning embedding generation, vector search optimization, and production deployment.",
  cgpa: "8.11 (Dean's List)",
  matric: "93.8%",
  inter: "84.8%",
  phone: "+91-8140006314",
  email: "arpitamishra2755@gmail.com"
};

const SKILLS = [
  { title: "Core Processors", icon: <Code className="text-stark-red" />, skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript"] },
  { title: "Neural & GenAI", icon: <Brain className="text-stark-cyan" />, skills: ["RAG", "LLMs", "TensorFlow", "Keras", "SentenceTransformers", "HuggingFace", "Prompt Robustness", "TF-IDF"] },
  { title: "Targeting Systems (CV)", icon: <Eye className="text-stark-gold" />, skills: ["Face Recognition", "Vector Search", "FAISS", "UMAP", "Similarity Metrics", "Threshold Calibration", "RetinaFace", "FaceNet"] },
  { title: "Cloud & Support", icon: <Server className="text-green-400" />, skills: ["AWS (EC2/S3)", "Docker", "Git/GitHub", "Flask", "Django", "MySQL", "MongoDB", "System Design"] }
];

const PROJECTS = [
  { title: "GitaRAG", subtitle: "Extractive RAG System", description: "Engineered a fully extractive RAG architecture eliminating generative hallucination using 700+ verse embeddings and FAISS search (0.45 threshold).", tags: ["FAISS", "RAG"], github: "https://github.com/Arpita-2755/GitaRAG", demo: "https://gitarag.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Database /> },
  { title: "Slot Recommender", subtitle: "Healthcare NLP Intent", description: "Converted free-text queries into healthcare slots using synthetic datasets, TF-IDF, and Logistic Regression (80%+ intent accuracy).", tags: ["Scikit-learn", "NLP"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Activity /> },
  { title: "PromptGuard", subtitle: "LLM Robustness", description: "Deterministic prompt-mutation engine for detecting behavioral drift and instability in LLMs without ground-truth supervision.", tags: ["HuggingFace", "Python"], github: "https://github.com/Arpita-2755/PromptGuard", demo: "https://promptguard-llm-robustness.streamlit.app", medium: "https://medium.com/@arpitamishra2755", icon: <Shield /> },
  { title: "IntelliCampus", subtitle: "AI Smart Attendance", description: "Sub-second face identification using RetinaFace and FaceNet. Optimized FAISS search with calibrated thresholding (1.0).", tags: ["RetinaFace", "Flask"], github: "https://github.com/Arpita-2755/IntelliCampus", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Eye /> },
  { title: "RouteMate", subtitle: "Bus Reservation", description: "Full-stack reservation platform using queue-based allocation (deque) to prevent race conditions. Managed via Git CI/CD.", tags: ["Flask", "MySQL"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Bus /> },
  { title: "Speech Analyzer", subtitle: "Unsupervised ML", description: "NLP clustering pipeline discovering latent semantic speech patterns via contextual MiniLM embeddings and UMAP reduction.", tags: ["UMAP", "KMeans"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <MessageSquare /> },
  { title: "Face Verify", subtitle: "DL Siamese Network", description: "Biometric face verification pipeline with 100% recall on evaluation pairs using Siamese-style FaceNet embeddings.", tags: ["TensorFlow", "FaceNet"], github: "https://github.com/Arpita-2755", demo: null, medium: "https://medium.com/@arpitamishra2755", icon: <Cpu /> }
];

const EXPERIENCE = [
  { role: "Data Analytics Participant", company: "Deloitte Australia", date: "July 2025", desc: "Analyzed transactional datasets to identify anomaly patterns.", link: "https://forage-link.com" },
  { role: "Community Service Intern", company: "Indian Red Cross Society", date: "June 2024 - July 2024", desc: "Delivered adaptive STEM instruction for students with disabilities.", link: null },
  { role: "Technical Member", company: "GitHub Students Club, LPU", date: "Sept 2024 - Present", desc: "Supported recruitment of 300+ members; conducted Git workshops.", link: null },
  { role: "Technical Team Member", company: "Coding Blocks (DSO), LPU", date: "2023 - 2024", desc: "Competed in 36-hour ByteBash hackathon.", link: null }
];

const ACHIEVEMENTS = [
  { title: "Team Leader - SIH 2024", desc: "Led 6-member team to build 'Aqua Quest' web game using HTML/CSS/JS + Firebase." },
  { title: "1st Runner-Up - Speak & Spark", desc: "LPU CPE Creativity Challenge prototype under 15-minute constraint." }
];

const CERTIFICATES = [
  { title: "Software Engineer", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "Sept 2025", link: "https://hackerrank.com" },
  { title: "GenAI & Prompt Engineering", issuer: "Infosys", date: "Aug 2025", link: "https://infosys.com" },
  { title: "Social Media Security (Elite)", issuer: "NPTEL", date: "April 2025", link: "https://nptel.ac.in" }
];

const EDUCATION = [
  { title: "B.Tech CSE", school: "LPU", score: "8.11 CGPA", date: "2023 - 2027", detail: "Dean's List" },
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

// --- EHA'S KNOWLEDGE BASE ---
const EHA_KB = [
  { keywords: ["cgpa", "marks", "10th", "12th"], response: "Arpita has an 8.11 CGPA (Dean's List). Marks: 93.8% (10th) and 84.8% (12th)." },
  { keywords: ["slot", "healthcare"], response: "The Slot Recommender uses synthetic datasets and TF-IDF with Logistic Regression for 80%+ intent accuracy." },
  { keywords: ["routemate", "race"], response: "RouteMate prevents race conditions in bookings using a queue-based seat allocation system (deque)." },
  { keywords: ["sih", "aqua"], response: "Arpita led SIH 2024 to build 'Aqua Quest'—a groundwater conservation game." },
  { keywords: ["skill", "stack"], response: "Processors: Python, C++, SQL. Expertise: RAG, CV, GenAI." },
  { keywords: ["who", "arpita"], response: "Arpita Mishra is an ML Engineer and Visionary Architect running on the MARK-85 protocol." }
];

// --- ADVANCED "AMAZING" COMPONENTS ---

const NeuralBackground = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = isDark ? 'rgba(34, 211, 238, 0.5)' : 'rgba(239, 68, 68, 0.5)';
      ctx.strokeStyle = isDark ? 'rgba(34, 211, 238, 0.1)' : 'rgba(239, 68, 68, 0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

const HUDTerminal = ({ isDark }: { isDark: boolean }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const techStrings = [
    "INITIATING_RAG_CORE...", "UPLINK_STABLE", "FAISS_INDEX_REBUILT", 
    "NEURAL_LINK_SYNCHRONIZED", "MARK-85_ONLINE", "SCANNING_REPOSITORIES",
    "DECRYPTING_BIOMETRICS...", "CGPA_VERIFIED: 8.11", "TRACING_NEURAL_PATH"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [techStrings[Math.floor(Math.random() * techStrings.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-10 left-10 z-[50] font-mono text-[9px] uppercase tracking-widest pointer-events-none hidden lg:block ${isDark ? 'text-stark-cyan/40' : 'text-stark-red/40'}`}>
      {logs.map((log, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          {`> ${log}`}
        </motion.div>
      ))}
    </div>
  );
};

const TiltCard = ({ children, className }: any) => {
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
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
      className={`fixed top-0 left-0 w-10 h-10 border-[1px] rounded-full pointer-events-none z-[1000] hidden lg:flex items-center justify-center ${isDark ? 'border-stark-cyan/50' : 'border-stark-red/50'}`}
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-stark-cyan' : 'bg-stark-red'}`} />
    </motion.div>
  );
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([{ role: "eha", text: "Eha Online. Systems at 100%. Neural link stable." }]);
  const [isEhaOpen, setIsEhaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [text, setText] = useState("");
  const fullHeroText = "Initializing Protocol: Arpita Mishra... Mark-85 Neural Core active... Accessing archives for ML Engineer specialized in RAG & Computer Vision...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullHeroText.slice(0, i)); i++;
      if (i > fullHeroText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleEhaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: "user", text: chatInput }]);
    const userMsg = chatInput.toLowerCase();
    setChatInput("");
    setTimeout(() => {
      const match = EHA_KB.find(item => item.keywords.some(k => userMsg.includes(k)));
      setChatHistory(prev => [...prev, { role: "eha", text: match ? match.response : "Segment not found. Check GitHub for full experimental logs." }]);
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
        return p + 5;
      });
    }, 100);
  };

  const scrollTo = (id: string) => { setIsSidebarOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className={`relative min-h-screen transition-all duration-700 ${isDark ? 'bg-[#010409] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-stark-cyan overflow-x-hidden font-sans`}>
      <CustomCursor isDark={isDark} />
      <NeuralBackground isDark={isDark} />
      <HUDTerminal isDark={isDark} />

      {/* SIDEBAR */}
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
            <div className="mt-auto pt-10 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase tracking-[0.5em]">Mark-85 // Arpita Mishra</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIOMETRIC OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-10">
            <Scan className="text-stark-cyan w-24 h-24 animate-pulse mb-8" />
            <h4 className="text-3xl font-black uppercase tracking-[0.4em] text-stark-cyan mb-4">Decrypting Identity...</h4>
            <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div className="h-full bg-stark-cyan" animate={{ width: `${scanProgress}%` }} />
            </div>
            <p className="mt-8 font-mono text-[10px] text-stark-cyan/60 uppercase tracking-[0.3em]">Auth_Packet: A.Mishra_CV_v5.bin</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THEME TOGGLE */}
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[110] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:rotate-180 transition-all">
        {isDark ? <Sun className="text-stark-gold" /> : <Moon className="text-stark-red" />}
      </button>

      {/* EHA CHAT */}
      <div className="fixed bottom-8 right-8 z-[110]">
        <AnimatePresence>
          {isEhaOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`mb-4 w-85 h-[500px] border backdrop-blur-3xl rounded-2xl flex flex-col shadow-2xl ${isDark ? 'bg-black/95 border-stark-cyan/40' : 'bg-white/95 border-stark-red/40'}`}>
              <div className={`p-5 border-b flex justify-between items-center ${isDark ? 'bg-stark-cyan/10 border-white/10' : 'bg-stark-red/10 border-gray-200'}`}>
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Cpu size={16} /> Eha Intelligence</span>
                <button onClick={() => setIsEhaOpen(false)} className="opacity-40 font-bold">×</button>
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

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-48 h-48 flex items-center justify-center mb-10 mx-auto">
          <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-40 ${isDark ? 'border-stark-cyan shadow-[0_0_50px_#22d3ee]' : 'border-stark-red shadow-[0_0_50px_#ef4444]'}`} />
          <div className={`w-34 h-34 rounded-full border-8 flex items-center justify-center ${isDark ? 'border-stark-cyan/10' : 'border-stark-red/10'}`}>
            <div className={`w-22 h-22 rounded-full flex items-center justify-center ${isDark ? 'bg-stark-cyan shadow-[0_0_80px_#22d3ee]' : 'bg-stark-red shadow-[0_0_80px_#ef4444]'}`}>
              <Zap className={isDark ? 'text-black' : 'text-white'} size={32} />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className={`font-mono text-xs tracking-[1.5em] mb-4 uppercase opacity-60 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mark-85 // Online</h2>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-12 uppercase select-none drop-shadow-2xl">ARPITA <span className={isDark ? 'text-stark-red' : 'text-stark-gold'}>MISHRA</span></h1>
          <div className="font-mono text-[10px] md:text-sm text-stark-cyan opacity-80 border-l-2 border-stark-cyan/30 pl-4 py-2 bg-stark-cyan/5 max-w-2xl mx-auto mb-10">
            <span className="font-bold mr-2 text-stark-cyan">[ROOT@EHA]:~#</span>{text}<span className="animate-pulse">_</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-10">
            <button onClick={() => scrollTo('about')} className={`px-16 py-6 font-black uppercase tracking-widest text-xs transition-all border-b-8 rounded-2xl ${isDark ? 'bg-stark-red border-red-900 text-white hover:bg-red-500 hover:-translate-y-1 shadow-[0_20px_50px_rgba(239,68,68,0.2)]' : 'bg-stark-gold border-amber-900 text-white hover:bg-amber-500 shadow-xl'}`}>Identity Protocol</button>
            <button onClick={handleDownload} className={`px-16 py-6 border-2 font-black uppercase tracking-widest text-xs transition-all rounded-2xl ${isDark ? 'border-stark-cyan text-stark-cyan hover:bg-stark-cyan/10 hover:shadow-[0_0_30px_#22d3ee]' : 'border-stark-red text-stark-red hover:bg-stark-red/10 shadow-xl'}`}>Secure Dossier</button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT (WITH TILT) */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <TiltCard className="relative group">
            <div className={`absolute -inset-8 border border-dashed animate-[spin_30s_linear_infinite] rounded-3xl ${isDark ? 'border-stark-cyan/30' : 'border-stark-red/30'}`} />
            <img src="/arpita.jpg" alt="Arpita" className={`w-full transition-all duration-1000 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] ${isDark ? 'grayscale brightness-75 hover:grayscale-0 hover:brightness-100' : ''}`} />
          </TiltCard>
          <div className="space-y-10 text-xl font-light leading-relaxed">
            <h3 className={`font-mono text-sm tracking-[0.8em] uppercase flex items-center gap-4 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}><Target size={24} /> Neural Identity</h3>
            <p className="italic font-bold text-4xl leading-tight">"Innovation is building armor for raw intelligence."</p>
            <p>{PROFILE.summary}</p>
            <p>Inspired by the relentless innovation of the Stark Legacy, I specialize in building Intelligent Armor for Data. My focus is RAG and Computer Vision, where I bridge raw inference and actionable, grounded truth.</p>
            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-white/10 text-center">
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>20+</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Missions</p></div>
              <div><p className={`text-5xl font-black ${isDark ? 'text-stark-gold' : 'text-amber-500'}`}>8.11</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">CGPA</p></div>
              <div><p className="text-5xl font-black text-green-500">100%</p><p className="text-xs uppercase font-mono tracking-widest opacity-50 mt-2">Recall</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h4 className="text-5xl font-black text-center uppercase mb-20 tracking-tighter leading-none">Armor Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} className={`p-10 border rounded-3xl transition-all group relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-white/10 hover:border-stark-cyan/30' : 'bg-white border-gray-200 shadow-2xl'}`}>
              <div className={`flex items-center gap-4 mb-8 ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{cat.icon}<span className="text-sm font-black uppercase tracking-[0.3em]">{cat.title}</span></div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(s => <span key={s} className={`px-4 py-2 text-[10px] font-mono rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-400 group-hover:text-stark-cyan group-hover:border-stark-cyan/50' : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:text-stark-red'}`}>{s}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="history" className={`py-24 px-6 border-y border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <h4 className="text-5xl font-black uppercase text-center mb-24 tracking-tighter">Operational History</h4>
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr] gap-12 group">
              <div className={`font-mono border-t-4 pt-8 ${isDark ? 'text-stark-red border-stark-red/30' : 'text-stark-red border-stark-red/60'}`}>
                <span className="text-4xl font-black tracking-tighter">{exp.date}</span>
                {exp.link && <a href={exp.link} target="_blank" className="flex items-center gap-3 text-xs mt-6 underline italic uppercase tracking-widest hover:text-white"><FileCheck size={18} /> Verify_Uplink_Hash</a>}
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

      {/* PROJECTS (TACTICAL ARCHIVES) */}
      <section id="missions" className="py-24 px-6 max-w-7xl mx-auto">
        <h4 className="text-5xl font-black text-center uppercase mb-24 tracking-tighter leading-none">Tactical Archives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`group relative border-2 p-12 flex flex-col h-full transition-all rounded-[2.5rem] overflow-hidden ${isDark ? 'bg-[#050505] border-white/10 hover:border-stark-cyan/40 shadow-2xl' : 'bg-white border-gray-100 hover:shadow-2xl'}`}>
              <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-100 transition-all duration-700 scale-[2] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>{p.icon}</div>
              <span className={`font-mono text-[10px] mb-8 uppercase tracking-[0.6em] ${isDark ? 'text-stark-cyan' : 'text-stark-red'}`}>Mission_Log_v{100+i}</span>
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
          <div className="absolute inset-0 bg-stark-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-5xl font-black mb-8 uppercase tracking-tight">Open Global Database</h4>
          <p className="text-gray-500 mb-16 max-w-xl mx-auto font-mono text-base uppercase tracking-widest italic opacity-60">20+ Multi-Mission Repositories // Mainframe Status: Synchronized</p>
          <a href="https://github.com/Arpita-2755" target="_blank" className={`px-20 py-8 font-black uppercase rounded-3xl transition-all relative z-10 text-lg ${isDark ? 'bg-white text-black hover:bg-stark-cyan hover:shadow-[0_0_60px_#22d3ee]' : 'bg-stark-red text-white hover:bg-red-500 shadow-2xl'}`}>Access Mainframe</a>
        </div>
      </section>

      {/* COMMENDATIONS */}
      <section className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-4xl font-black uppercase flex items-center gap-6"><Trophy className="text-stark-gold" size={40} /> Commendations</h4>
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

      {/* EDUCATION */}
      <section id="education" className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-white/[0.01]' : 'bg-gray-200/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h4 className="text-5xl font-black uppercase text-center mb-24 tracking-tighter flex items-center justify-center gap-8"><GraduationCap className={isDark ? 'text-stark-cyan' : 'text-stark-red'} size={50} /> Academic Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
            {EDUCATION.map((edu, i) => (
              <TiltCard key={i} className={`p-16 border-t-[14px] rounded-[3rem] text-center transition-all ${isDark ? `bg-white/5 border-stark-cyan hover:bg-white/[0.08] shadow-[0_0_40px_rgba(34,211,238,0.1)]` : `bg-white shadow-2xl border-stark-red`}`}>
                <h5 className="text-3xl font-black uppercase mb-2 tracking-tighter">{edu.title}</h5>
                <p className="text-xs font-mono mb-8 opacity-50 tracking-[0.4em]">{edu.school} // {edu.date}</p>
                <p className={`text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.score}</p>
                <p className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border inline-block ${isDark ? 'border-stark-cyan text-stark-cyan' : 'border-stark-red text-stark-red'}`}>{edu.detail}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (THE NEXUS) */}
      <section id="nexus" className="py-32 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-6xl font-black uppercase mb-24 tracking-tighter flex items-center justify-center gap-10"><Target className="text-stark-red w-16 h-16" /> Establish Uplink</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
            {CONTACT_LINKS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" className={`flex flex-col items-center gap-8 p-12 border rounded-[2.5rem] transition-all bg-white/[0.02] border-white/10 hover:bg-white/5 group shadow-2xl`}>
                <div className={`transition-all duration-500 scale-[2] group-hover:scale-[2.5] group-hover:text-stark-cyan`}>{s.icon}</div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] mt-6 opacity-40 group-hover:opacity-100 group-hover:text-white">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[1.2em] border-t border-white/5 opacity-50">
        Arpita Mishra // Eha Intelligence v5.0 // Mark-85 Fully Active
      </footer>
      
      <style jsx global>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}