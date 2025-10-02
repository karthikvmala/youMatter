import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned the "Streak Master" badge for maintaining a 7-day streak!',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      actionUrl: '/achievements'
    },
    {
      id: '2',
      type: 'challenge',
      title: 'New Challenge Available',
      message: 'Join the "Insurance Awareness Week" challenge and earn 200 points!',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/challenges'
    },
    {
      id: '3',
      type: 'friend',
      title: 'Friend Activity',
      message: 'Sarah Chen completed a yoga session and earned 25 points!',
      isRead: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      actionUrl: '/social'
    }
  ],
  unreadCount: 2,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
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
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  setLoading,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
