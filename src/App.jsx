import React, { useState, useEffect } from 'react';
import { Github, Mail, Moon, Sun, ArrowUpRight, Code2, Video, Terminal, ExternalLink, Star, MessageSquare } from 'lucide-react';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'projects', 'contact'
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only PUBLIC repos
  useEffect(() => {
    fetch('https://api.github.com/users/dev-prayag/repos?visibility=public&sort=updated')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Double filter to ensure no private/forked repos if API defaults change
          const publicRepos = data.filter(repo => repo.private === false && repo.fork === false);
          setRepos(publicRepos);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  // Navigation Component
  const Nav = () => (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-6 py-5 flex justify-between items-center max-w-5xl left-1/2 -translate-x-1/2">
      <span className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => setCurrentPage('home')}>Prayag.</span>
      <div className="flex items-center gap-6">
        <button onClick={() => setCurrentPage('projects')} className={`text-sm font-medium ${currentPage === 'projects' ? 'text-rose-500' : 'opacity-60 hover:opacity-100'}`}>Projects</button>
        <button onClick={() => setCurrentPage('contact')} className={`text-sm font-medium ${currentPage === 'contact' ? 'text-rose-500' : 'opacity-60 hover:opacity-100'}`}>Contact</button>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-rose-500/10 transition-colors">
          {isDark ? <Sun size={18} className="text-rose-400" /> : <Moon size={18} className="text-zinc-600" />}
        </button>
      </div>
    </nav>
  );

  // --- PAGES ---

  const HomePage = () => (
    <section className="space-y-20 animate-fade-in">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          Available for work
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">Programmer <br/><span className="opacity-30">& Editor.</span></h1>
        <p className="text-lg max-w-xl text-zinc-500 leading-relaxed">Crafting digital experiences through clean code and cinematic video editing.</p>
        <div className="flex gap-4">
          <button onClick={() => setCurrentPage('projects')} className="px-8 py-3 rounded-full font-semibold bg-rose-600 text-white hover:bg-rose-500 transition-all">View Projects</button>
          <button onClick={() => setCurrentPage('contact')} className="px-8 py-3 rounded-full font-semibold border border-zinc-800 hover:bg-zinc-900 text-zinc-300 transition-all">Contact Me</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white border-zinc-100'}`}>
          <Terminal size={24} className="text-rose-500 mb-4" />
          <h3 className="font-bold mb-4">Development</h3>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Python', 'Bun'].map(s => <span key={s} className="px-3 py-1 rounded-lg text-xs bg-zinc-800/50 text-zinc-400">{s}</span>)}
          </div>
        </div>
        <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white border-zinc-100'}`}>
          <Video size={24} className="text-rose-500 mb-4" />
          <h3 className="font-bold mb-4">Video Editing</h3>
          <div className="flex flex-wrap gap-2">
            {['After Effects', 'Alight Motion', 'CapCut', 'Premiere'].map(s => <span key={s} className="px-3 py-1 rounded-lg text-xs bg-zinc-800/50 text-zinc-400">{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectsPage = () => (
    <section className="space-y-12 animate-fade-in">
      <div>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Projects</h2>
        <p className="text-zinc-500">A curated list of my public open-source repositories.</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 text-center text-zinc-600 uppercase tracking-widest text-xs animate-pulse">Syncing GitHub...</div>
        ) : (
          repos.map((repo, idx) => (
            <div key={repo.id} className={`group relative overflow-hidden p-8 rounded-[2rem] border transition-all duration-500 ${isDark ? 'bg-[#0f0f0f] border-zinc-800/50' : 'bg-white border-zinc-100'}`}>
              <span className="absolute -top-4 -left-2 text-[8rem] font-black leading-none opacity-[0.03] select-none italic">0{idx + 1}</span>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-rose-500 transition-colors">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-2 max-w-md">{repo.description || "No description provided."}</p>
                  </div>
                  <span className="text-xs font-bold opacity-30">{new Date(repo.created_at).getFullYear()}</span>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex gap-3">
                    {repo.language && <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400">{repo.language}</span>}
                    <span className="flex items-center gap-1 text-[10px] font-bold opacity-30"><Star size={10} /> {repo.stargazers_count}</span>
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-800 text-zinc-500 hover:bg-rose-600 hover:text-white transition-all">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="space-y-12 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold tracking-tight">Get in Touch</h2>
        <p className="text-zinc-500 max-w-md text-lg">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
      </div>

      <div className="grid gap-4">
        {[
          { icon: <Mail size={20}/>, label: 'Email', value: 'prayagfx@gmail.com', link: 'mailto:prayagfx@gmail.com' },
          { icon: <Github size={20}/>, label: 'GitHub', value: '@dev-prayag', link: 'https://github.com/dev-prayag' },
          { icon: <MessageSquare size={20}/>, label: 'Discord', value: 'prayag.cake', link: '#' }
        ].map((item, i) => (
          <a key={i} href={item.link} className={`flex items-center gap-6 p-6 rounded-[1.5rem] border transition-all ${isDark ? 'bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900' : 'bg-white border-zinc-100 hover:shadow-md'}`}>
            <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-500">{item.icon}</div>
            <div>
              <p className="text-xs font-bold opacity-30 uppercase tracking-widest">{item.label}</p>
              <p className="text-lg font-medium">{item.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="p-10 rounded-[2.5rem] bg-rose-600 text-white text-center space-y-6 shadow-xl shadow-rose-900/20">
        <h3 className="text-3xl font-bold tracking-tight">Let's collaborate</h3>
        <p className="opacity-80">Ready to start your next big project?</p>
        <a href="mailto:prayagfx@gmail.com" className="inline-block bg-white text-rose-600 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">Send an email</a>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'}`}>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <footer className="py-10 text-center opacity-30 text-[10px] font-mono tracking-widest">
        © 2025 PRAYAG. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
