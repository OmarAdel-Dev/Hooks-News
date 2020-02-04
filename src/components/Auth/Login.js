import React, { useState, useEffect } from 'react';
import validateLogin from './validateLogin';

function Login(props) {
  const [login, setLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  useEffect(() => {
    if (isSubmit) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Authenticated', user);
        setIsSubmit(false);
      } else {
        setIsSubmit(false);
      }
    }
  }, [errors]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setErrors(validateLogin(user));
    setIsSubmit(true);
    console.log({ user });
  };

  return (
    <div>
      <h2 className="mv3">{login ? 'Login' : 'Create an account'}</h2>
      <form onSubmit={onSubmit} className="flex flex-column">
        {!login && (
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
        <div className="flex mt3">
          <button
            type="submit"
            className="button"
            disabled={isSubmit}
            style={{ background: isSubmit ? 'grey' : 'orange' }}
          >
            {login ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login
              ? 'need to create an account ?'
              : 'already have an account ?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
