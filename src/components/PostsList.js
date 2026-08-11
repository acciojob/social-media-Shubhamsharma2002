import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PostsList = ({ posts, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (title && content) {
      onAddPost({ id: Date.now().toString(), title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      {/* Test 3 looks for #postTitle input */}
      <form style={{ marginBottom: '20px' }}>
        <h2>Add a New Post</h2>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

      {/* Test 4 expects wrapper .posts-list and target buttons */}
      <div className="posts-list">
        {posts.map((post) => (
          <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
              View Post
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};