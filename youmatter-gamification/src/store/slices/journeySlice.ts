import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Journey } from '../../types';

export interface JourneyState {
  journeys: Journey[];
}

const initialState: JourneyState = {
  journeys: [
    {
      id: 'journey-healthy-mornings',
      title: 'Healthy Mornings Starter',
      category: 'health',
      description: 'Build a refreshing morning routine for energy and focus.',
      currentStageIndex: 0,
      stages: [
        { id: 'jm-1', title: 'Hydrate', description: 'Drink 2 glasses of water after waking up', completed: false, points: 10 },
        { id: 'jm-2', title: 'Stretch', description: '5-minute stretch or yoga flow', completed: false, points: 15 },
        { id: 'jm-3', title: 'Mindful Minute', description: '1-minute mindful breathing before screens', completed: false, points: 20 }
      ]
    },
    {
      id: 'journey-sleep-reset',
      title: '7-Day Sleep Reset',
      category: 'wellness',
      description: 'Improve sleep quality with small daily habits.',
      currentStageIndex: 0,
      stages: [
        { id: 'js-1', title: 'Caffeine Cutoff', description: 'No caffeine after 2pm', completed: false, points: 15 },
        { id: 'js-2', title: 'Wind-down', description: '10-minute wind-down routine', completed: false, points: 20 },
        { id: 'js-3', title: 'Screen Curfew', description: 'No screens 30 minutes before bed', completed: false, points: 25 },
        { id: 'js-4', title: 'Consistent Bedtime', description: 'Sleep within a 30-minute window', completed: false, points: 30 }
      ]
    }
  ],
};

const journeySlice = createSlice({
  name: 'journeys',
  initialState,
  reducers: {
    addJourney(state, action: PayloadAction<Journey>) {
      state.journeys.push(action.payload);
    },
    completeStage(state, action: PayloadAction<{ journeyId: string; stageId: string }>) {
      const { journeyId, stageId } = action.payload;
      const journey = state.journeys.find(j => j.id === journeyId);
      if (!journey) return;
      const stageIndex = journey.stages.findIndex(s => s.id === stageId);
      if (stageIndex !== -1) {
        journey.stages[stageIndex].completed = true;
        if (stageIndex >= journey.currentStageIndex) {
          journey.currentStageIndex = Math.min(stageIndex + 1, journey.stages.length - 1);
        }
      }
    },
  },
});

export const { addJourney, completeStage } = journeySlice.actions;
export default journeySlice.reducer; 