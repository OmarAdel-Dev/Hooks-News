import React, { useReducer } from 'react';
import linkContext from './linkContext';
import linkReducer from './linkReducer';

const LinkState = props => {
  const intialState = {
    description: '',
    url: '',
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(linkReducer, intialState);

  return (
    <linkContext.Provider
      value={{
        description: state.description,
        url: state.url,
        loading: state.loading,
        error: state.error
      }}
    >
      {props.children}
    </linkContext.Provider>
  );
};

export default LinkState;
