import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Search, Star, ArrowLeft, Sun, Moon, Filter, X } from 'lucide-react';

const CACHE_KEY = 'github_repos_cache';
const CACHE_TIME = 30 * 60 * 1000;

const BlurText = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <motion.span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // --- CUSTOM CURSOR LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, [role="button"], input');
      setIsHovering(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // --- Theme Sync ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const themeIsDark = savedTheme === 'dark' || !savedTheme;
    setIsDark(themeIsDark);
  }, []);

  const toggleTheme = (e) => {
    const newTheme = !isDark;
    const performToggle = () => {
      setIsDark(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };
    if (!document.startViewTransition) { performToggle(); return; }
    const x = e.clientX, y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => performToggle());
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  // --- Data Fetching ---
  useEffect(() => {
    const fetchAllRepos = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_TIME) { setRepos(data); setLoading(false); return; }
      }
      try {
        const fetchWithCatch = (url) => fetch(url).then(res => res.ok ? res.json() : []);
        const [d1, d2] = await Promise.all([
          fetchWithCatch('https://api.github.com/users/dev-prayag/repos'),
          fetchWithCatch('https://api.github.com/users/OpenUwU/repos')
        ]);
        const combined = [...d1, ...d2].filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(combined);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: combined, timestamp: Date.now() }));
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchAllRepos();
  }, []);

  // --- Filter Logic ---
  const languageStats = useMemo(() => {
    const stats = { All: repos.length };
    repos.forEach(r => {
      if (r.language) stats[r.language] = (stats[r.language] || 0) + 1;
    });
    return stats;
  }, [repos]);

  const languages = Object.keys(languageStats);

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className={`min-h-screen pt-12 pb-20 px-6 md:px-12 transition-colors duration-700 font-sans
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fcfcfc] text-zinc-950'}`}>

      {/* --- CUSTOM CURSOR --- */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
        <motion.div 
          style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: isHovering ? 2.2 : 1,
            borderColor: isHovering ? 'rgba(220, 38, 38, 0.8)' : 'rgba(220, 38, 38, 0.4)', // Darker Red
          }}
          className="absolute w-8 h-8 rounded-full border-2 border-red-600/40"
        />
        <motion.div 
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
          className="absolute w-2 h-2 bg-red-600 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-20">
          <Link to="/" className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] transition-colors hover:text-red-600 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <ArrowLeft size={16} /> Back
          </Link>
          <button onClick={toggleTheme} className={`p-3 rounded-full transition-all active:scale-90 ${isDark ? 'bg-zinc-900 text-red-600' : 'bg-white border border-zinc-200 shadow-sm'}`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="space-y-4 mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            <BlurText text="Archive" className={isDark ? 'text-white' : 'text-zinc-950'} />
          </h1>
          <p className={`text-lg font-medium opacity-40 ${isDark ? '' : 'text-zinc-600'}`}>
            Explore {repos.length} public experiments and open-source contributions.
          </p>
        </div>

        {/* --- UNIQUE SEARCH & FILTER BAR --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col lg:flex-row items-center gap-4 mb-16"
        >
          <div className="relative w-full lg:flex-1 group">
            <motion.div 
              animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
              className={`flex items-center gap-4 px-6 py-5 rounded-[2rem] border transition-all duration-500
                ${isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              <Search className={`transition-colors duration-300 ${isFocused ? 'text-red-600' : 'opacity-20'}`} size={20} />
              <input
                type="text"
                placeholder="Search by name or tech stack..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-sm font-bold tracking-tight placeholder:opacity-30"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-1 hover:text-red-600"><X size={16}/></button>
              )}
            </motion.div>
          </div>

          <div className="relative w-full lg:w-72">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`w-full flex items-center justify-between px-8 py-5 rounded-[2rem] border transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em]
                ${isDark ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600' : 'bg-white border-zinc-200 hover:border-red-200 shadow-sm'}`}
            >
              <span className="flex items-center gap-2"><Filter size={14} className="text-red-600"/> {selectedLanguage}</span>
              <div className="flex items-center gap-3">
                <span className="opacity-20">|</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><Filter size={12} className="opacity-40" /></motion.div>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className={`absolute top-full left-0 right-0 z-[100] p-3 rounded-[2rem] border shadow-2xl backdrop-blur-2xl
                    ${isDark ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-zinc-200'}`}
                >
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {languages.map((lang, i) => (
                      <motion.button
                        key={lang}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => { setSelectedLanguage(lang); setIsOpen(false); }}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                          ${selectedLanguage === lang 
                            ? 'bg-red-600 text-white' 
                            : isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-red-50 text-zinc-600 hover:text-red-600'}`}
                      >
                        {lang}
                        <span className={`text-[9px] opacity-40 ${selectedLanguage === lang ? 'text-white' : ''}`}>
                          {languageStats[lang]}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`hidden lg:flex items-center px-8 py-5 rounded-[2rem] border font-black text-[10px] uppercase tracking-widest
            ${isDark ? 'bg-zinc-900/20 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>
            Found <span className="text-red-600 mx-2">{filteredRepos.length}</span> Results
          </div>
        </motion.div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <div className="w-10 h-10 border-2 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
             <p className="font-black text-[10px] tracking-[0.5em] opacity-30 uppercase">Building Repository</p>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, idx) => (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.02 }}
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  className={`group p-8 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02]
                    ${isDark 
                      ? 'bg-zinc-900/20 border-zinc-800/50 hover:border-red-600/30' 
                      : 'bg-white border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-red-200'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-2xl font-black tracking-tight group-hover:text-red-600 transition-colors capitalize ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`}>
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 group-hover:text-red-600 transition-all -translate-y-1 translate-x-1" />
                  </div>
                  <p className={`mb-8 line-clamp-2 text-sm font-medium leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    {repo.description || "Experimental open-source project and technical research."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-red-50 text-red-600'}`}>
                      {repo.language || 'Logic'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                      <Star size={14} className="text-red-600" fill="currentColor" /> {repo.stargazers_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <footer className="mt-40 py-10 text-center">
        <p className={`text-[10px] font-black tracking-[1em] uppercase ${isDark ? 'opacity-20' : 'text-zinc-300'}`}>2026 Prayag.</p>
        <motion.a
    href="https://github.com/dev-prayag"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -3, scale: 1.1 }}
    className={`transition-colors duration-300 ${isDark ? 'text-zinc-600 hover:text-white' : 'text-zinc-400 hover:text-red-600'}`}
  >
    <Github size={22} strokeWidth={1.5} />
  </motion.a>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

        @media (min-width: 768px) {
           * { cursor: none !important; }
        }
      `}} />
    </div>
  );
}
