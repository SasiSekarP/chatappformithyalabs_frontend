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
        to="/contacthome"
        className={({ isActive }) =>
          isActive ? "activeTab tab" : "inactiveTab tab"
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/grouphome"
        className={({ isActive }) =>
          isActive ? "activeTab tab" : "inactiveTab tab"
        }
      >
        Group
      </NavLink>
      <button className="inactiveTab logoutbtn tab" onClick={logourfn}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
