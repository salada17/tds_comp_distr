import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const user = cookies.get('rede_social_opet.user');
export const AuthContext = React.createContext(user);
