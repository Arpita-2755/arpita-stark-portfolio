"use client";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Github, Database, Brain, Eye } from "lucide-react";

const projects = [
  {
    title: "GitaRAG",
    subtitle: "Hallucination-Resistant RAG System",
    description: "Eliminated generative hallucination by engineering a fully extractive RAG pipeline for scripture passages.",
    tags: ["FAISS", "SentenceTransformers", "Streamlit"],
    link: "https://github.com/Arpita-2755", // Add actual links later
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "PromptGuard",
    subtitle: "LLM Robustness Framework",
    description: "Designed a deterministic prompt-mutation engine to expose LLM sensitivity and response instability.",
    tags: ["distilgpt2", "HuggingFace", "Python"],
    link: "https://github.com/Arpita-2755",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: "IntelliCampus",
    subtitle: "AI Smart Attendance",
    description: "Real-time multi-face recognition pipeline combining RetinaFace and FaceNet embeddings.",
    tags: ["OpenCV", "Flask", "SQLite"],
    link: "https://github.com/Arpita-2755",
    icon: <Eye className="w-5 h-5" />,
  }
];

export default function Home() {
  const scrollToMissions = () => {
    document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-stark-dark text-white selection:bg-stark-cyan selection:text-black">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stark-blue/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="inline-block p-1 border-2 border-dashed border-stark-cyan rounded-full mb-6"
          >
            <div className="p-4 bg-stark-blue/10 rounded-full border border-stark-cyan shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Zap className="w-12 h-12 text-stark-cyan" />
            </div>
          </motion.div>

          <h2 className="text-stark-cyan font-mono text-sm tracking-[0.3em] mb-2 uppercase">
            System Status: Online
          </h2>
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
            ARPITA <span className="text-stark-red">MISHRA</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8 font-light">
            Machine Learning Engineer | GenAI Specialist | Stark Industries Enthusiast
          </p>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={scrollToMissions}
              className="px-8 py-3 bg-stark-red text-white font-bold rounded-sm border-b-4 border-red-800 hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm"
            >
              View Missions
            </button>
            <a 
              href="/Arpita_Mishra_CV.pdf" 
              target="_blank"
              className="px-8 py-3 border border-stark-cyan text-stark-cyan font-bold rounded-sm hover:bg-stark-cyan/10 transition-all uppercase tracking-widest text-sm"
            >
              Download Dossier
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] text-stark-cyan/50 uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <div>Lat: 22.6708° N</div>
            <div>Long: 71.5724° E</div>
          </div>
          <div className="animate-pulse">Neural Link Stable</div>
        </div>
      </section>

      {/* SECTION 2: MISSIONS (PROJECTS) */}
      <section id="missions" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-stark-cyan/30"></div>
          <h3 className="text-stark-cyan font-mono text-xl tracking-widest uppercase">Active Missions</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-stark-cyan/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group relative p-6 bg-stark-blue/5 border border-white/10 rounded-lg hover:border-stark-cyan/50 transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                {project.icon}
              </div>
              <h4 className="text-xs font-mono text-stark-cyan mb-2 uppercase tracking-tighter">Mission: {project.title}</h4>
              <h5 className="text-lg font-bold mb-3">{project.subtitle}</h5>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.link} target="_blank" className="text-stark-cyan hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={project.link} target="_blank" className="text-stark-cyan hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 font-mono text-[10px] uppercase tracking-widest">
        &copy; 2026 Arpita Mishra // Built with Stark-Tech v4.0
      </footer>
    </main>
  );
}