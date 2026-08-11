import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PostsList } from './PostsList';
import { SinglePostPage } from './SinglePostPage';
import { EditPostForm } from './EditPostForm';
import { UsersList } from './UsersList';
import { NotificationsList } from './NotificationsList';
import '../styles/App.css';

export default function App() {
  const [users] = useState([
    { id: '1', name: 'Tianna Jenkins' },
    { id: '2', name: 'Kevin Grant' },
    { id: '3', name: 'Madison Price' },
  ]);

  const [posts, setPosts] = useState([
    { id: '1', title: 'First Post!', content: 'Hello World!', user: '1' },
    { id: '2', title: 'Second Post!', content: 'Testing Cypress flow.', user: '2' },
  ]);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  return (
    <Router>
      <Navbar />
      <div className="App" style={{ padding: '20px' }}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsList posts={posts} onAddPost={addPost} users={users} />
            )}
          />
          <Route
            exact
            path="/posts/:postId"
            render={() => <SinglePostPage posts={posts} />}
          />
          <Route
            exact
            path="/editPost/:postId"
            render={() => (
              <EditPostForm posts={posts} onUpdatePost={updatePost} />
            )}
          />
          <Route
            exact
            path="/users"
            render={() => <UsersList users={users} />}
          />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}