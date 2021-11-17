import React, { useState } from 'react';
import { fakeAuthProvider } from './auth';

let AuthContext = React.createContext(null);

function AuthProvider({children}) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    localStorage.setItem('rede_social_opet.user', JSON.stringify(newUser));
    setUser(newUser);
    return callback;
    // return fakeAuthProvider.signin(() => {
    //   setUser(newUser);
    //   callback();
    // });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext} ;
