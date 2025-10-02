import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../../types';

export interface RewardsState {
  rewards: Reward[];
  totalRewardPoints: number;
}

const initialState: RewardsState = {
  rewards: [],
  totalRewardPoints: 0,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    grantReward(state, action: PayloadAction<Reward>) {
      state.rewards.unshift({ ...action.payload, grantedAt: action.payload.grantedAt ?? new Date().toISOString() });
      state.totalRewardPoints += action.payload.points;
    },
    clearRewards(state) {
      state.rewards = [];
      state.totalRewardPoints = 0;
    },
  },
});

export const { grantReward, clearRewards } = rewardsSlice.actions;
export default rewardsSlice.reducer; 