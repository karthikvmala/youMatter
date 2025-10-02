import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Friend, LeaderboardEntry } from '../../types';

interface SocialState {
  friends: Friend[];
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SocialState = {
  friends: [
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      level: 7,
      isOnline: true,
      lastActive: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 4,
      isOnline: false,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      level: 6,
      isOnline: true,
      lastActive: new Date().toISOString()
    }
  ],
  leaderboard: [
    {
      rank: 1,
      user: {
        id: '5',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        level: 8,
        experience: 2000,
        totalPoints: 4000,
        streak: 15,
        joinDate: '2024-01-01',
        preferences: { notifications: true, theme: 'light', language: 'en', healthGoals: [] }
      },
      points: 4000,
      level: 8
    },
    {
      rank: 2,
      user: {
        id: '6',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        level: 7,
        experience: 1750,
        totalPoints: 3500,
        streak: 12,
        joinDate: '2024-01-05',
        preferences: { notifications: true, theme: 'light', language: 'en', healthGoals: [] }
      },
      points: 3500,
      level: 7
    },
    {
      rank: 3,
      user: {
        id: '7',
        name: 'Mike Rodriguez',
        email: 'mike@example.com',
        level: 6,
        experience: 1500,
        totalPoints: 3000,
        streak: 8,
        joinDate: '2024-01-10',
        preferences: { notifications: true, theme: 'light', language: 'en', healthGoals: [] }
      },
      points: 3000,
      level: 6
    }
  ],
  isLoading: false,
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    },
    updateLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.leaderboard = action.payload;
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
  addFriend,
  removeFriend,
  updateLeaderboard,
  setLoading,
  setError,
} = socialSlice.actions;

export default socialSlice.reducer;
