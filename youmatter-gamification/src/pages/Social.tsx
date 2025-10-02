import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Users, Trophy, Crown, Star, MessageCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Social: React.FC = () => {
  const { friends } = useSelector((state: RootState) => state.social);
  const { leaderboard } = useSelector((state: RootState) => state.social);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-orange-500" />;
      default: return <Star className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 border-yellow-200';
      case 2: return 'bg-gray-100 border-gray-200';
      case 3: return 'bg-orange-100 border-orange-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social</h1>
        <p className="text-gray-600">Connect with friends and compete on the leaderboard</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Friends List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary-500" />
              Friends ({friends.length})
            </h3>
            <button className="btn-primary text-sm py-1 px-3 flex items-center space-x-1">
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{friend.name}</div>
                    <div className="text-sm text-gray-600">Level {friend.level}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <div className="text-sm text-gray-500">
                    {friend.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-warning-500" />
            Leaderboard
          </h3>
          
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.user.id} 
                className={`flex items-center justify-between p-3 rounded-lg border-2 ${getRankColor(entry.rank)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">{entry.user.name}</div>
                    <div className="text-sm text-gray-600">Level {entry.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{entry.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Social Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="text-4xl mb-3">🏆</div>
          <h4 className="font-semibold text-gray-900 mb-2">Team Challenges</h4>
          <p className="text-sm text-gray-600 mb-4">
            Join team challenges with your friends and earn bonus rewards
          </p>
          <button className="btn-primary w-full">Join Team Challenge</button>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="font-semibold text-gray-900 mb-2">Celebrate Together</h4>
          <p className="text-sm text-gray-600 mb-4">
            Share your achievements and celebrate milestones with friends
          </p>
          <button className="btn-primary w-full">Share Achievement</button>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-3">💬</div>
          <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
          <p className="text-sm text-gray-600 mb-4">
            Join wellness discussions and get tips from the community
          </p>
          <button className="btn-primary w-full">Join Discussion</button>
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { user: 'Sarah Chen', action: 'completed a yoga session', points: 25, time: '2 hours ago' },
            { user: 'Mike Rodriguez', action: 'earned the "Streak Master" achievement', points: 200, time: '4 hours ago' },
            { user: 'Emma Wilson', action: 'joined the "Insurance Awareness Week" challenge', points: 25, time: '6 hours ago' },
            { user: 'Alex Johnson', action: 'completed a meditation session', points: 20, time: '8 hours ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
              <div className="text-sm font-medium text-primary-600">+{activity.points} pts</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Social;
