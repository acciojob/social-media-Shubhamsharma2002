import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PostsList = ({ posts, onAddPost, users }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const handleSave = () => {
    if (title && content) {
      onAddPost({
        id: Date.now().toString(),
        title,
        content,
        user: userId,
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      });
      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form style={{ marginBottom: '20px' }}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="button" onClick={handleSave}>
          Save Post
        </button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content}</p>

            <div style={{ marginTop: '8px' }}>
              <button className="reaction-button">👍 0</button>
              <button className="reaction-button">🎉 0</button>
              <button className="reaction-button">❤️ 0</button>
              <button className="reaction-button">🚀 0</button>
              <button className="reaction-button">👀 0</button>
            </div>

            <Link to={`/posts/${post.id}`} className="button muted-button" style={{ marginTop: '10px', display: 'inline-block' }}>
              View Post
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};