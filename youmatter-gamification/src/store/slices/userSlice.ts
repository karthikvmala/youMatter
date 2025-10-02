import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStats } from '../../types';

interface UserState {
  currentUser: User | null;
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    level: 5,
    experience: 1250,
    totalPoints: 2500,
    streak: 7,
    joinDate: '2024-01-15',
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en',
      healthGoals: []
    }
  },
  stats: {
    totalActivities: 45,
    totalPoints: 2500,
    currentStreak: 7,
    longestStreak: 12,
    achievementsUnlocked: 8,
    challengesCompleted: 3,
    weeklyProgress: [
      { week: 'Week 1', points: 200, activities: 5, streak: 3 },
      { week: 'Week 2', points: 350, activities: 8, streak: 5 },
      { week: 'Week 3', points: 450, activities: 12, streak: 7 },
      { week: 'Week 4', points: 600, activities: 15, streak: 7 },
    ]
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateUserStats: (state, action: PayloadAction<Partial<UserStats>>) => {
      if (state.stats) {
        state.stats = { ...state.stats, ...action.payload };
      }
    },
    addExperience: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.experience += action.payload;
        state.currentUser.totalPoints += action.payload;
        
        // Level up logic (every 500 experience points)
        const newLevel = Math.floor(state.currentUser.experience / 500) + 1;
        if (newLevel > state.currentUser.level) {
          state.currentUser.level = newLevel;
        }
      }
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.streak = action.payload;
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
  setUser,
  updateUserStats,
  addExperience,
  updateStreak,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
