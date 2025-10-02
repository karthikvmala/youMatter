import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement } from '../../types';

interface AchievementState {
  achievements: Achievement[];
  unlockedAchievements: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AchievementState = {
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first wellness activity',
      icon: '👶',
      points: 50,
      category: 'wellness',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day activity streak',
      icon: '🔥',
      points: 200,
      category: 'health',
      rarity: 'rare',
      progress: 7,
      maxProgress: 7,
      unlockedAt: '2024-01-22'
    },
    {
      id: '3',
      title: 'Insurance Explorer',
      description: 'Review your first insurance policy',
      icon: '📋',
      points: 100,
      category: 'insurance',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlockedAt: '2024-01-20'
    },
    {
      id: '4',
      title: 'Social Butterfly',
      description: 'Add 5 friends to your network',
      icon: '🦋',
      points: 150,
      category: 'social',
      rarity: 'rare',
      progress: 3,
      maxProgress: 5
    },
    {
      id: '5',
      title: 'Wellness Warrior',
      description: 'Complete 50 wellness activities',
      icon: '⚔️',
      points: 500,
      category: 'wellness',
      rarity: 'epic',
      progress: 45,
      maxProgress: 50
    },
    {
      id: '6',
      title: 'Policy Pro',
      description: 'Complete all insurance-related activities',
      icon: '🏆',
      points: 300,
      category: 'insurance',
      rarity: 'epic',
      progress: 2,
      maxProgress: 5
    }
  ],
  unlockedAchievements: ['1', '2', '3'],
  isLoading: false,
  error: null,
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    unlockAchievement: (state, action: PayloadAction<string>) => {
      const achievementId = action.payload;
      if (!state.unlockedAchievements.includes(achievementId)) {
        state.unlockedAchievements.push(achievementId);
        const achievement = state.achievements.find(a => a.id === achievementId);
        if (achievement) {
          achievement.unlockedAt = new Date().toISOString();
        }
      }
    },
    updateAchievementProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const { id, progress } = action.payload;
      const achievement = state.achievements.find(a => a.id === id);
      if (achievement) {
        achievement.progress = Math.min(progress, achievement.maxProgress);
        
        // Auto-unlock if progress reaches max
        if (achievement.progress >= achievement.maxProgress && !achievement.unlockedAt) {
          achievement.unlockedAt = new Date().toISOString();
          if (!state.unlockedAchievements.includes(id)) {
            state.unlockedAchievements.push(id);
          }
        }
      }
    },
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.push(action.payload);
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
  unlockAchievement,
  updateAchievementProgress,
  addAchievement,
  setLoading,
  setError,
} = achievementSlice.actions;

export default achievementSlice.reducer;
