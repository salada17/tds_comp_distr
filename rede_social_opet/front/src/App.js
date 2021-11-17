import './App.css';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import { Route, Routes } from 'react-router';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './AuthProvider';
import RequireAuth from './RequireAuth';
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/posts"
            element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
