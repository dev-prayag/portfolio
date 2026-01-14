import React, { useState, useEffect } from 'react';
import {
  Github,
  Mail,
  Moon,
  Sun,
  ArrowUpRight,
  ExternalLink,
  Star,
  Check,
  Send,
  Trophy,
  Menu,
  X,
  Search
} from 'lucide-react';

const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
);

const TECH_STACK = [
  "React", "TypeScript", "Node.js", "Python", "Next.js",
  "Tailwind CSS", "C++", "Rust", "Capcut", "Alight Motion", "After Effects",
  "PostgreSQL", "Docker", "Motion Design", "Figma", "MongDB", "Rust"
];

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        const data1 = await res1.json();
        const data2 = await res2.json();
        const combined = [...(Array.isArray(data1) ? data1 : []), ...(Array.isArray(data2) ? data2 : [])]
          .filter(repo => !repo.fork && !repo.private)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 10);
        setRepos(combined);
      } catch (err) {
        console.error("Failed to fetch repos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const copyDiscord = () => {
    navigator.clipboard.writeText('prayag.cake');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedProjects = repos.slice(0, 5); // Show top 5

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden
      ${isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'}`}>

      {/* Custom Cursor Glow */}
      <div
        className="fixed pointer-events-none z-[99] w-[450px] h-[450px] rounded-full bg-rose-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 sm:opacity-100"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Custom Arrow Cursor */}
      <div
        className="fixed pointer-events-none z-[100] w-10 h-10 sm:w-11 sm:h-11 transition-all duration-75 ease-out opacity-0 sm:opacity-100"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-35%, -35%)',
          backgroundImage: `url('/image/arrow.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: isDark 
            ? 'drop-shadow(0 0 6px rgba(244, 63, 94, 0.7)) brightness(1.15)'
            : 'drop-shadow(0 0 5px rgba(225, 29, 72, 0.6)) brightness(0.95)',
          willChange: 'transform, filter',
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-zinc-800/50 px-6 py-5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
            Prayag.
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#projects" className="text-sm font-medium hover:text-rose-400 transition-colors">Projects</a>
            <a href="#contact" className="text-sm font-medium hover:text-rose-400 transition-colors">Contact</a>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-rose-500/10 transition-colors">
              {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-zinc-800/50 backdrop-blur-lg py-6 px-6 flex flex-col gap-6">
            <a href="#projects" className="text-lg font-medium hover:text-rose-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a href="#contact" className="text-lg font-medium hover:text-rose-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
            <button 
              onClick={() => { setIsDark(!isDark); setIsMenuOpen(false); }}
              className="flex items-center gap-3 text-lg font-medium"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </nav>

      <main className="w-[92%] max-w-[1600px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-32 pb-28 space-y-32">

        {/* Hero Section */}
        <section className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            Available for work
          </div>
          <div className="space-y-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Programmer <br/>
              <span className="text-zinc-500 dark:text-zinc-700">& Editor.</span>
            </h1>
            <p className={`text-xl max-w-3xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Building open-source tools and high-performance applications.  
              Currently exploring the intersection of code and visual motion.
            </p>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="py-6 relative">
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-3 group-hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span
                  key={i}
                  className={`text-sm font-bold uppercase tracking-[0.4em] transition-all duration-500 flex items-center gap-3
                    ${isDark ? 'text-zinc-100 opacity-30 group-hover:opacity-70' : 'text-zinc-900 opacity-40 group-hover:opacity-80'} group-hover:text-rose-400`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION - Improved */}
        <section id="projects" className="space-y-12 scroll-mt-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-rose-500 font-bold text-sm uppercase tracking-[0.25em] mb-2">Showcase</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <a
              href="/projects"
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-medium transition-all hover:scale-105 active:scale-95"
            >
              View All Projects
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid gap-8 md:gap-10 lg:gap-12">
            {loading ? (
              <div className="col-span-full h-64 flex items-center justify-center animate-pulse text-zinc-500 font-mono text-lg">
                Loading awesome projects...
              </div>
            ) : displayedProjects.length > 0 ? (
              displayedProjects.map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20
                    ${isDark 
                      ? 'bg-gradient-to-br from-zinc-950 to-[#0f0f0f] border-zinc-800/60 hover:border-rose-500/40' 
                      : 'bg-white border-zinc-200 hover:border-rose-400/40'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        #{idx + 1}
                      </span>
                      {repo.language && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800/40 text-zinc-300">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-rose-400 transition-colors">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>

                    <p className={`text-base md:text-lg mb-6 line-clamp-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {repo.description || "Innovative open-source experiment."}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm font-medium text-rose-400">
                          <Star size={16} fill="currentColor" /> {repo.stargazers_count}
                        </span>
                        <span className="text-sm text-zinc-500">
                          {repo.owner.login}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <ExternalLink size={20} className="text-rose-400" />
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-center text-zinc-500 py-20">No public repositories found.</p>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href="/projects"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-900/30 transition-all hover:scale-105 active:scale-95"
            >
              View All Projects
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        {/* Future Projects Page Hint (you can create separate page later) */}
        {/* 
        <section id="all-projects" className="hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">All Projects</h2>
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-900/60 border border-zinc-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            </div>
          </div>
          {/* Here you would map ALL repos with search filtering */}
        {/* </section> */}

        {/* CONNECT SECTION */}
        <section id="contact" className="space-y-12 scroll-mt-24">
          {/* ... your existing contact section remains the same ... */}
          {/* (keeping it unchanged as you didn't ask to modify it) */}
        </section>

      </main>

      <footer className="py-16 text-center opacity-40 text-sm font-mono tracking-wider border-t border-zinc-800/50 mt-20">
        © {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
