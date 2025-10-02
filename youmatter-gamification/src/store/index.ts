import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import achievementSlice from './slices/achievementSlice';
import challengeSlice from './slices/challengeSlice';
import activitySlice from './slices/activitySlice';
import socialSlice from './slices/socialSlice';
import notificationSlice from './slices/notificationSlice';
import rewardsSlice from './slices/rewardsSlice';
import journeySlice from './slices/journeySlice';
import insuranceEngagementSlice from './slices/insuranceEngagementSlice';
import personalizationSlice from './slices/personalizationSlice';
import blockchainSlice from './slices/blockchainSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    achievements: achievementSlice,
    challenges: challengeSlice,
    activities: activitySlice,
    social: socialSlice,
    notifications: notificationSlice,
    rewards: rewardsSlice,
    journeys: journeySlice,
    insuranceEngagement: insuranceEngagementSlice,
    personalization: personalizationSlice,
    blockchain: blockchainSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
