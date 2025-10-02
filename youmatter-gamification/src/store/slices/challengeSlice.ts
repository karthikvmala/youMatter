import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Challenge } from '../../types';

interface ChallengeState {
  challenges: Challenge[];
  activeChallenges: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChallengeState = {
  challenges: [
    {
      id: '1',
      title: 'Daily Wellness Check',
      description: 'Complete your daily wellness routine',
      type: 'daily',
      category: 'wellness',
      points: 50,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      participants: 1250,
      isActive: true,
      progress: 3,
      maxProgress: 5,
      requirements: [
        { id: '1', description: 'Log water intake', target: 8, current: 6, unit: 'glasses' },
        { id: '2', description: 'Complete 30min exercise', target: 1, current: 1, unit: 'session' },
        { id: '3', description: 'Meditate for 10min', target: 1, current: 0, unit: 'session' }
      ]
    },
    {
      id: '2',
      title: 'Insurance Awareness Week',
      description: 'Learn about your insurance benefits',
      type: 'weekly',
      category: 'insurance',
      points: 200,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      participants: 850,
      isActive: true,
      progress: 1,
      maxProgress: 3,
      requirements: [
        { id: '1', description: 'Review policy documents', target: 1, current: 1, unit: 'policy' },
        { id: '2', description: 'Check claim status', target: 1, current: 0, unit: 'check' },
        { id: '3', description: 'Update beneficiary info', target: 1, current: 0, unit: 'update' }
      ]
    }
  ],
  activeChallenges: ['1', '2'],
  isLoading: false,
  error: null,
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    joinChallenge: (state, action: PayloadAction<string>) => {
      const challengeId = action.payload;
      if (!state.activeChallenges.includes(challengeId)) {
        state.activeChallenges.push(challengeId);
        const challenge = state.challenges.find(c => c.id === challengeId);
        if (challenge) {
          challenge.participants += 1;
        }
      }
    },
    updateChallengeProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const { id, progress } = action.payload;
      const challenge = state.challenges.find(c => c.id === id);
      if (challenge) {
        challenge.progress = Math.min(progress, challenge.maxProgress);
      }
    },
    completeChallenge: (state, action: PayloadAction<string>) => {
      const challengeId = action.payload;
      const challenge = state.challenges.find(c => c.id === challengeId);
      if (challenge) {
        challenge.progress = challenge.maxProgress;
        challenge.isActive = false;
      }
    },
    addChallenge: (state, action: PayloadAction<Challenge>) => {
      state.challenges.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  joinChallenge,
  updateChallengeProgress,
  completeChallenge,
  addChallenge,
  setLoading,
  setError,
} = challengeSlice.actions;

export default challengeSlice.reducer;
