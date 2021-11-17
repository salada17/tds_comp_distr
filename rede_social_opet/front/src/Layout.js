import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <nav>
        {/* <ul>
          <li>Link 1</li>
          <li>Link 2</li>
        </ul> */}
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>

      <hr />

      {/* <div className="footer">
        Footer.
      </div> */}
    </>
  );
}

export default Layout;
