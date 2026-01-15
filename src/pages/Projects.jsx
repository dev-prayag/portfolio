// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Star, ArrowLeft, Github } from 'lucide-react';

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

  useEffect(() => {
    // 1. Sync Theme
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark' || !savedTheme);

    // 2. Fetch with Cache Logic
    const fetchAllRepos = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_TIME) {
          setRepos(data);
          setLoading(false);
          return;
        }
      }

      try {
        const fetchWithCatch = (url) => fetch(url).then(res => res.ok ? res.json() : []);
        const [data1, data2] = await Promise.all([
          fetchWithCatch('https://api.github.com/users/dev-prayag/repos'),
          fetchWithCatch('https://api.github.com/users/OpenUwU/repos')
        ]);

        const combined = [...data1, ...data2]
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        setRepos(combined);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: combined, timestamp: Date.now() }));
      } catch (err) {
        console.error("Failed to fetch repos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, []);

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className={`min-h-screen pt-24 pb-20 px-6 md:px-12 transition-colors duration-500
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'}`}>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className={`inline-flex items-center gap-2 mb-10 text-sm font-medium transition-colors hover:text-rose-400 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">
          <BlurText text="All Projects" className={isDark ? 'text-white' : 'text-zinc-900'} />
        </h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all
                ${isDark ? 'bg-zinc-900/60 border-zinc-700 text-white focus:ring-rose-500/40' : 'bg-white border-zinc-300 text-zinc-900 focus:ring-rose-400/40'}`}
            />
          </div>

          <div className="relative min-w-[180px]">
            <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              <span className="font-medium">{selectedLanguage}</span>
              <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></motion.svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute top-full mt-2 left-0 right-0 z-[60] py-2 rounded-xl border shadow-xl backdrop-blur-xl ${isDark ? 'bg-black/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
                  {languages.map(lang => (
                    <button key={lang} onClick={() => { setSelectedLanguage(lang); setIsOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-rose-500/10 hover:text-rose-400 ${selectedLanguage === lang ? 'text-rose-500' : ''}`}>
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
             <p className="font-mono text-sm tracking-widest opacity-50 uppercase">Loading Data</p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-32 text-center">
            <div className={`mb-6 p-8 rounded-full border-2 border-dashed ${isDark ? 'border-zinc-800 text-zinc-700' : 'border-zinc-200 text-zinc-300'}`}>
              <Search size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="opacity-50">Try searching for something else or change the category.</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, idx) => (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  className={`group p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? 'bg-zinc-900/40 border-zinc-800 hover:border-rose-500/40' : 'bg-white border-zinc-200 shadow-sm'}`}
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-rose-400 transition-colors">{repo.name.replace(/-/g, ' ')}</h3>
                    <ExternalLink size={18} />
                  </div>
                  <p className="mb-6 line-clamp-2 opacity-60 text-sm">{repo.description || "Experimental project."}</p>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500">{repo.language || 'Code'}</span>
                    <span className="flex items-center gap-1"><Star size={14} fill="currentColor" /> {repo.stargazers_count}</span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <footer className="mt-20 py-10 text-center text-xs opacity-40 font-mono">
        <p>© {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.</p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
    </div>
  );
}
