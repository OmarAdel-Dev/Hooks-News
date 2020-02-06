import React, { useState, useEffect, useContext } from 'react';
import validateLogin from './validateLogin';
import AuthContext from '../../context/Auth/authContext';
import { Link } from 'react-router-dom';

function Login(props) {
  const authContext = useContext(AuthContext);
  const { register, login, error, isAuthenticated } = authContext;

  const [loginState, setLoginState] = useState(true);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [props.history, isAuthenticated]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setErrors(validateLogin(user));
    loginState ? login(email, password) : register(name, email, password);
  };

  return (
    <div>
      <h2 className="mv3">{loginState ? 'Login' : 'Create an account'}</h2>
      <form onSubmit={onSubmit} className="flex flex-column">
        {!loginState && (
          <input
            name="name"
            value={name}
            onChange={onChange}
            type="text"
            placeholder="Your Name"
            autoComplete="off"
          />
        )}
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your Email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          className={errors.password && 'error-input'}
          placeholder="Type a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {error && <p className="error-text">{error}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button"
            style={{ background: 'orange' }}
          >
            {loginState ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setLoginState(prevLogin => !prevLogin)}
          >
            {loginState
              ? 'need to create an account ?'
              : 'already have an account ?'}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
