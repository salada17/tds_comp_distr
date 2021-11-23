import './App.css';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import { Route, Routes } from 'react-router';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './AuthProvider';
import RequireAuth from './RequireAuth';
import Posts from './Posts';
import CreatePost from './CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './Post';
import Logout from './Logout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={
            <RequireAuth>
              <Posts />
            </RequireAuth>
          }/>

          <Route path="posts/:postId" element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }/>

          <Route path="/posts/new" element={
            <RequireAuth>
              <CreatePost />
            </RequireAuth>
          } />

          <Route path="/logout" element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          } />
        </Route>
      </Routes>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
