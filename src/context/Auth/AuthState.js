import React, { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  AUTHENTICATED,
  LOGOUT
} from '../types';

import firebase from '../../firebase/config';

const AuthState = props => {
  const auth = firebase.auth();

  const initialState = {
    response: {},
    authUser: {},
    isAuthenticated: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Persist User

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: AUTHENTICATED,
          payload: user
        });
      } else {
        dispatch({
          type: LOGOUT
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Register User

  const register = async (name, email, password) => {
    try {
      setLoading();
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await newUser.user.updateProfile({
        displayName: name
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: newUser
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.message
      });
    }
  };

  // Login User

  const login = async (email, password) => {
    try {
      setLoading();
      const response = await auth.signInWithEmailAndPassword(email, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      });
    }
  };

  // Logout User

  const logout = async () => {
    await auth.signOut();
  };

  // Reset Password

  const resetPassword = async email => {
    await auth.sendPasswordResetEmail(email);
  };

  //Set Loading

  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  return (
    <AuthContext.Provider
      value={{
        response: state.response,
        authUser: state.authUser,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        resetPassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
