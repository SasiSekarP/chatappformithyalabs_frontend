import { NavLink, useNavigate } from "react-router-dom";

import "../style/navbar.css";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const logourfn = () => {
    Cookies.remove("token");
    Cookies.remove("sender");
    Cookies.remove("receiver");
    navigate("/", { replace: true });
  };
  return (
    <div className="navbarcontainer">
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "activeTab" : "inactiveTab")}
      >
        Contact
      </NavLink>
      <NavLink
        to="/group"
        className={({ isActive }) => (isActive ? "activeTab" : "inactiveTab")}
      >
        Group
      </NavLink>
      <button className="inactiveTab logoutbtn" onClick={logourfn}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
