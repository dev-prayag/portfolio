// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, Mail, Moon, Sun, ArrowUpRight, Star, Check, Send } from 'lucide-react';

// --- Assets & Custom Icons ---
const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084-.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/></svg>
);

// --- Motion Components ---

const SectionHeader = ({ title, badge }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="space-y-3 mb-12">
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="text-rose-500 font-black text-[10px] tracking-[0.5em] uppercase block"
      >
        {badge}
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: "100%", filter: "blur(10px)" }}
          animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-black tracking-tighter"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
};

const ProjectCard = ({ repo, index, isDark }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const yPos = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <motion.a
      href={repo.html_url} target="_blank"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative p-8 md:p-12 rounded-[2.8rem] border overflow-hidden transition-all duration-700 
        ${isDark ? 'bg-[#0a0a0a] border-zinc-800/50 hover:border-rose-500/30' : 'bg-white border-zinc-200 hover:shadow-2xl'}`}
    >
      <motion.span style={{ y: yPos }} className="absolute -top-16 -left-8 text-[18rem] font-black italic opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none pointer-events-none">
        0{index + 1}
      </motion.span>

      <div className="relative z-10 space-y-5">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-rose-50 text-rose-500'}`}>
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-bold text-xs text-zinc-500">
            <Star size={12} className="text-rose-500" fill="currentColor"/> {repo.stargazers_count}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-rose-500 transition-colors capitalize">
          {repo.name.replace(/-/g, ' ')}
        </h3>
        <p className="text-zinc-500 text-lg max-w-2xl font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {repo.description || "Cutting-edge open source development and visual experiments."}
        </p>
      </div>
    </motion.a>
  );
};

