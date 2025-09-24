'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

const RegisterForm = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(

         `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/register`,
        formData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Registration successful!');
      router.replace('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
        className={`fixed w-full top-0 z-50 backdrop-blur-md border-b ${
          theme === 'light'
            ? 'bg-white/80 border-gray-200'
            : 'bg-gray-900/80 border-gray-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                TaskMaster
              </span>
            </Link>

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
          </div>
        </div>
      </nav>

      {/* REGISTER CARD */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div
            className={`backdrop-blur-md rounded-2xl shadow-xl p-8 transition-colors ${
              theme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Create Account
              </h2>
              <p
                className={`mt-2 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Join us to manage your tasks effectively
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-800'
                      : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-800'
                      : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
                    theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-800'
                      : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  }`}
                  placeholder="Create a password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-lg transition-opacity"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p
                className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Already have an account?{' '}
                <Link
                  href="/login"
                  className={`font-medium ${
                    theme === 'light'
                      ? 'text-purple-600 hover:text-purple-500'
                      : 'text-purple-400 hover:text-purple-300'
                  }`}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
