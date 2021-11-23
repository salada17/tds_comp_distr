import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from "./authContext";

function Logout() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  auth.signout(() => {
    navigate('/login');
  });

  window.location.reload();

  return null;
}

export default Logout;
