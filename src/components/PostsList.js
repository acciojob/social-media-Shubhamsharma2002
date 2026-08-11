import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PostsList = ({ posts, onAddPost, users }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  // Reactions state stored per post
  const [reactions, setReactions] = useState(
    posts.reduce((acc, post) => {
      acc[post.id] = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 };
      return acc;
    }, {})
  );

  const handleSave = () => {
    if (title && content) {
      const newId = Date.now().toString();
      onAddPost({
        id: newId,
        title,
        content,
        user: userId,
      });
      setReactions((prev) => ({
        ...prev,
        [newId]: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      }));
      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  const handleReaction = (postId, type) => {
    setReactions((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }),
        [type]: ((prev[postId] && prev[postId][type]) || 0) + 1,
      },
    }));
  };

  const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  };

  return (
    <section className="posts-list-container">
      <h2>Add a New Post</h2>
      <form>
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
        {posts.map((post) => {
          const author = users.find((u) => u.id === post.user);
          const postReactions = reactions[post.id] || {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };

          return (
            <article className="post-excerpt" key={post.id}>
              {/* 1st Child: Title */}
              <h3>{post.title}</h3>

              {/* 2nd Child: Author metadata */}
              <p className="post-author">
                by {author ? author.name : 'Unknown author'}
              </p>

              {/* 3rd Child: Content */}
              <p className="post-content">{post.content}</p>

              {/* 4th Child: Reaction Buttons (Matches .posts-list > :nth-child(2) > :nth-child(4) > :nth-child(1)) */}
              <div>
                {Object.entries(reactionEmoji).map(([name, emoji]) => (
                  <button
                    key={name}
                    type="button"
                    className="reaction-button"
                    onClick={() => handleReaction(post.id, name)}
                  >
                    {emoji} {postReactions[name]}
                  </button>
                ))}
              </div>

              {/* 5th Child: Link */}
              <Link
                to={`/posts/${post.id}`}
                className="button muted-button"
                style={{ marginTop: '10px', display: 'inline-block' }}
              >
                View Post
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};