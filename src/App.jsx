import React, { useState, useEffect } from 'react';
import {
  Github, Mail, Moon, Sun, ArrowUpRight,
  ExternalLink, Star, Check, Send, Trophy
} from 'lucide-react';

const DiscordIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515c-.03-.006-.064.01-.079.037-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.164-.386-.406-.875-.617-1.25-.015-.027-.05-.043-.079-.037A19.736 19.736 0 0 0 3.677 4.37c-.013.007-.025.016-.032.027C.533 9.046-.32 13.58.099 18.057c.003.023.012.043.031.057a19.9 19.9 0 0 0 5.993 3.03c.03.01.063 0 .084-.028.4-.54.753-1.11 1.226-1.994.017-.03.003-.07-.041-.106a13.107 13.107 0 0 1-1.872-.892c-.045-.027-.049-.095-.008-.128.12-.098.246-.198.372-.292.022-.018.054-.022.077-.01 3.928 1.793 8.18 1.793 12.062 0 .024-.012.055-.009.078.01.127.094.253.194.373.292.041.033.037.1-.006.127a12.299 12.299 0 0 1-1.873.892c-.044.037-.058.076-.041.107.473.883.826 1.453 1.225 1.993.021.028.054.039.084.028a19.839 19.839 0 0 0 6.002-3.03.067.067 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const TECH_STACK = [
  "React", "TypeScript", "Node.js", "Python", "Next.js",
  "Tailwind CSS", "C++", "Rust", "MongoDB",
  "PostgreSQL", "Docker", "Figma",
  "CapCut", "After Effects", "Motion Design"
];

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('https://api.github.com/users/dev-prayag/repos').then(r => r.json()),
      fetch('https://api.github.com/users/OpenUwU/repos').then(r => r.json())
    ])
      .then(([a, b]) =>
        [...a, ...b]
          .filter(r => !r.fork)
          .sort((x, y) => y.stargazers_count - x.stargazers_count)
          .slice(0, 10)
      )
      .then(setRepos)
      .finally(() => setLoading(false));
  }, []);

  const copyDiscord = () => {
    navigator.clipboard.writeText('prayag.cake');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [topProject, ...otherProjects] = repos;

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      isDark ? 'bg-[#080808] text-zinc-100' : 'bg-[#f8f8f8] text-zinc-900'
    }`}>

      <div
        className="fixed pointer-events-none z-[90] w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[140px] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md px-10 py-6 max-w-6xl mx-auto left-1/2 -translate-x-1/2 flex justify-between">
        <span className="font-bold text-2xl">Prayag.</span>
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-rose-500/10">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-8 pt-40 pb-24 space-y-28">

        <section>
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            Programmer <br />
            <span className="text-zinc-500">& Editor.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            Building open-source tools and high-performance applications.
          </p>
        </section>

        <section className="overflow-hidden">
          <div className="flex animate-marquee gap-12 whitespace-nowrap py-4">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <span key={i} className="text-xs font-bold tracking-[0.3em] opacity-30 hover:opacity-70 transition">
                • {t}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-bold">Public Repos</h2>

          {loading ? (
            <div className="h-40 flex items-center justify-center opacity-40">
              Fetching projects...
            </div>
          ) : (
            <>
              {topProject && (
                <a
                  href={topProject.html_url}
                  target="_blank"
                  className="block p-12 rounded-[3rem] border-2 border-rose-500/30 hover:border-rose-500 transition hover:-translate-y-2"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-4xl font-bold uppercase">
                      {topProject.name.replace(/-/g, ' ')}
                    </h3>
                    <Trophy className="text-rose-500" />
                  </div>
                  <p className="text-zinc-400 max-w-2xl">
                    {topProject.description || 'Featured project'}
                  </p>
                </a>
              )}

              <div className="grid lg:grid-cols-2 gap-6">
                {otherProjects.map(repo => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="p-8 rounded-3xl border border-zinc-700/60 hover:border-rose-500/40 transition hover:-translate-y-1"
                  >
                    <h3 className="text-2xl font-bold uppercase">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                      {repo.description || 'Open source project'}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="space-y-6">
          <h2 className="text-4xl font-bold">Connect</h2>

          <button
            onClick={copyDiscord}
            className="w-full p-6 rounded-3xl border border-zinc-700 hover:border-[#5865F2] transition flex gap-4"
          >
            {copied ? <Check /> : <DiscordIcon />}
            <span>{copied ? 'Copied!' : 'prayag.cake'}</span>
          </button>

          <a
            href="mailto:prayagfx@gmail.com"
            className="block text-center bg-rose-600 hover:bg-rose-500 transition text-white py-5 rounded-3xl font-bold"
          >
            Send me an email
          </a>
        </section>

      </main>

      <footer className="py-10 text-center text-xs opacity-40">
        © {new Date().getFullYear()} PRAYAG
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        * { cursor: none; }
      `}</style>
    </div>
  );
}
