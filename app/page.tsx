"use client";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Github, Database, Brain, Eye, Cpu, MessageSquare, Bus, Globe } from "lucide-react";

// The "Big 6" Projects from your Resume
const projects = [
  {
    title: "GitaRAG",
    subtitle: "Hallucination-Resistant RAG",
    description: "Extractive RAG pipeline grounding responses in scripture via MiniLM semantic embeddings and FAISS.",
    tags: ["FAISS", "SentenceTransformers", "Streamlit", "RAG"],
    github: "https://github.com/Arpita-2755/GitaRAG",
    demo: "https://gitarag-demo.streamlit.app/", // Replace with your actual demo link
    icon: <Database className="w-5 h-5 text-stark-cyan" />,
  },
  {
    title: "PromptGuard",
    subtitle: "LLM Robustness Framework",
    description: "Deterministic prompt-mutation engine detecting behavioral drift and response instability in LLMs.",
    tags: ["distilgpt2", "HuggingFace", "Python", "GenAI"],
    github: "https://github.com/Arpita-2755/PromptGuard",
    demo: "https://promptguard-demo.streamlit.app/", // Replace with your actual demo link
    icon: <ShieldCheck className="w-5 h-5 text-stark-red" />,
  },
  {
    title: "IntelliCampus",
    subtitle: "AI Smart Attendance",
    description: "Real-time multi-face recognition system using RetinaFace, FaceNet (128-d), and FAISS similarity search.",
    tags: ["RetinaFace", "FaceNet", "Flask", "OpenCV"],
    github: "https://github.com/Arpita-2755/IntelliCampus",
    demo: null,
    icon: <Eye className="w-5 h-5 text-stark-gold" />,
  },
  {
    title: "Speech Analyzer",
    subtitle: "Unsupervised Pattern ML",
    description: "NLP clustering pipeline using MiniLM embeddings and UMAP dimensionality reduction for pattern discovery.",
    tags: ["KMeans", "UMAP", "NLP", "Scikit-Learn"],
    github: "https://github.com/Arpita-2755",
    demo: null,
    icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
  },
  {
    title: "Face Verify",
    subtitle: "Deep Learning Biometrics",
    description: "Siamese-style face verification pipeline with 100% recall via systematic threshold calibration.",
    tags: ["TensorFlow", "Keras", "FaceNet", "Deep Learning"],
    github: "https://github.com/Arpita-2755",
    demo: null,
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
  },
  {
    title: "RouteMate",
    subtitle: "Full-Stack Reservation",
    description: "Concurrent bus booking platform with queue-based seat allocation and secure session management.",
    tags: ["Flask", "MySQL", "JavaScript", "System Design"],
    github: "https://github.com/Arpita-2755",
    demo: null,
    icon: <Bus className="w-5 h-5 text-green-400" />,
  }
];

// Helper for icons we didn't import
function ShieldCheck({className}: {className:string}) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>;
}

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
          <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter">
            ARPITA <span className="text-stark-red">MISHRA</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8 font-light italic">
            "I am Iron Man." — Machine Learning Engineer | GenAI Specialist
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={scrollToMissions}
              className="px-8 py-3 bg-stark-red text-white font-bold rounded-sm border-b-4 border-red-800 hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-widest text-sm"
            >
              Access Missions
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
            <div>MARK: 2755</div>
            <div>STARK INDUSTRIES VER: 4.0</div>
          </div>
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Neural Link Stable
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSIONS (PROJECTS) */}
      <section id="missions" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-stark-cyan/30"></div>
          <h3 className="text-stark-cyan font-mono text-xl tracking-widest uppercase">Tactical Archives</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-stark-cyan/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white/5 border border-white/10 rounded-sm hover:border-stark-cyan/50 hover:bg-white/[0.08] transition-all"
            >
              <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
                {project.icon}
              </div>
              
              <h4 className="text-[10px] font-mono text-stark-cyan mb-2 uppercase tracking-widest">
                Mission Log #{100 + index}
              </h4>
              <h5 className="text-xl font-bold mb-3 tracking-tight group-hover:text-stark-cyan transition-colors">
                {project.title}
              </h5>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed h-12 overflow-hidden">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-1 bg-stark-blue/10 border border-stark-blue/20 rounded text-stark-cyan uppercase font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 border-t border-white/10 pt-6">
                <a href={project.github} target="_blank" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" /> REPO
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" className="flex items-center gap-2 text-xs font-mono text-stark-cyan hover:text-white transition-colors">
                    <Globe className="w-4 h-4" /> LIVE_DEMO
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GITHUB CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center p-12 border border-dashed border-white/10 rounded-lg"
        >
          <h4 className="text-xl font-bold mb-4">WANT TO ACCESS THE FULL DATABASE?</h4>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm italic">
            My internal mainframe contains over 20+ experimental repositories across Machine Learning, NLP, and Deep Learning.
          </p>
          <a 
            href="https://github.com/Arpita-2755" 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase tracking-tighter hover:bg-stark-cyan transition-colors rounded-sm"
          >
            <Github className="w-5 h-5" /> View All Repositories
          </a>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-gray-600 font-mono text-[10px] uppercase tracking-widest border-t border-white/5">
        &copy; 2026 Arpita Mishra // Jarvis Protocol v4.2 // Built with Passion
      </footer>
    </main>
  );
}