import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Card: React.FC<{ title: string; value: string; sub?: string }> = ({ title, value, sub }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold text-gray-800 mt-1">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
  </div>
);

const Metrics: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const activityPoints = useSelector((s: RootState) => s.activities.activities.reduce((sum, a) => sum + (a.points || 0), 0));
  const rewardsPoints = useSelector((s: RootState) => s.rewards.totalRewardPoints || 0);
  const totalPoints = activityPoints + rewardsPoints;
  const achievementsCount = useSelector((s: RootState) => s.achievements.achievements.length);
  const challengesActive = useSelector((s: RootState) => s.challenges.challenges.filter(c => c.isActive).length);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Metrics Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="DAU (simulated)" value={String(Math.max(1, Math.round((user?.level || 1) * 12)))} sub="Active users today" />
        <Card title="Total Points" value={String(totalPoints)} sub="Across activities and rewards" />
        <Card title="Achievements" value={String(achievementsCount)} sub="Unlocked" />
        <Card title="Active Challenges" value={String(challengesActive)} />
      </div>
    </div>
  );
};

export default Metrics; 