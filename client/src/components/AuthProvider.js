import React, { useContext, useEffect, useState } from 'react';

const Auth = React.createContext({
  userId: undefined,
  setUserId: () => {
  }
});

export const useAuth = () => useContext(Auth);

export const AuthProvider = (props) => {
  let [userId, setUserId] = useState(undefined);

  useEffect(() => {
    setUserId(sessionStorage.getItem('userId'));
  }, []);

  return (
    <Auth.Provider value={{
      userId: userId,
      setUserId: setUserId
    }}>
      {props.children}
    </Auth.Provider>
  );
};
