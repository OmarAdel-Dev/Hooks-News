import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';

const UserState = props => {
  const intialState = {
    name: '',
    email: '',
    password: '',
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(UserReducer, intialState);

  return (
    <UserContext.Provider
      value={{
        name: state.name,
        email: state.email,
        password: state.password,
        loading: state.loading,
        error: state.error
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
