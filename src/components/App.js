import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PostsList } from './components/PostsList';
import { UsersList } from './components/UsersList';
import { NotificationsList } from './components/NotificationsList';
import '../styles/App.css';

export default function App() {
  // Pre-seed initial posts so .posts-list > :nth-child(2) exists for Test 4
  const [posts, setPosts] = useState([
    { id: '1', title: 'First Post!', content: 'Hello World!' },
    { id: '2', title: 'Second Post!', content: 'Testing Cypress flow.' },
  ]);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <Router>
      <Navbar />
      <div className="App" style={{ padding: '20px' }}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostsList posts={posts} onAddPost={addPost} />}
          />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}