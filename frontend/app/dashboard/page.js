'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import DashboardNav from '@/components/DashboardNav';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTheme } from 'next-themes';

const Dashboard = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  // Dynamic container colors
  const containerBg = theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-gray-800';
  const loadingText = theme === 'light' ? 'text-gray-600' : 'text-gray-300';

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gradient-to-br ${containerBg} transition-colors duration-300`}>
        <DashboardNav user={user} />

        <main className="max-w-7xl mx-auto pt-20 pb-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <TaskForm onTaskAdded={handleTaskAdded} />
              </div>
              <div className="md:col-span-2">
                {loading ? (
                  <div className={`text-center py-8 ${loadingText}`}>Loading tasks...</div>
                ) : (
                  <TaskList
                    tasks={tasks}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
