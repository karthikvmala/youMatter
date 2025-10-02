import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addActivity } from '../store/slices/activitySlice';
import { addExperience } from '../store/slices/userSlice';
import { Activity, Plus, Clock, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Activities: React.FC = () => {
  const dispatch = useDispatch();
  const { activities, recentActivities } = useSelector((state: RootState) => state.activities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    category: 'wellness' as const,
    duration: 0
  });

  const handleAddActivity = () => {
    if (newActivity.title.trim()) {
      const points = Math.floor(Math.random() * 50) + 10;
      dispatch(addActivity({
        id: Date.now().toString(),
        title: newActivity.title,
        description: newActivity.description,
        category: newActivity.category,
        points,
        duration: newActivity.duration
      }));
      dispatch(addExperience(points));
      
      setNewActivity({ title: '', description: '', category: 'wellness', duration: 0 });
      setShowAddForm(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exercise': return '🏃';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘';
      case 'insurance': return '📋';
      case 'social': return '👥';
      default: return '💪';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exercise': return 'bg-red-100 text-red-800';
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'mental': return 'bg-purple-100 text-purple-800';
      case 'insurance': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    { value: 'exercise', label: 'Exercise', icon: '🏃' },
    { value: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { value: 'mental', label: 'Mental Health', icon: '🧘' },
    { value: 'insurance', label: 'Insurance', icon: '📋' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'wellness', label: 'Wellness', icon: '💪' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activities</h1>
          <p className="text-gray-600">Track your wellness activities and earn points</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Activity</span>
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <Award className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.reduce((sum, a) => sum + a.points, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => {
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return a.completedAt && new Date(a.completedAt) > weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add Activity Form */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Activity</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Title
              </label>
              <input
                type="text"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Morning Yoga"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Describe your activity..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newActivity.duration}
                  onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddActivity}
                className="btn-primary"
              >
                Add Activity
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activities */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {activities.slice(0, 10).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getCategoryIcon(activity.category)}</div>
                <div>
                  <div className="font-medium text-gray-900">{activity.title}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                    {activity.duration && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{activity.duration}min</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-primary-600">+{activity.points}</div>
                <div className="text-xs text-gray-500">
                  {activity.completedAt && new Date(activity.completedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Activities;
