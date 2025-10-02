import { AppDispatch, RootState } from '../';
import { grantReward } from './rewardsSlice';

// Subscribes to activity additions and generates micro-rewards
export function registerGamificationEngine(store: { dispatch: AppDispatch; getState: () => RootState }) {
  let lastActivitiesCount = store.getState().activities.activities.length;

  return store.dispatch((dispatch, getState) => {
    // initial micro-check
    maybeGrantLoginStreak(dispatch, getState);

    // Polling-based simple engine for MVP
    setInterval(() => {
      const state = getState();
      const count = state.activities.activities.length;
      if (count > lastActivitiesCount) {
        const diff = count - lastActivitiesCount;
        lastActivitiesCount = count;
        dispatch(grantReward({
          id: `micro-${Date.now()}`,
          title: 'Consistent Engagement',
          description: `Logged ${diff} new activit${diff > 1 ? 'ies' : 'y'}`,
          points: 10 * diff,
          type: 'micro',
        }));
      }

      maybeGrantLoginStreak(dispatch, getState);
    }, 5000);
  });
}

function maybeGrantLoginStreak(dispatch: AppDispatch, getState: () => RootState) {
  const user = getState().user.currentUser;
  if (!user) return;
  if (user.streak && user.streak % 7 === 0) {
    dispatch(grantReward({
      id: `streak-${user.streak}-${new Date().toISOString()}`,
      title: 'Streak Milestone',
      description: `Congrats on a ${user.streak}-day streak!`,
      points: 50,
      type: 'streak',
    }));
  }
} 