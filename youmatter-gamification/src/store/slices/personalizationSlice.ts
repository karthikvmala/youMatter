import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MotivationProfile, PersonalizedRecommendation } from '../../types';

export interface PersonalizationState {
  profile: MotivationProfile | null;
  recommendations: PersonalizedRecommendation[];
}

const initialState: PersonalizationState = {
  profile: {
    id: 'mp-default',
    archetype: 'habit_builder',
    preferredRewardType: 'micro',
    activityTimeOfDay: 'morning',
    streakSensitivity: 'high',
  },
  recommendations: [
    {
      id: 'rec-1',
      title: 'Start Healthy Mornings',
      description: 'Begin the Healthy Mornings Starter journey for quick wins.',
      targetRoute: '/journeys',
      score: 0.92,
    },
    {
      id: 'rec-2',
      title: 'Daily Wellness Check',
      description: 'Join the Daily Wellness Check challenge to build momentum.',
      targetRoute: '/challenges',
      score: 0.87,
    },
    {
      id: 'rec-3',
      title: 'Schedule a Wellness Check',
      description: 'Earn insurance points by booking your annual health check.',
      targetRoute: '/insurance',
      score: 0.81,
    }
  ],
};

const personalizationSlice = createSlice({
  name: 'personalization',
  initialState,
  reducers: {
    setMotivationProfile(state, action: PayloadAction<MotivationProfile>) {
      state.profile = action.payload;
    },
    setRecommendations(state, action: PayloadAction<PersonalizedRecommendation[]>) {
      state.recommendations = action.payload;
    },
    addRecommendation(state, action: PayloadAction<PersonalizedRecommendation>) {
      state.recommendations.unshift(action.payload);
    },
    clearRecommendations(state) {
      state.recommendations = [];
    },
  },
});

export const { setMotivationProfile, setRecommendations, addRecommendation, clearRecommendations } = personalizationSlice.actions;
export default personalizationSlice.reducer; 