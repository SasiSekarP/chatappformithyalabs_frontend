import Cookies from "js-cookie";
import Group from "./group";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Grouphome = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="homecontainer">
      <div className="homeleftcontainer">
        <Group />
      </div>
      <div className="homerightcontainer">
        <img
          src="https://apps.shift4shop.com/cdn-cgi/image/quality%3D100/assets/images/faq%201.png"
          className="nochatscreenimg"
          alt="logo"
        ></img>
        <h1 className="nochatscreenheader">ChatApp</h1>
        <p>Chat with your any contact with out any restriction</p>
      </div>
    </div>
  );
};

export default Grouphome;
