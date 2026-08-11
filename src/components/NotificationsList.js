import React from 'react';

export const NotificationsList = () => {
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      <button className="button" style={{ marginBottom: '15px' }}>
        Refresh Notifications
      </button>
      <div>
        <p>No new notifications</p>
      </div>
    </section>
  );
};