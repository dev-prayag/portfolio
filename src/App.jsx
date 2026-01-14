import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Mail, 
  Moon, 
  Sun, 
  ArrowUpRight, 
  Terminal, 
  Video, 
  ExternalLink, 
  Star, 
  Check,
  Send
} from 'lucide-react';

// Custom Discord Icon SVG
const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
);

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/dev-prayag/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(repo => !repo.fork).slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyDiscord = () => {
    navigator.clipboard.writeText('prayag.cake');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 ${
      isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'
    }`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-6 py-5 flex justify-between items-center max-w-5xl left-1/2 -translate-x-1/2">
        <span className="font-bold text-xl tracking-tighter">Prayag.</span>
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-rose-500/10 transition-colors">
          {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-28">
        
        {/* Hero Section */}
        <section className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-400/90 text-xs font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            Available for work
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
              Programmer <br/>
              <span className="text-zinc-500 dark:text-zinc-700">& Editor.</span>
            </h1>
            <p className={`text-lg max-w-xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Building open-source tools and high-performance applications. 
              Currently exploring the intersection of code and visual motion.
            </p>
          </div>

          {/* Contact Pills in Hero */}
          <div className="flex flex-wrap gap-3">
            <a href="mailto:prayagfx@gmail.com" className="px-6 py-2.5 rounded-full font-semibold bg-rose-600 text-white hover:bg-rose-500 transition-all flex items-center gap-2 text-sm shadow-lg shadow-rose-900/20">
              Email <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com/dev-prayag" target="_blank" rel="noreferrer" className={`px-6 py-2.5 rounded-full font-semibold border transition-all text-sm flex items-center gap-2 ${
              isDark ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
            }`}>
              <Github size={16} /> GitHub
            </a>
            <button onClick={copyDiscord} className={`px-6 py-2.5 rounded-full font-semibold border transition-all text-sm flex items-center gap-2 ${
              isDark ? 'border-zinc-800 bg-zinc-900/50 text-zinc-400' : 'border-zinc-200 bg-zinc-50 text-zinc-500'
            }`}>
              {copied ? <Check size={16} className="text-emerald-500" /> : <DiscordIcon size={16} />}
              {copied ? 'Copied!' : 'prayag.cake'}
            </button>
          </div>
        </section>

        {/* Repos Section (Abbreviated for brevity) */}
        <section className="space-y-8">
           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500/80 flex items-center gap-3">
            <div className="h-px w-8 bg-rose-500/30"></div> Public Repos
          </h2>
          <div className="grid gap-4">
            {loading ? <div className="animate-pulse text-zinc-600">Loading projects...</div> : repos.map((repo, idx) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className={`group p-6 rounded-[2rem] border transition-all ${isDark ? 'bg-zinc-900/20 border-zinc-800/50 hover:border-rose-500/30' : 'bg-white border-zinc-100'}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold uppercase tracking-tight group-hover:text-rose-500 transition-colors">{repo.name.replace(/-/g, ' ')}</h3>
                  <ExternalLink size={16} className="opacity-30 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CONNECT WITH ME SECTION (Based on your Uploaded Image) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-2">Connect with me</h2>
          
          <div className="space-y-3">
            {/* Email Card */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                <Mail size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Email</span>
                <span className="font-medium text-sm">prayagfx@gmail.com</span>
              </div>
            </div>

            {/* GitHub Card */}
            <a href="https://github.com/dev-prayag" target="_blank" rel="noreferrer" className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:bg-zinc-900/50' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                <Github size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">GitHub</span>
                <span className="font-medium text-sm">@dev-prayag</span>
              </div>
            </a>

            {/* Discord Card (Click to copy) */}
            <button onClick={copyDiscord} className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${isDark ? 'bg-[#0f0f0f] border-zinc-800 hover:bg-zinc-900/50' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                {copied ? <Check size={20} className="text-emerald-500" /> : <DiscordIcon size={20} />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Discord</span>
                <span className="font-medium text-sm">{copied ? 'Copied to clipboard!' : 'prayag.cake'}</span>
              </div>
            </button>
          </div>

          {/* Let's Collaborate Footer Box */}
          <div className={`mt-10 p-8 rounded-[2.5rem] relative overflow-hidden group ${isDark ? 'bg-gradient-to-br from-[#0a1510] to-[#080808] border border-emerald-500/10' : 'bg-emerald-50/50 border border-emerald-100'}`}>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Available for work
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Let's collaborate</h2>
              <p className="text-sm opacity-50">Available for ur gandmasti.</p>
              
              <a href="mailto:prayagfx@gmail.com" className="mt-4 w-full bg-[#10b981] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#059669] transition-all active:scale-[0.98]">
                <Send size={18} /> Send me an email <ArrowUpRight size={18} />
              </a>
            </div>
            {/* Subtle Glow Effect */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
          </div>
        </section>

      </main>

      <footer className="py-10 text-center opacity-30 text-[10px] font-mono tracking-[0.2em]">
        © {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
