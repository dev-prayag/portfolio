import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Github, Mail, Moon, Sun, ArrowUpRight, Star, Check, Send, Menu, X } from 'lucide-react';

// --- ICONS & COMPONENTS ---
const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084-.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/></svg>
);

const SectionHeader = ({ title, badge }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="space-y-2 mb-6">
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase block"
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
        ${isDark 
          ? 'bg-[#0a0a0a] border-zinc-800/50 hover:border-red-600/30' 
          : 'bg-white border-zinc-200/80 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-red-200'}`}
    >
      <motion.span style={{ y: yPos }} className="absolute -top-16 -left-8 text-[18rem] font-black italic opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none pointer-events-none">
        0{index + 1}
      </motion.span>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-bold text-xs text-zinc-500">
            <Star size={12} className="text-red-600" fill="currentColor"/> {repo.stargazers_count}
          </span>
        </div>
        <h3 className={`text-3xl md:text-4xl font-black tracking-tight group-hover:text-red-600 transition-colors capitalize ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
          {repo.name.replace(/-/g, ' ')}
        </h3>
        <p className={`text-lg max-w-2xl font-medium leading-relaxed transition-opacity ${isDark ? 'text-zinc-500 opacity-80 group-hover:opacity-100' : 'text-zinc-600'}`}>
          {repo.description || "Cutting-edge open source development and visual experiments."}
        </p>
      </div>
    </motion.a>
  );
};

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  // 1. Core Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Wave Trail
  const springConfig = { damping: 25, stiffness: 200 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, [role="button"]');
      setIsHovering(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const toggleTheme = (e) => {
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

  // Scroll to section helper
  const scrollTo = (id) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-all duration-700 font-sans selection:bg-red-600/30 overflow-x-hidden 
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fcfcfc] text-zinc-950'}`}>

      {/* CUSTOM CURSOR SYSTEM */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
        <motion.div 
          style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: isHovering ? 2.5 : 1,
            borderColor: isHovering ? 'rgba(220, 38, 38, 0.8)' : 'rgba(220, 38, 38, 0.4)', // RED-600
            borderWidth: isHovering ? '2px' : '1px'
          }}
          className="absolute w-8 h-8 rounded-full border border-red-600/40"
        />
        <motion.div 
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
          animate={{ scale: isHovering ? 0.5 : 1 }}
          className="absolute w-2 h-2 bg-red-600 rounded-full"
        />
      </div>

      {!isDark && <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-50/40 via-transparent to-transparent pointer-events-none" />}

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b transition-all ${isDark ? 'bg-black/40 border-zinc-800/40' : 'bg-white/70 border-zinc-200/60'}`}>
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between h-20">
          <span className="text-xl font-black tracking-tight">Prayag.</span>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <button onClick={() => scrollTo('projects')} className="hover:text-red-600 transition-colors font-black text-[10px] uppercase tracking-[0.4em]">Projects</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-red-600 transition-colors font-black text-[10px] uppercase tracking-[0.4em]">Contact</button>
            <button onClick={toggleTheme} className={`p-2.5 rounded-full active:scale-90 transition-transform ${isDark ? 'text-red-600 hover:bg-red-600/10' : 'text-zinc-950 hover:bg-zinc-100'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Hamburger & Theme Toggle */}
          <div className="flex md:hidden items-center gap-4">
             <button onClick={toggleTheme} className={`p-2 rounded-full ${isDark ? 'text-red-600' : 'text-zinc-950'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-zinc-100 text-black' : isDark ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-black'}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY (Video Style) --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ transformOrigin: "top right" }}
              className={`absolute top-24 right-6 w-64 rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-3xl
                ${isDark ? 'bg-[#111]/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}
            >
              <div className="p-6 flex flex-col gap-2">
                {[
                  { label: 'Home', action: () => window.scrollTo({top:0, behavior:'smooth'}), active: true },
                  { label: 'Projects', action: () => scrollTo('projects'), active: false },
                  { label: 'Contact', action: () => scrollTo('contact'), active: false },
                ].map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => { item.action(); setIsMenuOpen(false); }}
                    className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-zinc-500/10 transition-colors group text-left"
                  >
                    <span className={`text-sm font-bold tracking-widest uppercase ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {item.label}
                    </span>
                    {item.active && (
                      <motion.div 
                        layoutId="activeDot"
                        className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_2px_rgba(220,38,38,0.5)]" 
                      />
                    )}
                  </button>
                ))}

                <div className="h-px bg-zinc-500/10 my-2" />

                <Link to="/projects" className="w-full bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl text-center shadow-lg shadow-red-600/20">
                  View Full Archive
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="w-[88%] max-w-[1150px] mx-auto pt-32 space-y-32">
        <section className="space-y-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[8px] font-black tracking-widest uppercase ${isDark ? 'bg-zinc-900 border-zinc-800 text-red-600' : 'bg-white border-zinc-200 text-red-700 shadow-sm'}`}>
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-red-600 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-red-600"></span></span>
            Open for hire
          </motion.div>
          <div className="space-y-2">
            <motion.h1 
              initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[7.5rem] font-black tracking-tighter leading-[0.9] cursor-default"
            >
              Programmer <br/><span className={`${isDark ? 'text-zinc-500/40' : 'text-zinc-300'} italic`}>& Editor.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`text-lg md:text-xl max-w-xl font-medium leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}
            >
              Building performance-driven web apps and high-fidelity motion graphics. Focused on aesthetics and speed.
            </motion.p>
          </div>
        </section>

        <section id="projects" className="space-y-4 pt-0">
          <div className="flex items-end justify-between">
            <SectionHeader title="Selected Work" badge="Showcase" />
            <Link to="/projects" className="mb-8 font-black text-[10px] tracking-widest uppercase hover:text-red-600 transition-colors flex items-center gap-2 group">
              View All <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"/>
            </Link>
          </div>
          <div className="grid gap-6">
            {loading ? <div className={`h-64 animate-pulse rounded-[3rem] ${isDark ? 'bg-zinc-900/10' : 'bg-zinc-100'}`} /> : 
              repos.slice(0, 4).map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} isDark={isDark} />)
            }
          </div>
        </section>

        <section id="contact" className="space-y-8 pb-48 pt-4">
          <SectionHeader title="Get in Touch" badge="Contact" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Email', value: 'prayagfx@gmail.com', icon: <Mail size={20}/>, id: 'email' },
              { label: 'GitHub', value: '@dev-prayag', icon: <Github size={20}/>, id: 'github' },
              { label: 'Discord', value: 'prayag.cake', icon: <DiscordIcon size={20}/>, id: 'discord' }
            ].map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => { if (item.id === 'discord') copyDiscord(); }} 
                className={`flex flex-col gap-5 p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 
                  ${isDark 
                    ? 'bg-zinc-900/30 border-zinc-800/60 hover:border-red-600/50' 
                    : 'bg-white border-zinc-200/80 hover:shadow-xl hover:border-red-600/30'}`}
              >
                <div className={`w-fit p-4 rounded-xl shadow-lg transition-transform group-hover:rotate-12 ${isDark ? 'bg-black text-red-600' : 'bg-red-50 text-red-600'}`}>
                  {item.id === 'discord' && copied ? <Check size={20} className="text-emerald-500" /> : item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-1">{item.label}</p>
                  <p className={`text-lg font-black tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>{item.id === 'discord' && copied ? 'Copied!' : item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- FINAL CTA CARD --- */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  // Added mt-16 (mobile) and mt-24 (desktop) to push it down
  className={`mt-16 md:mt-24 p-8 md:p-14 rounded-[2.5rem] relative overflow-hidden border transition-all duration-500
    ${isDark ? 'bg-[#0a0a0a] border-zinc-800/50' : 'bg-white border-zinc-200/80 shadow-sm'}`}
>
  {/* The Red Glow Effect */}
  <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20
    ${isDark ? 'bg-red-600' : 'bg-red-400'}`} 
  />

  <div className="relative z-10 space-y-8">
    {/* Availability Badge */}
    <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em]">
      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" /> 
      Available for work
    </div>

    {/* Text Content - Adjusted leading for that 'neat' look */}
    <div className="space-y-4">
      <h2 className={`text-4xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-xl ${isDark ? 'text-white' : 'text-zinc-950'}`}>
        Let's build something <br/> amazing together.
      </h2>
      <p className={`text-base md:text-lg font-medium opacity-50 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
        Available for your projects.
      </p>
    </div>

    {/* Single Icon Button */}
    <motion.a 
      whileHover={{ scale: 1.03 }} 
      whileTap={{ scale: 0.97 }} 
      href="mailto:prayagfx@gmail.com" 
      className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-full font-bold transition-all text-sm shadow-xl shadow-red-600/20"
    >
      Start a conversation <ArrowUpRight size={18} />
    </motion.a>
  </div>
</motion.div>


        </section>
      </main>

      <footer className="py-28 text-center border-t border-zinc-800/10">
        <p className={`text-[11px] font-mono font-bold tracking-[0.8em] uppercase ${isDark ? 'opacity-20' : 'text-zinc-400'}`}> 2026 PRAYAG.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide Default Cursor */
        @media (min-width: 768px) {
           * { cursor: none !important; }
        }

        ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
        ::view-transition-old(root) { z-index: 1; } ::view-transition-new(root) { z-index: 999; }
        .dark::view-transition-old(root) { z-index: 999; } .dark::view-transition-new(root) { z-index: 1; }

        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}
