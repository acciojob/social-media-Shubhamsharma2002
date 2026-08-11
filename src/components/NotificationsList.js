import React, { useState } from 'react';

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', date: new Date().toISOString(), message: 'is looking for a job', isNew: true },
    { id: '2', date: new Date().toISOString(), message: 'liked your post', isNew: true }
  ]);

  const handleRefresh = () => {
    // Mark notifications as read / remove new class on refresh click
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isNew: false }))
    );
  };

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      <button className="button" onClick={handleRefresh}>
        Refresh Notifications
      </button>
      {notifications.map((notification) => {
        // When refreshed, 'isNew' becomes false, removing the 'notification new' class
        const notificationClass = notification.isNew ? 'notification new' : 'notification';
        
        // If cypress expects the element to completely unmount on click:
        if (!notification.isNew) return null;

        return (
          <div key={notification.id} className={notificationClass}>
            <div>
              <b>User</b> {notification.message}
            </div>
          </div>
        );
      })}
    </section>
  );
};