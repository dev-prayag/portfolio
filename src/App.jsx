import React, { useState, useEffect } from 'react';
import { Github, Mail, Moon, Sun, ArrowUpRight, ExternalLink, Star, Check, Send, Menu, X } from 'lucide-react';

const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
);

const TECH_STACK = [
  "React", "TypeScript", "Node.js", "Python", "Next.js",
  "Tailwind CSS", "C++", "Rust", "Capcut", "Alight Motion", "After Effects",
  "PostgreSQL", "Docker", "Motion Design", "Figma", "MongoDB", "Rust"
];

export default function App() {
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
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
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

  const topProjects = repos.slice(0, 5);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'}`}>

      {/* Cursor glow */}
      <div className="fixed pointer-events-none z-[99] w-[500px] h-[500px] rounded-full bg-rose-500/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 lg:opacity-100" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Arrow cursor */}
      <div className="fixed pointer-events-none z-[100] w-11 h-11 lg:w-12 lg:h-12 transition-all duration-100 ease-out opacity-0 lg:opacity-100" style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        transform: 'translate(-35%, -35%)',
        backgroundImage: `url('/image/arrow.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: isDark ? 'drop-shadow(0 0 8px rgba(244,63,94,0.8)) brightness(1.18)' : 'drop-shadow(0 0 7px rgba(225,29,72,0.7)) brightness(0.9)',
        willChange: 'transform, filter',
      }} />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${isDark ? 'bg-black/40 border-zinc-800/60' : 'bg-white/70 border-zinc-200/70'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-20">
          <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>Prayag.</span>

          <div className="hidden md:flex items-center gap-10">
            <a href="#projects" className={`font-medium transition-colors ${isDark ? 'hover:text-rose-400' : 'hover:text-rose-600'}`}>Projects</a>
            <a href="#contact" className={`font-medium transition-colors ${isDark ? 'hover:text-rose-400' : 'hover:text-rose-600'}`}>Contact</a>
            <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-full transition-colors ${isDark ? 'hover:bg-rose-500/20 text-rose-400' : 'hover:bg-rose-100 text-rose-600'}`} aria-label="Toggle dark mode">
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`} aria-label="Toggle dark mode">
              {isDark ? <Sun size={22} className="text-rose-400" /> : <Moon size={22} className="text-rose-600" />}
            </button>
            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden border-t transition-colors duration-300 ${isDark ? 'bg-black/95 border-zinc-800/70' : 'bg-white/95 border-zinc-200/70'}`}>
            <div className="py-8 px-8 flex flex-col gap-8">
              <a href="#projects" className={`text-xl font-medium transition-colors ${isDark ? 'hover:text-rose-400' : 'hover:text-rose-600'}`} onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#contact" className={`text-xl font-medium transition-colors ${isDark ? 'hover:text-rose-400' : 'hover:text-rose-600'}`} onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      <main className="w-[92%] max-w-[1600px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-32 pb-32 space-y-32 md:space-y-40">

        {/* Hero */}
        <section className="space-y-10 pt-10">
          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-md transition-colors ${isDark ? 'bg-rose-500/10 border-rose-500/25 text-rose-400' : 'bg-rose-100 border-rose-200 text-rose-700'}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            Available for work
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05]">
              <span className={isDark ? 'text-white' : 'text-zinc-900'}>Programmer</span>
              <span className={`ml-3 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>&amp; Editor.</span>
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Building open-source tools and high-performance applications.  
              Currently exploring the intersection of code and visual motion.
            </p>
          </div>
        </section>

        {/* Tech stack */}
        <section className="py-8 relative">
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-4 group-hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span key={i} className={`text-sm md:text-base font-bold uppercase tracking-[0.4em] transition-colors duration-500 flex items-center gap-3 ${isDark ? 'text-zinc-300/50 group-hover:text-zinc-100/80' : 'text-zinc-700/60 group-hover:text-zinc-800/90'} group-hover:text-rose-500`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-14 scroll-mt-24 relative">
          <div className="relative">
            <p className={`font-bold text-sm uppercase tracking-[0.3em] mb-2 ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>SHOWCASE</p>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent relative z-10 ${isDark ? 'from-white via-zinc-200 to-zinc-400' : 'from-zinc-900 via-zinc-700 to-zinc-500'}`}>
              Featured Projects
            </h2>
            <div className="absolute -bottom-4 right-0 h-16 w-48 md:w-64 lg:w-80 bg-gradient-to-l from-transparent via-transparent to-black/80 pointer-events-none"></div>
          </div>

          <div className="grid gap-8 md:gap-10 lg:gap-12">
            {loading ? (
              <div className="h-80 flex flex-col items-center justify-center gap-5 animate-pulse">
                <div className={`w-20 h-20 rounded-full ${isDark ? 'bg-rose-500/20' : 'bg-rose-200/40'}`}></div>
                <div className={`text-lg font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Loading projects...</div>
              </div>
            ) : topProjects.length > 0 ? (
              topProjects.map((repo, idx) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:scale-[1.015] hover:-translate-y-2 hover:shadow-2xl ${isDark ? 'bg-gradient-to-br from-zinc-950 via-[#0a0a0a] to-[#0f0f0f] border-zinc-800/70 hover:border-rose-500/50 hover:shadow-rose-900/30' : 'bg-white border-zinc-200 hover:border-rose-400/60 hover:shadow-rose-500/20 shadow-md'}`}>
                  <span className={`absolute -top-10 -left-8 md:-left-12 text-[10rem] md:text-[14rem] lg:text-[16rem] font-black leading-none opacity-[0.04] pointer-events-none select-none italic group-hover:opacity-[0.09] transition-opacity duration-500 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex items-center justify-center w-11 h-11 rounded-2xl font-bold text-lg border ${isDark ? 'bg-rose-500/15 text-rose-300 border-rose-500/25' : 'bg-rose-100 text-rose-700 border-rose-300'}`}>
                        {idx + 1}
                      </div>
                      {repo.language && (
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-zinc-800/60 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-rose-400 transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {repo.name.replace(/-/g, ' ')}
                    </h3>

                    <p className={`text-base md:text-lg lg:text-xl mb-8 line-clamp-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {repo.description || "Innovative open-source experiment."}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-7 text-sm">
                        <span className={`flex items-center gap-2 font-medium ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                          <Star size={18} fill="currentColor" /> {repo.stargazers_count}
                        </span>
                        <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>
                          {repo.owner.login}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 translate-x-8 group-hover:translate-x-0 transition-all duration-400">
                        <ExternalLink size={26} className={isDark ? 'text-rose-400' : 'text-rose-600'} />
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className={`text-center py-24 text-xl ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                No public repositories found at the moment...
              </div>
            )}
          </div>

          {repos.length > 0 && (
            <div className="flex justify-center mt-16">
              <a href="/projects" className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 border backdrop-blur-sm ${isDark ? 'bg-zinc-900/60 border-zinc-700/50 text-zinc-400 hover:text-rose-300 hover:bg-zinc-800/70' : 'bg-zinc-100/80 border-zinc-300/60 text-zinc-600 hover:text-rose-600 hover:bg-zinc-200/70'}`}>
                View All Projects ({repos.length})
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </section>

        {/* Contact section with gradient fade */}
        <section id="contact" className="space-y-12 scroll-mt-24 relative">
          <div className="relative">
            <p className={`text-rose-500 font-bold text-sm uppercase tracking-[0.2em] mb-2 transition-colors ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>Contact</p>
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent relative z-10 ${isDark ? 'from-white via-zinc-200 to-zinc-400' : 'from-zinc-900 via-zinc-700 to-zinc-500'}`}>
              Connect with me
            </h2>
            <div className="absolute -bottom-4 right-0 h-16 w-48 md:w-64 lg:w-80 bg-gradient-to-l from-transparent via-transparent to-black/80 pointer-events-none"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(225,29,72,0.3)] hover:border-rose-500/30' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-rose-500' : 'bg-zinc-100 text-zinc-600'}`}><Mail size={24} /></div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-widest opacity-50">Email</span>
                <span className="font-medium text-base mt-1">prayagfx@gmail.com</span>
              </div>
            </div>

            <a href="https://github.com/dev-prayag" target="_blank" rel="noreferrer" className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] hover:border-zinc-400' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-100 text-zinc-600'}`}><Github size={24} /></div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-widest opacity-50">GitHub</span>
                <span className="font-medium text-base mt-1">@dev-prayag</span>
              </div>
            </a>

            <button onClick={copyDiscord} className={`flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(88,101,242,0.4)] hover:border-[#5865F2]/50' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-[#5865F2]' : 'bg-zinc-100 text-zinc-600'}`}>
                {copied ? <Check size={24} className="text-emerald-500" /> : <DiscordIcon size={24} />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-widest opacity-50">Discord</span>
                <span className="font-medium text-base mt-1">{copied ? 'Copied!' : 'prayag.cake'}</span>
              </div>
            </button>
          </div>

          <div className={`mt-12 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden group border transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-[#120808] to-[#080808] border-rose-500/10 hover:border-rose-500/30' : 'bg-rose-50/70 border-rose-200 hover:border-rose-300'}`}>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-rose-500 text-sm font-bold uppercase tracking-widest">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse"></div>
                Available for work
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>Let's collaborate</h2>
              <p className={`text-base md:text-lg ${isDark ? 'opacity-70' : 'opacity-80'}`}>Available for ur gandmasti.</p>
              <a href="mailto:prayagfx@gmail.com" className={`mt-6 w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${isDark ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/40' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-700/30'}`}>
                <Send size={20} /> Send me an email <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/8 blur-[140px] rounded-full group-hover:bg-rose-500/15 transition-all duration-700"></div>
          </div>
        </section>
      </main>

      <footer className={`py-16 text-center text-sm font-mono tracking-wider border-t transition-colors ${isDark ? 'border-zinc-800/40 text-zinc-500' : 'border-zinc-200 text-zinc-500'}`}>
        © {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 45s linear infinite; }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
