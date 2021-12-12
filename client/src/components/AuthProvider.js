import React, { useContext, useState } from 'react';

const Auth = React.createContext({
  token: '',
  setToken: () => {
  }
});

export const useAuth = () => useContext(Auth);

export const AuthProvider = (props) => {
  let [token, setToken] = useState('');

  return (
    <Auth.Provider value={{
      token: token,
      setToken: setToken
    }}>
      {props.children}
    </Auth.Provider>
  );
};
