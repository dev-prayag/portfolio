import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, Star, ArrowLeft, Github } from 'lucide-react';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Attempt to sync dark mode from local storage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }

    const fetchAllRepos = async () => {
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
    fetchAllRepos();
  }, []);

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className={`min-h-screen pt-24 pb-20 px-6 md:px-12 transition-colors duration-500 animate-fade-in
      ${isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'}`}>

      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-10 text-sm font-medium transition-colors hover:text-rose-400
            ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className={`text-4xl md:text-5xl font-bold mb-10 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          All Projects
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} size={20} />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all
                ${isDark ? 'bg-zinc-900/60 border-zinc-700 text-white placeholder-zinc-500 focus:ring-rose-500/40' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:ring-rose-400/40'}`}
            />
          </div>

          <div className="relative min-w-[180px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all
                ${isDark ? 'bg-zinc-900/60 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'}`}
            >
              <span className="font-medium">{selectedLanguage || 'All'}</span>
              <svg 
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {isOpen && (
              <div className={`absolute top-full mt-2 left-0 right-0 z-[60] py-2 rounded-xl border shadow-xl backdrop-blur-xl animate-fade-in
                ${isDark ? 'bg-black/90 border-zinc-800 text-zinc-300' : 'bg-white/90 border-zinc-200 text-zinc-700'}`}>
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors
                      ${selectedLanguage === lang 
                        ? (isDark ? 'text-rose-400 bg-rose-500/10' : 'text-rose-600 bg-rose-50') 
                        : (isDark ? 'hover:bg-zinc-800/50 hover:text-white' : 'hover:bg-zinc-100 hover:text-zinc-900')}`}
                  >
                    {lang || 'Unknown'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl opacity-60">Loading all projects...</div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-20 text-xl opacity-60">
            No projects match your search or filter
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-xl
                  ${isDark ? 'bg-zinc-900/40 border-zinc-800 hover:border-rose-500/40' : 'bg-white border-zinc-200 hover:border-rose-400/40 shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl md:text-2xl font-bold group-hover:text-rose-400 transition-colors
                    ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <ExternalLink size={20} className={`${isDark ? 'text-zinc-500 group-hover:text-rose-400' : 'text-zinc-400 group-hover:text-rose-600'} transition-colors`} />
                </div>

                <p className={`mb-6 line-clamp-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {repo.description || "No description available"}
                </p>

                <div className="flex items-center justify-between text-sm">
                  {repo.language && (
                    <span className={`px-3 py-1 rounded-full font-medium ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                      {repo.language}
                    </span>
                  )}
                  <span className={`flex items-center gap-2 ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                    <Star size={16} fill="currentColor" /> {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <footer className={`py-16 text-center text-sm font-mono tracking-wider border-t transition-colors
        ${isDark ? 'border-zinc-800/40 text-zinc-500' : 'border-zinc-200 text-zinc-500'}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/dev-prayag"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
          </div>
          <p>© {new Date().getFullYear()} PRAYAG. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        * { cursor: none !important; }
      `}} />
    </div>
  );
}
