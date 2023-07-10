import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const socket = io("http://localhost:4000");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    socket.on("signupmessage", (data) => {
      alert(data.message);
      if (data.status === "ok") {
        navigate("/", { replace: true });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, navigate]);

  const updatevalue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const signupHanddle = (e) => {
    e.preventDefault();
    if (
      userDetails.username &&
      userDetails.password &&
      userDetails.confirmpassword &&
      userDetails.password === userDetails.confirmpassword
    ) {
      socket.emit("signup", userDetails);
    } else if (userDetails.password !== userDetails.confirmpassword) {
      alert(
        `password: ${userDetails.password}, confirmPassword: ${userDetails.confirmpassword}. They must match`
      );
    } else {
      alert(
        "Username, Password and Confirm password are mandatory details to log in. Please fill both."
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/contact", { replace: true });
    }
  }, [token]);

  return (
    <form className="loginForm" onSubmit={signupHanddle}>
      <h1 className="loginheader">Sign Up</h1>
      <div className="loginlablerow">
        <label>User Name</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="text"
          placeholder="User Name"
          name="username"
          id="username"
          value={userDetails.username}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={userDetails.password}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <label>Confirm Password</label>
      </div>
      <div className="loginlablerow">
        <input
          className="logininput"
          type="password"
          placeholder="Re-enter password"
          name="confirmpassword"
          id="confirmpassword"
          value={userDetails.confirmpassword}
          onChange={(e) => {
            updatevalue(e);
          }}
        ></input>
      </div>
      <div className="loginlablerow">
        <button type="submit" className="loginBtn">
          Sign up
        </button>
      </div>
      <div className="loginlablerow2">
        already have an account ?<Link to="/">Login</Link>
      </div>
    </form>
  );
};

export default Signup;
