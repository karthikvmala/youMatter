import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User, Settings, Award, TrendingUp, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { currentUser, stats } = useSelector((state: RootState) => state.user);
  const { achievements } = useSelector((state: RootState) => state.achievements);

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const totalPoints = achievements.filter(a => a.unlockedAt).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentUser?.name}</h1>
            <p className="text-gray-600 mb-4">{currentUser?.email}</p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">Level {currentUser?.level}</div>
                <div className="text-sm text-gray-500">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{currentUser?.totalPoints}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{currentUser?.streak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <Award className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.achievementsUnlocked}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="w-6 h-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Challenges</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.challengesCompleted}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentUser?.joinDate && new Date(currentUser.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <div className="space-y-4">
            {stats?.weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{week.week}</div>
                  <div className="text-sm text-gray-600">{week.activities} activities</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">{week.points} pts</div>
                  <div className="text-sm text-gray-500">{week.streak} day streak</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {unlockedAchievements.slice(0, 5).map((achievement) => (
              <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
                <div className="text-sm font-medium text-primary-600">+{achievement.points}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wellness Goals */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Daily Exercise', progress: 75, target: 30, unit: 'minutes', icon: '🏃' },
            { title: 'Water Intake', progress: 6, target: 8, unit: 'glasses', icon: '💧' },
            { title: 'Sleep Hours', progress: 7, target: 8, unit: 'hours', icon: '😴' },
            { title: 'Meditation', progress: 10, target: 15, unit: 'minutes', icon: '🧘' },
            { title: 'Steps', progress: 8500, target: 10000, unit: 'steps', icon: '👟' },
            { title: 'Policy Reviews', progress: 2, target: 5, unit: 'reviews', icon: '📋' }
          ].map((goal, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{goal.icon}</span>
                  <span className="font-medium text-gray-900">{goal.title}</span>
                </div>
                <span className="text-sm text-gray-600">{goal.progress}/{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">{goal.unit}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Insurance Integration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Policy Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Health Insurance</span>
                <span className="text-sm font-medium text-success-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Life Insurance</span>
                <span className="text-sm font-medium text-success-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Premium Due</span>
                <span className="text-sm font-medium text-gray-900">Dec 15, 2024</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Wellness Rewards</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Annual Checkup</span>
                <span className="text-sm font-medium text-success-600">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fitness Tracker</span>
                <span className="text-sm font-medium text-success-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Wellness Points</span>
                <span className="text-sm font-medium text-primary-600">2,500</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
