import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InsuranceActivity } from '../../types';

export interface InsuranceEngagementState {
  activities: InsuranceActivity[];
  pointsFromInsurance: number;
}

const initialState: InsuranceEngagementState = {
  activities: [
    {
      id: 'ins-1',
      type: 'policy_review',
      title: 'Reviewed Health Policy',
      description: 'Checked coverage and benefits',
      points: 50,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      policyId: 'HP-001'
    },
    {
      id: 'ins-2',
      type: 'premium_payment',
      title: 'Auto-debit Confirmation',
      description: 'Confirmed premium auto-debit setup',
      points: 30,
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      policyId: 'HP-001'
    },
    {
      id: 'ins-3',
      type: 'wellness_check',
      title: 'Annual Wellness Check',
      description: 'Scheduled health check appointement',
      points: 70,
      completedAt: new Date().toISOString(),
    }
  ],
  pointsFromInsurance: 50 + 30 + 70,
};

const insuranceEngagementSlice = createSlice({
  name: 'insuranceEngagement',
  initialState,
  reducers: {
    logInsuranceActivity(state, action: PayloadAction<InsuranceActivity>) {
      state.activities.unshift({ ...action.payload, completedAt: action.payload.completedAt ?? new Date().toISOString() });
      state.pointsFromInsurance += action.payload.points;
    },
    clearInsuranceActivities(state) {
      state.activities = [];
      state.pointsFromInsurance = 0;
    },
  },
});

export const { logInsuranceActivity, clearInsuranceActivities } = insuranceEngagementSlice.actions;
export default insuranceEngagementSlice.reducer; 