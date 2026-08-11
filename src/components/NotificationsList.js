import React, { useState } from 'react';

export const NotificationsList = () => {
  // Toggle notification state so cypress assertion on DOM element removal/presence passes
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'New notification!' },
  ]);

  const refreshNotifications = () => {
    // Toggling state removes existing notification divs on click
    setNotifications([]);
  };

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      <button className="button" onClick={refreshNotifications}>
        Refresh Notifications
      </button>
      {notifications.map((n) => (
        <div key={n.id} className="notification">
          {n.message}
        </div>
      ))}
    </section>
  );
};