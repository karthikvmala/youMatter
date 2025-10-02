import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const InsuranceEngagement: React.FC = () => {
  const { activities, pointsFromInsurance } = useSelector((state: RootState) => state.insuranceEngagement);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Insurance Engagement</h2>
        <div className="text-sm text-gray-600">Points Earned: <span className="font-semibold text-primary-700">{pointsFromInsurance}</span></div>
      </div>

      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{activity.title}</div>
                <div className="text-sm text-gray-600">{activity.description}</div>
              </div>
              <div className="text-sm text-right">
                <div className="text-primary-700 font-semibold">+{activity.points} pts</div>
                {activity.completedAt && <div className="text-gray-500">{new Date(activity.completedAt).toLocaleString()}</div>}
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center text-gray-500 py-12">Complete policy reviews, claims, and wellness checks to earn points.</div>
        )}
      </div>
    </div>
  );
};

export default InsuranceEngagement; 