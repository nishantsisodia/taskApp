'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

const TaskList = ({ tasks: allTasks, onTaskUpdated, onTaskDeleted }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  // Filter and sort tasks
  const filteredTasks = allTasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskUpdated(response.data);
      toast.success('Task status updated!');
    } catch {
      toast.error('Failed to update task status');


    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTaskDeleted(taskId);
      toast.success('Task deleted successfully!');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const getStatusColor = (status) => {
    if (status === 'completed') return theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-300';
    if (status === 'in-progress') return theme === 'light' ? 'bg-yellow-100 text-yellow-800' : 'bg-yellow-900 text-yellow-300';
    return theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-gray-300';
  };

const containerClasses = `rounded-xl shadow-xl p-4 space-y-4 transition-colors duration-300 ${
  theme === 'light'
    ? 'bg-white/80 text-gray-800'  // light bg → dark text
    : 'bg-gray-800/80 text-white'  // dark bg → white text
}`;
  const inputClasses = `w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${
    theme === 'light' ? 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
  }`;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className={containerClasses}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={inputClasses}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={inputClasses}
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Items */}
      <div className="space-y-4 overflow-y-auto max-h-[65vh]">
        {filteredTasks.map(task => (
          <div key={task._id} className={`${containerClasses} p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={theme === 'light' ? 'text-lg font-medium text-gray-800' : 'text-lg font-medium text-white'}>
                  {task.title}
                </h3>
                <p className={theme === 'light' ? 'text-gray-500 mt-1' : 'text-gray-400 mt-1'}>
                  {task.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>

            {task.dueDate && (
              <div className={theme === 'light' ? 'text-sm text-gray-500' : 'text-sm text-gray-400'}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}

            <div className="flex space-x-4 mt-4">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className={inputClasses}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 rounded-lg transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className={`${containerClasses} text-center py-8`}>
            {searchQuery || statusFilter !== 'all'
              ? 'No tasks match your search criteria'
              : 'No tasks found. Add your first task!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
