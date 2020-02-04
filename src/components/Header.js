import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <img src="/logo.png" alt="Hooks News Logo" className="logo" />
      <NavLink to="/" className="header-title">
        Hooks News
      </NavLink>
      <NavLink to="/" className="header-link">
        new
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/top" className="header-link">
        top
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/search" className="header-link">
        Search
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/create" className="header-link">
        Submit
      </NavLink>
      <NavLink
        to="/login"
        className="header-link"
        style={{ marginLeft: 'auto' }}
      >
        Login
      </NavLink>
    </div>
  );
}

export default withRouter(Header);
