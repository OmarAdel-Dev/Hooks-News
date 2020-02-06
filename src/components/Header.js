import React, { useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';

function Header() {
  const authContext = useContext(AuthContext);
  const { authUser, logout } = authContext;

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
      {authUser && (
        <>
          <div className="divider">|</div>
          <NavLink to="/create" className="header-link">
            Submit
          </NavLink>
        </>
      )}
      <div style={{ marginLeft: 'auto' }}>
        {authUser ? (
          <div style={{ display: 'flex' }}>
            <div className="header-name">{authUser.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button" onClick={() => logout()}>
              Logout
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="header-link"
            style={{ marginLeft: 'auto' }}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
