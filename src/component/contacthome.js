import { useEffect } from "react";
import Contact from "./contact";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Contacthome = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  });
  return (
    <div className="homecontainer">
      <div className="homeleftcontainer">
        <Contact />
      </div>
      <div className="homerightcontainer">
        <img
          src="https://apps.shift4shop.com/cdn-cgi/image/quality%3D100/assets/images/faq%201.png"
          className="nochatscreenimg"
          alt="logo"
        ></img>
        <h1 className="nochatscreenheader">ChatApp</h1>
        <p>Chat with any contact with out any restriction</p>
      </div>
    </div>
  );
};

export default Contacthome;
