import React, { useState } from 'react';
import { AuthContext } from './authContext';
import Cookies from 'universal-cookie';

function AuthProvider({children}) {
  const cookies = new Cookies();
  const userCookie = cookies.get('rede_social_opet.user');
  const defaultValue = userCookie ? userCookie : null;

  const [user, setUser] = useState(defaultValue);

  const signin = async (googleData, callback) => {
    const res = await fetch('http://localhost:3001/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: googleData.tokenId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = new Error("Houve um erro ao autenticar o usuário.");
      callback(error);
      return;
    }

    const student = await res.json();
    const expirationDate = new Date();
    
    expirationDate.setHours(expirationDate.getHours() + 1);
    cookies.set('rede_social_opet.user', student, { expires: expirationDate });
    
    setUser(student);
    callback(null);
  };

  const signout = (callback) => {
    cookies.remove('rede_social_opet.user')
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
