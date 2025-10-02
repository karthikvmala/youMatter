import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addExperience, updateStreak } from '../store/slices/userSlice';
import { addActivity } from '../store/slices/activitySlice';
import { updateAchievementProgress } from '../store/slices/achievementSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, stats } = useSelector((state: RootState) => state.user);
  const { achievements } = useSelector((state: RootState) => state.achievements);
  const { challenges } = useSelector((state: RootState) => state.challenges);
  const { recentActivities } = useSelector((state: RootState) => state.activities);
  const { leaderboard } = useSelector((state: RootState) => state.social);

  const handleQuickAction = (action: string) => {
    const points = Math.floor(Math.random() * 50) + 10;
    dispatch(addExperience(points));
    
    // Add activity
    dispatch(addActivity({
      id: Date.now().toString(),
      title: action,
      description: `Quick ${action.toLowerCase()} activity`,
      category: 'wellness',
      points,
      duration: 5
    }));

    // Update achievement progress
    dispatch(updateAchievementProgress({ id: '5', progress: 46 }));

    // Add notification
    dispatch(addNotification({
      id: Date.now().toString(),
      type: 'reward',
      title: 'Points Earned!',
      message: `You earned ${points} points for ${action.toLowerCase()}!`,
      isRead: false,
      createdAt: new Date().toISOString()
    }));
  };

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const activeChallenges = challenges.filter(c => c.isActive);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-bg rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
            <p className="text-blue-100 mb-4">Ready to continue your wellness journey?</p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser?.level}</div>
                <div className="text-sm text-blue-100">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser?.totalPoints}</div>
                <div className="text-sm text-blue-100">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser?.streak}</div>
                <div className="text-sm text-blue-100">Day Streak</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { name: 'Log Water', icon: '💧', action: 'Water Intake' },
          { name: 'Exercise', icon: '🏃', action: 'Quick Workout' },
          { name: 'Meditate', icon: '🧘', action: 'Mindfulness' },
          { name: 'Sleep Log', icon: '😴', action: 'Sleep Tracking' }
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(item.action)}
            className="card hover:shadow-xl transition-all duration-200 hover:scale-105 text-center p-4"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-medium text-gray-700">{item.name}</div>
          </button>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Friends</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-warning-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {unlockedAchievements.slice(0, 3).map((achievement) => (
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

        {/* Active Challenges */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary-500" />
            Active Challenges
          </h3>
          <div className="space-y-3">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{challenge.title}</div>
                  <div className="text-sm text-primary-600">+{challenge.points} pts</div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{challenge.description}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {challenge.progress}/{challenge.maxProgress} completed
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-secondary-500" />
          Leaderboard
        </h3>
        <div className="space-y-3">
          {leaderboard.slice(0, 5).map((entry, index) => (
            <div key={entry.user.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-primary-600">#{entry.rank}</span>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{entry.user.name}</div>
                <div className="text-sm text-gray-600">Level {entry.level}</div>
              </div>
              <div className="text-sm font-medium text-gray-900">{entry.points} pts</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
