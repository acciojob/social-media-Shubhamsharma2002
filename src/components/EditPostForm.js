import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export const EditPostForm = ({ posts, onUpdatePost }) => {
  const { postId } = useParams();
  const history = useHistory();
  const post = posts.find((p) => p.id === postId);

  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');

  const handleSave = () => {
    if (title && content) {
      onUpdatePost({ ...post, title, content });
      history.push(`/posts/${postId}`);
    }
  };

  if (!post) return <section><h2>Post not found!</h2></section>;

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
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
    </section>
  );
};