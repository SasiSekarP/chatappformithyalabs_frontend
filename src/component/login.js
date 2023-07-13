import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const socket = io("http://localhost:4000");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    socket.on("loginmessage", (data) => {
      if (data.loginStatus === "ok") {
        Cookies.set("token", data.token, { expires: data.expire });
        Cookies.set("sender", data.username, { expires: data.expire });

        navigate("/contacthome", { replace: true });
      } else if (
        data.loginStatus === "fail" &&
        data.message === "Username and password does not match"
      ) {
        alert(data.message);
      } else {
        alert(
          "There is no user in that name. Please check the name once again or create a new account"
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, navigate]);

  const valueUpdata = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const loginHanddle = (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.password) {
      socket.emit("login", userDetails);
    } else {
      alert(
        "Username and Password are mandatory details to log in. Please fill both."
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/contacthome", { replace: true });
    }
  }, [token]);

  return (
    <form className="loginForm" onSubmit={loginHanddle}>
      <h1 className="loginheader">Login</h1>
      <div className="loginlablerow">
        <label>User Name</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          placeholder="User Name"
          type="text"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={(e) => {
            valueUpdata(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={userDetails.password}
          onChange={(e) => {
            valueUpdata(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <button type="submit" className="loginBtn">
          Log in
        </button>
      </div>
      <div className="loginlablerow2">
        Need to create an account? <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  );
};

export default Login;
