'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

const TaskForm = ({ onTaskAdded }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Task added successfully!');
      setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
      onTaskAdded(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `mt-1 block w-full px-3 py-2 border rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
    theme === 'light'
      ? 'bg-white border-gray-300 text-gray-800'
      : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 p-6 rounded-xl shadow-xl backdrop-blur-md transition-colors duration-300 ${
        theme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'
      }`}
    >
      <div>
        <label
          className={`block text-sm font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          }`}
        >
          Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={inputClasses}
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label
          className={`block text-sm font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          }`}
        >
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="3"
          placeholder="Enter task description"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          className={`block text-sm font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          }`}
        >
          Due Date
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div>
        <label
          className={`block text-sm font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          }`}
        >
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className={inputClasses}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-lg transition-opacity"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