// --- Main Page ---

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef(new Audio('/audio/click.mp3'));

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
    }
  };

  const toggleTheme = (e) => {
    playClick();
    if (!document.startViewTransition) { setIsDark(!isDark); return; }
    const x = e.clientX, y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => setIsDark(!isDark));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('https://api.github.com/users/dev-prayag/repos'),
          fetch('https://api.github.com/users/OpenUwU/repos')
        ]);
        const d1 = await res1.json(); const d2 = await res2.json();
        const combined = [...(Array.isArray(d1)?d1:[]), ...(Array.isArray(d2)?d2:[])]
          .filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(combined);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchRepos();
  }, []);

  const copyDiscord = () => {
    navigator.clipboard.writeText('prayag.cake');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 font-sans selection:bg-rose-500/30 overflow-x-hidden 
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'}`}>

      {/* Custom Cursor */}
      <div className="fixed pointer-events-none z-[100] w-10 h-10 transition-transform duration-75 ease-out opacity-0 lg:opacity-100 mix-blend-difference"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)', backgroundImage: `url('/image/arrow.png')`, backgroundSize: 'contain' }} 
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all ${isDark ? 'bg-black/40 border-zinc-800/40' : 'bg-white/70 border-zinc-200/40'}`}>
        <div className="max-w-[1300px] mx-auto px-8 flex items-center justify-between h-20">
          <span className="text-xl font-black tracking-tight">Prayag.</span>
          <div className="flex items-center gap-12">
            <button 
              onClick={() => {
                document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
              }} 
              className="hidden md:block hover:text-rose-500 transition-colors font-black text-[10px] uppercase tracking-[0.4em]"
            >
              Projects
            </button>
            <button 
              onClick={() => {
                document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
              }} 
              className="hidden md:block hover:text-rose-500 transition-colors font-black text-[10px] uppercase tracking-[0.4em]"
            >
              Contact
            </button>
            <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-rose-500/10 text-rose-500 active:scale-90 transition-transform">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="w-[88%] max-w-[1150px] mx-auto pt-32 space-y-40">

        {/* Hero Section - Perfectly Spaced with Blur Reveal */}
        <section className="space-y-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[8px] font-black tracking-widest uppercase ${isDark ? 'bg-zinc-900 border-zinc-800 text-rose-500' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-rose-500 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-rose-500"></span></span>
            Open for hire
          </motion.div>
          <div className="space-y-2">
            <motion.h1 
              initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[7.5rem] font-black tracking-tighter leading-[0.9] cursor-default"
            >
              Programmer <br/><span className="text-zinc-500/40 italic">& Editor.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-zinc-500 max-w-xl font-medium leading-relaxed"
            >
              Building performance-driven web apps and high-fidelity motion graphics. Focused on aesthetics and speed.
            </motion.p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6 pt-0">
          <div className="flex items-end justify-between">
            <SectionHeader title="Selected Work" badge="Showcase" />
            <Link to="/projects" className="mb-10 font-black text-[10px] tracking-widest uppercase hover:text-rose-500 transition-colors flex items-center gap-2 group">
              View All <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"/>
            </Link>
          </div>
          <div className="grid gap-6">
            {loading ? <div className="h-64 animate-pulse bg-zinc-900/10 rounded-[3rem]" /> : 
              repos.slice(0, 4).map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} isDark={isDark} />)
            }
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-12 pb-48 pt-4">
          <SectionHeader title="Get in Touch" badge="Contact" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Email', value: 'prayagfx@gmail.com', icon: <Mail size={20}/>, id: 'email' },
              { label: 'GitHub', value: '@dev-prayag', icon: <Github size={20}/>, id: 'github' },
              { label: 'Discord', value: 'prayag.cake', icon: <DiscordIcon size={20}/>, id: 'discord' }
            ].map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ y: -8, scale: 1.02, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => {
                  if (item.id === 'discord') copyDiscord();
                }} 
                className={`flex flex-col gap-5 p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 ${isDark ? 'bg-zinc-900/30 border-zinc-800/60 hover:border-rose-500/50' : 'bg-white border-zinc-200 hover:shadow-xl hover:border-rose-500/30'}`}
              >
                <div className={`w-fit p-4 rounded-xl shadow-lg transition-transform group-hover:rotate-12 ${isDark ? 'bg-black text-rose-500' : 'bg-rose-50 text-rose-500'}`}>
                  {item.id === 'discord' && copied ? <Check size={20} className="text-emerald-500" /> : item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-1">{item.label}</p>
                  <p className="text-lg font-black tracking-tight">{item.id === 'discord' && copied ? 'Copied!' : item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className={`p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden border ${isDark ? 'bg-[#0a0a0a] border-zinc-800/50' : 'bg-zinc-50 border-zinc-200 shadow-inner'}`}
          >
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Available for work</div>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight max-w-2xl">Let's build <br/> something amazing.</h2>
                <p className="text-zinc-500 text-lg font-medium max-w-lg">Available for ur gandmasti.</p>
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                href="mailto:prayagfx@gmail.com" 
                className="inline-flex items-center gap-4 px-10 py-5 bg-rose-500 text-white rounded-[1.5rem] font-black shadow-2xl shadow-rose-500/40 transition-all text-lg"
              ><Send size={20} /> Send me an email <ArrowUpRight size={20} /></motion.a>
            </div>
            <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-rose-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          </motion.div>
        </section>
      </main>

      <footer className="py-28 text-center border-t border-zinc-800/10">
        <p className="text-[11px] font-mono font-bold tracking-[0.8em] opacity-20 uppercase">© 2026 PRAYAG. ALL RIGHTS RESERVED.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
        ::view-transition-old(root) { z-index: 1; } ::view-transition-new(root) { z-index: 999; }
        .dark::view-transition-old(root) { z-index: 999; } .dark::view-transition-new(root) { z-index: 1; }
        * { cursor: none !important; }
        html { scroll-behavior: smooth; }
        body { background-color: ${isDark ? '#050505' : '#fafafa'}; transition: background-color 0.7s ease; }
      `}} />
    </div>
  );
}
