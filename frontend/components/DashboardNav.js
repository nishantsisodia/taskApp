'use client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DashboardNav = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    router.replace('/login');
  };

  if (!mounted) return null; // SSR me kuch render mat karo

  return (
    <nav
      className={`fixed w-full top-0 z-50 ${
        theme === 'light'
          ? 'bg-white/80 border-gray-200'
          : 'bg-gray-900/80 border-gray-700'
      } backdrop-blur-md border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              TaskMaster
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
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

            {token ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          {token && (
            <div className="md:hidden relative">

               <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 mx-1 rounded-sm transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`p-2 mx-1 rounded-sm transition-colors ${
                  theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200 text-black'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                ☰
              </button>

              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                    theme === 'light'
                      ? 'bg-white border border-gray-200 text-black'
                      : 'bg-gray-800 border border-gray-700'
                  }`}
                >
                  <div className="px-4 py-2 text-sm font-medium border-b">
                    {localStorage.getItem('user')
                      ? "Welcome " + JSON.parse(localStorage.getItem('user')).name
                      : 'User'}
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-purple-500 hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Login (not logged in) */}
          {!token && (
            <div className="md:hidden">
              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
