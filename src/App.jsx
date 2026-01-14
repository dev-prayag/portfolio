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
  Trophy
} from 'lucide-react';

const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
);

const TECH_STACK = [
  "React", "TypeScript", "Node.js", "Python", "Next.js", 
  "Tailwind CSS", "C++", "Rust", "Capcut", "Alight Motion", "After Effects",
  "PostgreSQL", "Docker", "Motion Design", "Figma", "MongoDB"
];

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden ${
      isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'
    }`}>
      
      {/* Background Glows */}
      <div 
        className="fixed pointer-events-none z-[0] w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[140px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 lg:opacity-100"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 flex justify-between items-center ${
        scrolled 
        ? `backdrop-blur-xl border-b ${isDark ? 'bg-black/40 border-zinc-800/50' : 'bg-white/40 border-zinc-200'}` 
        : 'bg-transparent border-b-transparent'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <span className="font-bold text-2xl tracking-tighter">Prayag.</span>
          <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-xl hover:bg-rose-500/10 transition-all active:scale-95">
            {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
          </button>
        </div>
      </nav>

      {/* PC Small Cursor */}
      <div 
        className="fixed pointer-events-none z-[110] w-2 h-2 rounded-full bg-rose-500 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-20 space-y-32">
        
        {/* Hero Section - Optimized for PC */}
        <section className="space-y-6 lg:space-y-10 animate-fade-in lg:pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-400/90 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            Available for work
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9] lg:leading-[0.85]">
                Programmer <br/>
                <span className={`transition-colors ${isDark ? 'text-zinc-800' : 'text-zinc-200'}`}>& Editor.</span>
              </h1>
            </div>
            <div className="max-w-md lg:pb-4">
              <p className={`text-lg lg:text-xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Building open-source tools and high-performance applications. 
                Currently exploring the intersection of code and visual motion.
              </p>
            </div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="py-4 relative border-y border-zinc-800/30 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center py-2">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={i} className={`text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDark ? 'text-zinc-700' : 'text-zinc-300'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION - Wide Layout */}
        <section className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">Selected Work</p>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Public Repos</h2>
            </div>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">[{repos.length}] Projects found</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {loading ? (
              <div className="col-span-12 h-60 flex items-center justify-center font-mono uppercase text-xs tracking-widest opacity-40">Fetching GitHub Data...</div>
            ) : (
              <>
                {topProject && (
                  <div className="lg:col-span-8 h-full">
                    <a 
                      href={topProject.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative h-full flex flex-col justify-between overflow-hidden p-8 lg:p-12 rounded-[3rem] border transition-all duration-700 ${
                        isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:border-rose-500/40' : 'bg-white border-zinc-100 shadow-xl'
                      }`}
                    >
                      <div className="absolute top-10 right-10 text-rose-500"><Trophy size={32} /></div>
                      <span className="absolute -bottom-10 -right-10 text-[18rem] font-black leading-none opacity-[0.02] pointer-events-none select-none italic group-hover:opacity-[0.05] transition-opacity">TOP</span>
                      
                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black px-3 py-1 rounded bg-rose-600 text-white uppercase tracking-widest">Featured</span>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{topProject.owner.login}</span>
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-bold tracking-tighter uppercase group-hover:text-rose-500 transition-colors">{topProject.name.replace(/-/g, ' ')}</h3>
                        <p className={`text-lg lg:text-xl max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{topProject.description || "Flagship open source project."}</p>
                      </div>

                      <div className="mt-12 flex items-center justify-between pt-8 border-t border-zinc-800/50">
                        <div className="flex gap-6">
                          <span className="flex items-center gap-2 text-sm font-bold text-rose-500"><Star size={18} fill="currentColor" /> {topProject.stargazers_count}</span>
                          <span className="text-sm font-bold opacity-40 uppercase tracking-widest">{topProject.language}</span>
                        </div>
                        <span className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group-hover:gap-4 transition-all">View Project <ArrowUpRight size={20} /></span>
                      </div>
                    </a>
                  </div>
                )}

                {/* Sub-grid for other projects */}
                <div className="lg:col-span-4 grid gap-6">
                  {otherProjects.slice(0, 2).map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" 
                       className={`group p-8 rounded-[2.5rem] border transition-all duration-500 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:border-rose-500/40' : 'bg-white border-zinc-100 hover:shadow-xl'}`}>
                      <div className="flex flex-col h-full justify-between gap-8">
                        <div>
                          <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-rose-500 transition-colors">{repo.name}</h3>
                          <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{repo.description}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{repo.language}</span>
                          <div className="p-3 rounded-full bg-zinc-800/50 text-zinc-500 group-hover:bg-rose-600 group-hover:text-white transition-all"><ExternalLink size={16} /></div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                
                {/* 3-Column Grid for remaining projects on PC */}
                <div className="col-span-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {otherProjects.slice(2, 5).map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" 
                       className={`group p-8 rounded-[2.5rem] border transition-all duration-500 ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:border-rose-500/40' : 'bg-white border-zinc-100'}`}>
                      <div className="flex flex-col h-full justify-between gap-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-rose-500 transition-colors">{repo.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5 text-xs font-bold opacity-40"><Star size={14} /> {repo.stargazers_count}</span>
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CONNECT SECTION - Wide Grid */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">Contact</p>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Let's talk.</h2>
            </div>
            
            <div className="grid gap-4">
              <div className={`flex items-center gap-5 p-5 rounded-3xl border transition-all ${isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="p-4 rounded-2xl bg-zinc-900 text-rose-500"><Mail size={24} /></div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-30">Email</p>
                  <p className="text-lg font-medium">prayagfx@gmail.com</p>
                </div>
              </div>

              <button onClick={copyDiscord} className={`flex items-center w-full text-left gap-5 p-5 rounded-3xl border transition-all group ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:border-[#5865F2]/50' : 'bg-white border-zinc-200'}`}>
                <div className={`p-4 rounded-2xl transition-colors ${isDark ? 'bg-zinc-900 group-hover:text-[#5865F2]' : 'bg-zinc-100'}`}>
                  {copied ? <Check size={24} className="text-emerald-500" /> : <DiscordIcon size={24} />}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-30">Discord</p>
                  <p className="text-lg font-medium">{copied ? 'Copied Username!' : 'prayag.cake'}</p>
                </div>
              </button>
            </div>
          </div>

          <div className={`p-10 lg:p-16 rounded-[3.5rem] relative overflow-hidden group border transition-all duration-700 ${isDark ? 'bg-zinc-900/50 border-rose-500/10 hover:border-rose-500/30' : 'bg-rose-50 border-rose-100'}`}>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-rose-500 text-xs font-black uppercase tracking-widest">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse"></div>
                Project Inquiry
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter">Ready to start <br/> a new project?</h3>
              <a href="mailto:prayagfx@gmail.com" className="inline-flex items-center gap-3 bg-rose-600 hover:bg-rose-500 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-rose-900/20">
                Send Message <Send size={20} />
              </a>
            </div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-500/10 blur-[100px] rounded-full group-hover:bg-rose-500/20 transition-all duration-700"></div>
          </div>
        </section>

      </main>

      <footer className={`py-12 border-t ${isDark ? 'border-zinc-800/50 bg-[#050505]' : 'border-zinc-100 bg-white'} text-center`}>
        <p className="opacity-40 text-[10px] font-black tracking-[0.5em] uppercase">
          © {new Date().getFullYear()} PRAYAG — ALL RIGHTS RESERVED
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
    </div>
  );
}
