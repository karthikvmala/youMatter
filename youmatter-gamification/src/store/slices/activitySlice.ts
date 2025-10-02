import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../types';

interface ActivityState {
  activities: Activity[];
  recentActivities: Activity[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [
    {
      id: '1',
      title: 'Morning Yoga',
      description: '15-minute yoga session',
      category: 'exercise',
      points: 25,
      duration: 15,
      completedAt: new Date().toISOString(),
      metadata: { type: 'yoga', intensity: 'low' }
    },
    {
      id: '2',
      title: 'Policy Review',
      description: 'Reviewed health insurance policy',
      category: 'insurance',
      points: 50,
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      metadata: { policyType: 'health', duration: 10 }
    },
    {
      id: '3',
      title: 'Meditation',
      description: '10-minute mindfulness session',
      category: 'mental',
      points: 20,
      duration: 10,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { type: 'mindfulness', mood: 'calm' }
    }
  ],
  recentActivities: [],
  isLoading: false,
  error: null,
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      const activity = { ...action.payload, completedAt: new Date().toISOString() };
      state.activities.unshift(activity);
      state.recentActivities.unshift(activity);
      
      // Keep only last 10 recent activities
      if (state.recentActivities.length > 10) {
        state.recentActivities = state.recentActivities.slice(0, 10);
      }
    },
    completeActivity: (state, action: PayloadAction<string>) => {
      const activityId = action.payload;
      const activity = state.activities.find(a => a.id === activityId);
      if (activity && !activity.completedAt) {
        activity.completedAt = new Date().toISOString();
      }
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
  addActivity,
  completeActivity,
  setLoading,
  setError,
} = activitySlice.actions;

export default activitySlice.reducer;
