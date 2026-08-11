import React from 'react';
import { Link } from 'react-router-dom';

export const UsersList = ({ users }) => {
  return (
    <section className="users-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};