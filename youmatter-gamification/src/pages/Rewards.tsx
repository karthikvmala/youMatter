import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Rewards: React.FC = () => {
  const { rewards, totalRewardPoints } = useSelector((state: RootState) => state.rewards);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rewards</h2>
        <div className="text-sm text-gray-600">Total Reward Points: <span className="font-semibold text-primary-700">{totalRewardPoints}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{reward.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700">{reward.type}</span>
            </div>
            <p className="text-gray-600 mt-2">{reward.description}</p>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-primary-700 font-semibold">+{reward.points} pts</span>
              {reward.grantedAt && <span className="text-gray-500">{new Date(reward.grantedAt).toLocaleString()}</span>}
            </div>
          </div>
        ))}
        {rewards.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">No rewards yet. Complete activities and challenges to earn rewards!</div>
        )}
      </div>
    </div>
  );
};

export default Rewards; 