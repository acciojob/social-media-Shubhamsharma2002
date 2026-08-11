import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        {/* Test 1 looks for "GenZ" inside #heading */}
        <h1 id="heading">GenZ</h1>

        {/* Test 2, 5, & 6 look for these exact links */}
        <div className="navLinks">
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
      </section>
    </nav>
  );
};