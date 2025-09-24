'use client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DashboardNav = ({ user }) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  const navBg = theme === 'light' ? 'bg-white/80 border-gray-200' : 'bg-gray-900/80 border-gray-700';
  const textColor = theme === 'light' ? 'text-gray-700' : 'text-gray-300';
  const btnBg = theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700';

  return (
    <nav className={`fixed w-full top-0 z-50 ${navBg} backdrop-blur-md border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              TaskMaster
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className={`${textColor}`}>
              Welcome, {user?.name}
            </span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg ${btnBg} transition-colors`}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 rounded-lg transition-opacity"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
