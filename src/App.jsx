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
  Code2
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

  const topProject = repos[0];
  const otherProjects = repos.slice(1);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden
      ${isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'}`}>

      <div
        className="fixed pointer-events-none z-[99] w-[450px] h-[450px] rounded-full bg-rose-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 sm:opacity-100"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <div
        className="fixed pointer-events-none z-[100] w-2 h-2 rounded-full bg-rose-500 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 opacity-0 sm:opacity-100"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <span className="font-bold text-xl tracking-tighter">Prayag.</span>
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-rose-500/10 transition-colors">
          {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-28 md:space-y-32">

        <section className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-400/90 text-xs font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            Available for work
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Programmer <br/>
              <span className="text-zinc-500 dark:text-zinc-700">& Editor.</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Building open-source tools and high-performance applications.
              Currently exploring the intersection of code and visual motion.
            </p>
          </div>
        </section>

        <section className="py-4 relative">
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-12 items-center py-2 group-hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span
                  key={i}
                  className={`text-xs font-bold uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-2
                    ${isDark
                      ? 'text-zinc-100 opacity-20 group-hover:opacity-60'
                      : 'text-zinc-900 opacity-30 group-hover:opacity-70'
                    } group-hover:text-rose-500`}
                >
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Projects</p>
            <h2 className="text-4xl font-bold tracking-tight">Public Repos</h2>
          </div>

          <div className="grid gap-6 md:gap-8">
            {loading ? (
              <div className="h-40 flex items-center justify-center animate-pulse text-zinc-600 font-mono uppercase tracking-widest text-xs">Fetching projects...</div>
            ) : (
              <>
                {topProject && (
                  <a
                    href={topProject.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 border-rose-500/25
                      ${isDark ? 'bg-gradient-to-br from-[#120808] to-[#0f0f0f] shadow-[0_0_50px_-12px_rgba(225,29,72,0.2)]' : 'bg-white shadow-xl'}`}
                  >
                    <div className="absolute top-8 right-8 text-rose-500 animate-pulse"><Trophy size={24} /></div>
                    <span className="absolute -top-6 -left-4 text-[10rem] md:text-[12rem] font-black leading-none opacity-[0.04] pointer-events-none select-none italic group-hover:opacity-[0.08] transition-opacity">TOP</span>
                    <div className="relative z-10 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase tracking-tighter">Featured</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/50 text-rose-500 uppercase tracking-tighter">{topProject.owner.login}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-rose-500 transition-colors uppercase">{topProject.name.replace(/-/g, ' ')}</h3>
                        <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{topProject.description || "Flagship open source project."}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-rose-500/10">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1.5 text-sm font-bold text-rose-500"><Star size={16} fill="currentColor" /> {topProject.stargazers_count} stars</span>
                          {topProject.language && <span className={`text-sm font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{topProject.language}</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">View Repository <ArrowUpRight size={16} /></div>
                      </div>
                    </div>
                  </a>
                )}

                <div className="grid gap-5 md:gap-6">
                  {otherProjects.map((repo, idx) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative overflow-hidden p-7 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-1 border-zinc-800/40 hover:border-rose-500/30
                        ${isDark ? 'bg-[#0f0f0f]' : 'bg-white hover:shadow-xl'}`}
                    >
                      <span className="absolute -top-4 -left-2 text-[6rem] md:text-[8rem] font-black leading-none opacity-[0.03] pointer-events-none select-none italic group-hover:opacity-[0.06] transition-opacity">{idx + 2 < 10 ? `0${idx + 2}` : idx + 2}</span>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-rose-500 transition-colors uppercase">{repo.name.replace(/-/g, ' ')}</h3>
                            <p className={`text-sm md:text-base max-w-md line-clamp-2 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{repo.description || "Experimental open source project."}</p>
                          </div>
                        </div>
                        <div className="mt-6 md:mt-8 flex items-center justify-between">
                          <div className="flex gap-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-800 opacity-40`}>{repo.owner.login}</span>
                            {repo.language && <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>{repo.language}</span>}
                            <span className="flex items-center gap-1 text-[11px] font-bold opacity-40"><Star size={12} /> {repo.stargazers_count}</span>
                          </div>
                          <div className={`p-3 rounded-full transition-all duration-300 ${isDark ? 'bg-zinc-800 text-zinc-500 group-hover:bg-rose-600 group-hover:text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-rose-600 group-hover:text-white'}`}><ExternalLink size={18} /></div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* rest of your code remains completely unchanged */}
        <section className="space-y-6">
          <div>
            <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Contact</p>
            <h2 className="text-4xl font-bold tracking-tight">Connect with me</h2>
          </div>

          <div className="space-y-3">
            <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(225,29,72,0.3)] hover:border-rose-500/30' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-rose-500' : 'bg-zinc-100 text-zinc-600'}`}><Mail size={20} /></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Email</span>
                <span className="font-medium text-sm">prayagfx@gmail.com</span>
              </div>
            </div>

            <a href="https://github.com/dev-prayag" target="_blank" rel="noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] hover:border-zinc-400' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-100 text-zinc-600'}`}><Github size={20} /></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">GitHub</span>
                <span className="font-medium text-sm">@dev-prayag</span>
              </div>
            </a>

            <button onClick={copyDiscord} className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-1 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:shadow-[0_0_30px_-10px_rgba(88,101,242,0.4)] hover:border-[#5865F2]/50' : 'bg-white border-zinc-200 hover:shadow-xl'}`}>
              <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-[#5865F2]' : 'bg-zinc-100 text-zinc-600'}`}>{copied ? <Check size={20} className="text-emerald-500" /> : <DiscordIcon size={20} />}</div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Discord</span>
                <span className="font-medium text-sm">{copied ? 'Copied to clipboard!' : 'prayag.cake'}</span>
              </div>
            </button>
          </div>

          <div className={`mt-10 p-8 rounded-[2.5rem] relative overflow-hidden group border transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-[#120808] to-[#080808] border-rose-500/10 hover:border-rose-500/30' : 'bg-rose-50/50 border-rose-100'}`}>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest"><div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></div>Available for work</div>
              <h2 className="text-3xl font-bold tracking-tight">Let's collaborate</h2>
              <p className="text-sm opacity-50">Available for ur gandmasti.</p>
              <a href="mailto:prayagfx@gmail.com" className="mt-4 w-full bg-rose-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-500 transition-all active:scale-[0.98] shadow-lg shadow-rose-900/40">
                <Send size={18} /> Send me an email <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full group-hover:bg-rose-500/20 transition-all duration-700"></div>
          </div>
        </section>

      </main>

      <footer className="py-10 text-center opacity-30 text-[10px] font-mono tracking-[0.2em]">
        © {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
