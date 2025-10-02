import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { markAllAsRead, markAsRead, removeNotification } from '../store/slices/notificationSlice';

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((s: RootState) => s.notifications);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Unread: <span className="font-semibold text-primary-700">{unreadCount}</span></span>
          <button onClick={() => dispatch(markAllAsRead())} className="px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Mark all as read</button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`border rounded p-4 bg-white shadow-sm ${n.isRead ? '' : 'border-primary-300'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm uppercase tracking-wide text-gray-500">{n.type}</div>
                <div className="text-lg font-semibold text-gray-800">{n.title}</div>
                <div className="text-gray-700 mt-1">{n.message}</div>
                <div className="text-xs text-gray-500 mt-2">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                {!n.isRead && (
                  <button onClick={() => dispatch(markAsRead(n.id))} className="px-2 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700">Mark read</button>
                )}
                <a href={n.actionUrl || '#'} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded hover:bg-primary-100">Open</a>
                <button onClick={() => dispatch(removeNotification(n.id))} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Dismiss</button>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-12">You're all caught up.</div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 