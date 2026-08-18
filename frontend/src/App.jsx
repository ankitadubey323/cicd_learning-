import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(){
  const token = localStorage.getItem('token');
  return (
    <div className="container">
      <header>
        <h1>Todo App</h1>
        <nav>
          {token ? (
            <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
