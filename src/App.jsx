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
  "PostgreSQL", "Docker", "Motion Design", "Figma", "MongDB"
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
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden ${
      isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'
    }`}>
      
      {/* Optimized Background Glow for PC */}
      <div 
        className="fixed pointer-events-none z-[0] w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[140px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 lg:opacity-100"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-6 lg:px-12 py-6 flex justify-between items-center max-w-7xl left-1/2 -translate-x-1/2">
        <span className="font-bold text-2xl tracking-tighter">Prayag.</span>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest opacity-50">
                <a href="#projects" className="hover:text-rose-500 transition-colors">Projects</a>
                <a href="#contact" className="hover:text-rose-500 transition-colors">Contact</a>
            </div>
            <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-xl bg-zinc-500/5 border border-zinc-500/10 hover:bg-rose-500/10 transition-colors">
              {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
            </button>
        </div>
      </nav>

      {/* Main Content: Max-width increased for PC layout */}
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-20 space-y-32">

        {/* Improved Desktop Cursor */}
        <div 
          className="fixed pointer-events-none z-[100] w-3 h-3 rounded-full bg-rose-500 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference hidden lg:block"
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        {/* Hero Section: Grid layout for PC */}
        <section className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              Available for Hire
            </div>
            <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                  Programmer <br/>
                  <span className={`${isDark ? 'text-zinc-800' : 'text-zinc-300'} transition-colors`}>& Editor.</span>
                </h1>
                <p className={`text-xl max-w-md leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Crafting high-performance web applications and cinematic motion designs with code and precision.
                </p>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className={`w-72 h-72 border-2 ${isDark ? 'border-zinc-800' : 'border-zinc-200'} rounded-[3rem] rotate-12 hover:rotate-0 transition-transform duration-700 flex items-center justify-center group relative`}>
                 <div className="absolute inset-4 border border-dashed border-rose-500/30 rounded-[2rem] animate-[spin_20s_linear_infinite]"></div>
                 <Code2 size={80} className="text-rose-500 opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </section>

        {/* TECH STACK: Enhanced Marquee */}
        <section className="py-4 border-y border-zinc-500/10">
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-4 group-hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span key={i} className={`text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3 ${isDark ? 'text-zinc-700 hover:text-rose-500' : 'text-zinc-300 hover:text-rose-500'} transition-colors cursor-default`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION: Grid optimization */}
        <section id="projects" className="space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">Portfolio</p>
              <h2 className="text-5xl font-bold tracking-tight">Public Repositories</h2>
            </div>
            <div className="hidden md:block text-xs font-mono opacity-30 uppercase tracking-widest">
                Scrolled to explore / {repos.length} items
            </div>
          </div>

          <div className="grid gap-8">
            {loading ? (
              <div className="h-64 flex items-center justify-center font-mono text-xs uppercase tracking-[0.5em] opacity-20">Initializing...</div>
            ) : (
              <>
                {/* Featured Project - Full Width with specific border */}
                {topProject && (
                  <a 
                    href={topProject.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden p-12 rounded-[3.5rem] border-2 transition-all duration-700 hover:-translate-y-2 flex flex-col lg:flex-row gap-8 ${
                      isDark ? 'bg-[#0c0c0c] border-zinc-800/50 hover:border-rose-500/40 shadow-2xl shadow-black' : 'bg-white border-zinc-100 hover:shadow-2xl'
                    }`}
                  >
                    <div className="lg:w-2/3 relative z-10 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="bg-rose-600 text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-tighter">Top Repository</span>
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-zinc-500/20 text-zinc-500 uppercase">{topProject.language}</span>
                      </div>
                      <h3 className="text-5xl font-black tracking-tighter group-hover:text-rose-500 transition-colors uppercase">{topProject.name.replace(/-/g, ' ')}</h3>
                      <p className={`text-xl leading-relaxed max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{topProject.description || "A high-performance open-source solution built for the community."}</p>
                      <div className="flex items-center gap-6 pt-4">
                        <span className="flex items-center gap-2 text-rose-500 font-bold"><Star size={20} fill="currentColor" /> {topProject.stargazers_count}</span>
                        <span className="flex items-center gap-2 font-bold opacity-40 hover:opacity-100 transition-opacity">View Details <ArrowUpRight size={18} /></span>
                      </div>
                    </div>
                    <div className="lg:w-1/3 flex items-center justify-center opacity-10 group-hover:opacity-100 transition-all duration-700">
                        <Trophy size={120} className="text-rose-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </a>
                )}

                {/* Smaller Repos: 2-column grid for PC */}
                <div className="grid md:grid-cols-2 gap-6">
                  {otherProjects.map((repo, idx) => (
                    <a 
                      key={repo.id} 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
                        isDark ? 'bg-[#0f0f0f] border-zinc-800/50 hover:border-rose-500/20' : 'bg-white border-zinc-100 hover:shadow-xl'
                      }`}
                    >
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold tracking-tight group-hover:text-rose-500 transition-colors uppercase">{repo.name.replace(/-/g, ' ')}</h3>
                            <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all" />
                          </div>
                          <p className={`text-sm line-clamp-2 leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{repo.description || "Experimental development project."}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                           <div className="flex gap-2">
                             {repo.language && <span className="text-[9px] font-black px-2 py-0.5 rounded border border-zinc-500/20 uppercase">{repo.language}</span>}
                             <span className="text-[9px] font-bold flex items-center gap-1 opacity-40"><Star size={10} /> {repo.stargazers_count}</span>
                           </div>
                           <span className="text-[10px] font-bold opacity-20 uppercase tracking-widest italic">0{idx + 2}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CONTACT SECTION: Optimized for PC Layout */}
        <section id="contact" className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">Contact</p>
              <h2 className="text-5xl font-bold tracking-tight">Let's build <br/> something epic.</h2>
            </div>
            
            <div className="grid gap-4">
              <a href="mailto:prayagfx@gmail.com" className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all group ${isDark ? 'bg-zinc-900/50 border-zinc-800 hover:border-rose-500/30' : 'bg-white border-zinc-100 hover:shadow-lg'}`}>
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500"><Mail size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</p>
                  <p className="font-bold">prayagfx@gmail.com</p>
                </div>
              </a>

              <button onClick={copyDiscord} className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all group w-full text-left ${isDark ? 'bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/30' : 'bg-white border-zinc-100 hover:shadow-lg'}`}>
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">{copied ? <Check size={24} className="text-emerald-500" /> : <DiscordIcon size={24} />}</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Discord</p>
                  <p className="font-bold">{copied ? 'Copied Username!' : 'prayag.cake'}</p>
                </div>
              </button>
            </div>
          </div>

          <div className={`p-10 rounded-[3rem] border-2 relative overflow-hidden flex flex-col justify-center ${isDark ? 'bg-[#0f0f0f] border-rose-500/20 shadow-[0_0_60px_-15px_rgba(225,29,72,0.1)]' : 'bg-rose-50 border-rose-100'}`}>
             <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-black tracking-tighter">Ready to start a project?</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>I am currently accepting new freelance projects and collaborations. If you're looking for clean code and high-end visuals, let's talk.</p>
                <a href="mailto:prayagfx@gmail.com" className="bg-rose-600 hover:bg-rose-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:gap-5 shadow-xl shadow-rose-900/20 active:scale-95">
                    SEND A MESSAGE <ArrowUpRight size={20} />
                </a>
             </div>
             {/* Decorative Background for Card */}
             <div className="absolute -right-10 -bottom-10 opacity-5">
                <Send size={240} className="-rotate-12" />
             </div>
          </div>
        </section>

      </main>

      <footer className="py-20 border-t border-zinc-500/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] font-black tracking-[0.3em] uppercase">
            <span>© {new Date().getFullYear()} PRAYAG DESIGN & CODE</span>
            <div className="flex gap-8">
                <a href="#" className="hover:text-rose-500 transition-colors">Twitter</a>
                <a href="#" className="hover:text-rose-500 transition-colors">Instagram</a>
                <a href="https://github.com/dev-prayag" className="hover:text-rose-500 transition-colors">Github</a>
            </div>
            <span>STAY CREATIVE</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        
        /* Hide default cursor on PC for custom cursor effect */
        @media (min-width: 1024px) {
            * { cursor: none !important; }
            a, button { cursor: none !important; }
        }

        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
