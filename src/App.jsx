import React, { useState, useEffect } from 'react';
import { Github, Mail, Moon, Sun, ArrowUpRight, Code2, Video, Terminal, ExternalLink, Star, GitFork } from 'lucide-react';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub Projects
  useEffect(() => {
    fetch('https://api.github.com/users/dev-prayag/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-200 selection:text-rose-900 ${
      isDark ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-[#fcfcfc] text-zinc-900'
    }`}>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-transparent px-6 py-4 flex justify-between items-center max-w-5xl left-1/2 -translate-x-1/2">
        <span className="font-bold text-lg tracking-tight">Prayag.</span>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all ${
            isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-24">
        
        {/* Hero Section */}
        <section className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Available for work
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              I'm Prayag, a <br/>
              <span className="text-zinc-400 dark:text-zinc-600">programmer</span> & <span className="text-zinc-400 dark:text-zinc-600">editor.</span>
            </h1>
            <p className={`text-lg max-w-xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Building digital tools and crafting visual stories. Focused on clean code and high-retention video editing.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="mailto:prayagfx@gmail.com" className={`px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
              isDark ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'
            }`}>
              Get in touch <ArrowUpRight size={18} />
            </a>
            <a href="https://github.com/dev-prayag" target="_blank" className={`px-6 py-3 rounded-full font-medium transition-colors border ${
              isDark ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
            }`}>
              GitHub Profile
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Terminal size={24} className="text-rose-500" />
            Tech Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-6 rounded-3xl space-y-4 border ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                  <Code2 size={20} />
                </div>
                <span className="text-xs font-medium text-zinc-500">Development</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Python', 'Tailwind', 'Bun'].map((tech) => (
                  <span key={tech} className={`px-3 py-1.5 rounded-md text-sm font-medium ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-3xl space-y-4 border ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                  <Video size={20} />
                </div>
                <span className="text-xs font-medium text-zinc-500">Editing</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['After Effects', 'Alight Motion', 'CapCut', 'Premiere Pro'].map((tech) => (
                  <span key={tech} className={`px-3 py-1.5 rounded-md text-sm font-medium ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live GitHub Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recent Repositories</h2>
            <span className="text-xs font-mono opacity-50">API Live</span>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="py-10 text-center animate-pulse text-zinc-500">Loading GitHub projects...</div>
            ) : (
              repos.map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-6 rounded-3xl border transition-all duration-300 hover:border-rose-500/50 ${
                    isDark ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-100 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold group-hover:text-rose-500 transition-colors uppercase tracking-tight">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500" />
                  </div>
                  <p className={`text-sm line-clamp-2 mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {repo.description || "No description provided for this project."}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-rose-500">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 opacity-50"><Star size={12} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1 opacity-50"><GitFork size={12} /> {repo.forks_count}</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>

        {/* Contact Footer */}
        <section className={`rounded-3xl p-8 sm:p-12 text-center space-y-6 ${
          isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
        }`}>
          <h2 className="text-3xl font-bold tracking-tight">Let's work together.</h2>
          <p className="max-w-md mx-auto opacity-60">Currently looking for freelance editing gigs or frontend roles.</p>
          <div className="flex justify-center gap-4 pt-4">
            <a href="mailto:prayagfx@gmail.com" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-rose-600/20">
              Start a conversation
            </a>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
