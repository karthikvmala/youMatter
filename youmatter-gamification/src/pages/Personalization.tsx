import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Personalization: React.FC = () => {
  const { profile, recommendations } = useSelector((state: RootState) => state.personalization);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalization</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Motivation Profile</h3>
          {profile ? (
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <div><span className="text-gray-500">Archetype:</span> {profile.archetype}</div>
              <div><span className="text-gray-500">Preferred Reward:</span> {profile.preferredRewardType}</div>
              <div><span className="text-gray-500">Active Time:</span> {profile.activityTimeOfDay}</div>
              <div><span className="text-gray-500">Streak Sensitivity:</span> {profile.streakSensitivity}</div>
            </div>
          ) : (
            <div className="text-gray-500 mt-2">No profile yet. Use the app and we’ll adapt to motivate you.</div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Recommendations</h3>
          <div className="mt-3 space-y-3">
            {recommendations.map(r => (
              <div key={r.id} className="p-3 border rounded flex items-start justify-between">
                <div>
                  <div className="font-medium text-gray-800">{r.title}</div>
                  <div className="text-sm text-gray-600">{r.description}</div>
                </div>
                <div className="text-sm text-right">
                  <div className="text-gray-500">Score: {(r.score * 100).toFixed(0)}%</div>
                  <a className="text-primary-700 hover:underline" href={r.targetRoute}>Go</a>
                </div>
              </div>
            ))}
            {recommendations.length === 0 && (
              <div className="text-center text-gray-500 py-12">No recommendations yet. Keep engaging to get personalized tips.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization; 