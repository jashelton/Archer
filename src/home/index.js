import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-view container">
      <Link to="/login">Logout</Link>
      hello
    </div>
  );
}