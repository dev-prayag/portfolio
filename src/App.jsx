import React, { useState, useEffect } from 'react';
import { Github, Mail, Moon, Sun, ArrowUpRight, Code2, Video, Terminal, ExternalLink, Star, GitFork } from 'lucide-react';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Public GitHub Repos
  useEffect(() => {
    fetch('https://api.github.com/users/dev-prayag/repos?sort=updated&per_page=8')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out forks if you only want original work
          setRepos(data.filter(repo => !repo.fork));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500/30 ${
      isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'
    }`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-6 py-5 flex justify-between items-center max-w-5xl left-1/2 -translate-x-1/2">
        <span className="font-bold text-xl tracking-tighter">Prayag.</span>
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-rose-500/10 transition-colors">
            {isDark ? <Sun size={20} className="text-rose-400" /> : <Moon size={20} className="text-zinc-600" />}
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-28">
        
        {/* Hero Section */}
        <section className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-400/90 text-xs font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)]"></span>
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

          <div className="flex flex-wrap gap-4">
            <a href="mailto:prayagfx@gmail.com" className="px-8 py-3 rounded-full font-semibold bg-rose-600 text-white hover:bg-rose-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-900/20 flex items-center gap-2">
              Get in touch <ArrowUpRight size={18} />
            </a>
            <a href="https://github.com/dev-prayag" target="_blank" className={`px-8 py-3 rounded-full font-semibold border transition-all ${
              isDark ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
            }`}>
              GitHub
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500/80 flex items-center gap-3">
            <div className="h-px w-8 bg-rose-500/30"></div> Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white border-zinc-100'}`}>
              <Terminal size={24} className="text-rose-500 mb-4" />
              <h3 className="font-bold mb-4">Development</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Python', 'Bun', 'Tailwind'].map(s => (
                  <span key={s} className={`px-3 py-1 rounded-lg text-sm ${isDark ? 'bg-zinc-800/50 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white border-zinc-100'}`}>
              <Video size={24} className="text-rose-500 mb-4" />
              <h3 className="font-bold mb-4">Video Editing</h3>
              <div className="flex flex-wrap gap-2">
                {['After Effects', 'Alight Motion', 'CapCut', 'Premiere'].map(s => (
                  <span key={s} className={`px-3 py-1 rounded-lg text-sm ${isDark ? 'bg-zinc-800/50 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Projects (Video Style) */}
        <section className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <div>
              <p className="text-rose-500 font-bold text-xs uppercase tracking-widest mb-2">Projects</p>
              <h2 className="text-4xl font-bold tracking-tight">Public Repos</h2>
            </div>
            <a href="https://github.com/dev-prayag" className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity">view all →</a>
          </div>

          <div className="grid gap-6">
            {loading ? (
              <div className="h-40 flex items-center justify-center animate-pulse text-zinc-600 font-mono uppercase tracking-widest">Fetching Repos...</div>
            ) : (
              repos.map((repo, idx) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-1 ${
                    isDark ? 'bg-[#0f0f0f] border-zinc-800/50 hover:border-rose-500/30' : 'bg-white border-zinc-100 hover:shadow-xl'
                  }`}
                >
                  {/* Background Index Number (From your video) */}
                  <span className="absolute -top-4 -left-2 text-[8rem] font-black leading-none opacity-[0.03] pointer-events-none select-none italic">
                    0{idx + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold tracking-tight group-hover:text-rose-500 transition-colors uppercase">
                            {repo.name.replace(/-/g, ' ')}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-400'}`}>
                            {new Date(repo.created_at).getFullYear()}
                          </span>
                        </div>
                        <p className={`text-sm max-w-md line-clamp-2 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                          {repo.description || "Experimental open source project."}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex gap-3">
                        {repo.language && (
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] font-bold opacity-40">
                          <Star size={12} /> {repo.stargazers_count}
                        </span>
                      </div>
                      <div className={`p-3 rounded-full transition-all duration-300 ${
                        isDark ? 'bg-zinc-800 text-zinc-500 group-hover:bg-rose-600 group-hover:text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-rose-600 group-hover:text-white'
                      }`}>
                        <ExternalLink size={18} />
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className={`rounded-[3rem] p-10 sm:p-20 text-center space-y-8 relative overflow-hidden ${
          isDark ? 'bg-zinc-900/30 border border-zinc-800/50' : 'bg-zinc-50 border border-zinc-200'
        }`}>
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight italic">Let's build something <br/> amazing.</h2>
            <p className="opacity-50 max-w-xs mx-auto text-sm uppercase tracking-widest font-bold">Based in India • Worldwide</p>
          </div>
          <a href="mailto:prayagfx@gmail.com" className="inline-block bg-rose-600 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-500 transition-all shadow-xl shadow-rose-900/20">
            Start a conversation
          </a>
        </section>
      </main>

      <footer className="py-10 text-center opacity-30 text-xs font-mono">
        © {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
