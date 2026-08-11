import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const SinglePostPage = ({ posts }) => {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};