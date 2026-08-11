import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const UserPage = ({ users, posts }) => {
  const { userId } = useParams();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  // Filter posts created by this user
  const userPosts = posts.filter((post) => post.user === userId);

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};