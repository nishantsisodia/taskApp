'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-white to-gray-100'
          : 'bg-gradient-to-br from-gray-900 to-gray-800'
      }`}
    >
      {/* NAV */}
      <nav
        className={`fixed w-full top-0 z-50 ${
          theme === 'light' ? 'bg-white/80 border-gray-200' : 'bg-gray-900/80 border-gray-700'
        } backdrop-blur-md border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              TaskMaster
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>

              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`border-2 px-6 py-2 rounded-lg transition-all ${
                  theme === 'light'
                    ? 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                    : 'border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white'
                }`}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HERO */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Manage Tasks with Ease
            </h1>
            <p
              className={`text-xl mb-12 max-w-2xl mx-auto ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}
            >
              Stay organized, boost productivity, and achieve your goals with our modern task
              management solution.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
                  theme === 'light'
                    ? 'bg-white text-gray-800 hover:bg-gray-50'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* FEATURES */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard theme={theme} icon="✨" title="Smart Organization" description="Organize tasks with intuitive categories and priorities" />
            <FeatureCard theme={theme} icon="🔄" title="Real-time Updates" description="Stay in sync with real-time task status updates" />
            <FeatureCard theme={theme} icon="📱" title="Responsive Design" description="Access your tasks from any device, anywhere" />
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <StatCard theme={theme} number="10k+" label="Active Users" />
            <StatCard theme={theme} number="50k+" label="Tasks Completed" />
            <StatCard theme={theme} number="99%" label="Satisfaction Rate" />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className={`backdrop-blur-md border-t py-8 ${
          theme === 'light'
            ? 'bg-white/80 border-gray-200 text-gray-600'
            : 'bg-gray-900/80 border-gray-700 text-gray-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ theme, icon, title, description }) => (
  <div
    className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
      theme === 'light' ? 'bg-white' : 'bg-gray-800'
    }`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3
      className={`text-xl font-semibold mb-2 ${
        theme === 'light' ? 'text-gray-800' : 'text-white'
      }`}
    >
      {title}
    </h3>
    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{description}</p>
  </div>
);

const StatCard = ({ theme, number, label }) => (
  <div
    className={`rounded-xl p-6 shadow-lg ${
      theme === 'light' ? 'bg-white' : 'bg-gray-800'
    }`}
  >
    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
      {number}
    </div>
    <div className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{label}</div>
  </div>
);
