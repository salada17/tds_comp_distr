import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "./authContext";
import './Layout.css';

function Layout() {
  const auth = useContext(AuthContext);

  return (
    <div id="wrapper">
      <ul hidden={!auth.user} className="navbar-nav sidebar sidebar-dark accordion text-white bg-dark" style={{width: "280px"}}>
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Mercúrio Estudante</div>
        </a>

        <li className="nav-item">
          <a href="/posts" className="nav-link active" aria-current="page">
            Posts
          </a>
        </li>

        <li className="nav-item">
          <a href="/logout" className="nav-link" aria-current="page">
            Logout
          </a>
        </li> 
      </ul>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
