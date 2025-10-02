import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { completeStage } from '../store/slices/journeySlice';

const Journeys: React.FC = () => {
  const dispatch = useDispatch();
  const { journeys } = useSelector((state: RootState) => state.journeys);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wellness Journeys</h2>
      <div className="space-y-6">
        {journeys.map(journey => (
          <div key={journey.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{journey.title}</h3>
                <p className="text-sm text-gray-600">{journey.description}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700">{journey.category}</span>
            </div>
            <div className="mt-4">
              <ul className="space-y-2">
                {journey.stages.map((stage, index) => (
                  <li key={stage.id} className="flex items-center justify-between p-3 rounded border">
                    <div>
                      <div className="font-medium text-gray-800">{index + 1}. {stage.title}</div>
                      <div className="text-sm text-gray-600">{stage.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-primary-700 font-semibold">{stage.points} pts</span>
                      <button
                        disabled={stage.completed}
                        onClick={() => dispatch(completeStage({ journeyId: journey.id, stageId: stage.id }))}
                        className={`px-3 py-1 text-sm rounded ${stage.completed ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                      >
                        {stage.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {journeys.length === 0 && (
          <div className="text-center text-gray-500 py-12">No journeys yet. Personalized journeys will appear here based on your goals.</div>
        )}
      </div>
    </div>
  );
};

export default Journeys; 