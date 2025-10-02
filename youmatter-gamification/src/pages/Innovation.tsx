import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grantReward } from '../store/slices/rewardsSlice';
import { addRecommendation } from '../store/slices/personalizationSlice';
import { mintToken } from '../store/slices/blockchainSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { addChallenge } from '../store/slices/challengeSlice';
import { RootState } from '../store';

const Innovation: React.FC = () => {
  const dispatch = useDispatch();
  const lastTx = useSelector((s: RootState) => s.blockchain.lastTxHash);
  const tokens = useSelector((s: RootState) => s.blockchain.tokens);

  const runCBTExercise = () => {
    dispatch(grantReward({ id: `cbt-${Date.now()}`, title: 'CBT Reflection', description: 'Completed a guided CBT thought record', points: 25, type: 'wellness' as any }));
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reward', title: 'Great Work!', message: 'You completed a CBT exercise and earned 25 pts.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/rewards' }));
  };

  const sendHabitNudge = () => {
    dispatch(addRecommendation({ id: `nudge-${Date.now()}`, title: '2-min Reset', description: 'Take a 2-minute breathing break now', targetRoute: '/activities', score: 0.8 }));
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reminder', title: 'Habit Nudge', message: 'Quick breathing break suggested for you.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/personalization' }));
  };

  const generatePredictiveChallenge = () => {
    const id = `pc-${Date.now()}`;
    dispatch(addChallenge({
      id,
      title: 'Evening Walk (Predicted)',
      description: 'A 10-minute walk suggested based on your pattern.',
      type: 'daily',
      category: 'health',
      points: 40,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      participants: 1,
      isActive: true,
      progress: 0,
      maxProgress: 1,
      requirements: [{ id: 'r1', description: 'Walk 10 minutes', target: 1, current: 0, unit: 'session' }]
    }));
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'challenge', title: 'Predictive Challenge Added', message: 'An evening walk challenge has been added for you.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/challenges' }));
  };

  const connectWearable = () => {
    dispatch(grantReward({ id: `iot-${Date.now()}`, title: 'Device Connected', description: 'Synced wearable data successfully', points: 15, type: 'micro' }));
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reward', title: 'IoT Connected', message: 'Wearable connected. Data syncing started.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/activities' }));
  };

  const mintBlockchainToken = () => {
    dispatch(mintToken({ title: 'Milestone Token', description: 'Tokenized 500 pts milestone', points: 500 }));
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reward', title: 'Token Minted', message: 'Your milestone was tokenized on-chain.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/innovation' }));
  };

  const simulateARGuidance = () => {
    dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reminder', title: 'AR Session', message: 'AR posture guidance session started (simulated).', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/activities' }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Innovation Lab</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">Behavioral Psychology</h3>
          <div className="mt-3 space-x-3">
            <button onClick={runCBTExercise} className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Run CBT Exercise</button>
            <button onClick={sendHabitNudge} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Send Habit Nudge</button>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">Emerging Tech</h3>
          <div className="mt-3 space-x-3">
            <button onClick={generatePredictiveChallenge} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Predictive Challenge</button>
            <button onClick={connectWearable} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Connect Wearable (IoT)</button>
            <button onClick={mintBlockchainToken} className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Mint Reward Token</button>
          </div>
          {lastTx && <div className="text-sm text-gray-600 mt-2">Last tx: {lastTx}</div>}
          <div className="mt-3 text-sm text-gray-600">Tokens minted: {tokens.length}</div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-gray-800">AR Exercise Guidance</h3>
          <div className="mt-3 space-x-3">
            <button onClick={simulateARGuidance} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Start AR Guidance (Simulated)</button>
          </div>
          <div className="text-gray-500 mt-2">Placeholder: In a mobile app, this would open an AR overlay for posture guidance.</div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-gray-800">Social Impact</h3>
          <div className="mt-3 space-x-3">
            <button onClick={() => dispatch(addNotification({ id: `n-${Date.now()}`, type: 'challenge', title: 'Community Challenge', message: 'You launched a community health challenge.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/challenges' }))} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Start Community Health Challenge</button>
            <button onClick={() => dispatch(addNotification({ id: `n-${Date.now()}`, type: 'challenge', title: 'Corporate Wellness League', message: 'Corporate league invite sent to your team.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/social' }))} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Corporate Wellness League</button>
            <button onClick={() => dispatch(addNotification({ id: `n-${Date.now()}`, type: 'reminder', title: 'Provider Program', message: 'Provider-prescribed program enrolled.', isRead: false, createdAt: new Date().toISOString(), actionUrl: '/journeys' }))} className="px-3 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Provider-prescribed Program</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation; 