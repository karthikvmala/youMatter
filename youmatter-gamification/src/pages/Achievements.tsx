import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Trophy, Star, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Achievements: React.FC = () => {
  const { achievements } = useSelector((state: RootState) => state.achievements);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4 text-gray-400" />;
      case 'rare': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'epic': return <Trophy className="w-4 h-4 text-purple-500" />;
      case 'legendary': return <Crown className="w-4 h-4 text-yellow-500" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 bg-gray-50';
      case 'rare': return 'border-blue-200 bg-blue-50';
      case 'epic': return 'border-purple-200 bg-purple-50';
      case 'legendary': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalPoints = achievements.filter(a => a.unlockedAt).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your progress and unlock rewards</p>
        <div className="mt-4 flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{unlockedCount}</div>
            <div className="text-sm text-gray-600">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{achievements.length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </motion.div>

      {/* Achievement Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card border-2 ${getRarityColor(achievement.rarity)} ${
              achievement.unlockedAt ? 'ring-2 ring-primary-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex items-center space-x-1">
                {getRarityIcon(achievement.rarity)}
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {achievement.rarity}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {achievement.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4">
              {achievement.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    achievement.unlockedAt 
                      ? 'bg-success-500' 
                      : 'bg-primary-500'
                  }`}
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Points and Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-primary-600">
                  +{achievement.points} pts
                </span>
              </div>
              {achievement.unlockedAt ? (
                <div className="flex items-center space-x-1 text-success-600">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">Unlocked!</span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  {achievement.maxProgress - achievement.progress} to go
                </div>
              )}
            </div>

            {/* Unlock Date */}
            {achievement.unlockedAt && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { category: 'health', label: 'Health & Fitness', icon: '🏃', count: 2 },
            { category: 'wellness', label: 'Wellness', icon: '🧘', count: 2 },
            { category: 'insurance', label: 'Insurance', icon: '📋', count: 1 },
            { category: 'social', label: 'Social', icon: '👥', count: 1 }
          ].map((cat) => {
            const categoryAchievements = achievements.filter(a => a.category === cat.category);
            const unlocked = categoryAchievements.filter(a => a.unlockedAt).length;
            return (
              <div key={cat.category} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-medium text-gray-900">{cat.label}</div>
                <div className="text-sm text-gray-600">{unlocked}/{categoryAchievements.length} unlocked</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Achievements;
