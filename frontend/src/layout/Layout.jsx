import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />

      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default Layout;
