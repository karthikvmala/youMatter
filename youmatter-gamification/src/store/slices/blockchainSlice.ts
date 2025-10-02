import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RewardToken } from '../../types';

export interface BlockchainState {
  tokens: RewardToken[];
  lastTxHash?: string;
}

const initialState: BlockchainState = {
  tokens: [],
  lastTxHash: undefined,
};

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    mintToken(state, action: PayloadAction<{ title: string; description: string; points: number }>) {
      const txHash = `0x${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
      const token: RewardToken = {
        id: `token-${Date.now()}`,
        title: action.payload.title,
        description: action.payload.description,
        points: action.payload.points,
        mintedAt: new Date().toISOString(),
        txHash,
      };
      state.tokens.unshift(token);
      state.lastTxHash = txHash;
    },
    clearTokens(state) {
      state.tokens = [];
      state.lastTxHash = undefined;
    }
  }
});

export const { mintToken, clearTokens } = blockchainSlice.actions;
export default blockchainSlice.reducer; 