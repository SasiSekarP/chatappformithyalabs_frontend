import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import "../style/contact.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Contact = () => {
  const socket = io("http://localhost:4000");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [contact, setContact] = useState([]);

  if (!token) {
    navigate("/", { replace: true });
  }

  useEffect(() => {
    socket.emit("fetchContact", { token });

    socket.on("sendContacts", (data) => {
      setContact(data);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="contactContainer">
      <Navbar />
      <div className="chatboxlinkContainer">
        {contact.map((data) => {
          return (
            <Link
              key={data.id}
              to={`/chatarea/${data.username}`}
              className="contactNames"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngSZYmJj4uV3dY8s8Pi-WcERTG7VVgupXlcm5LRQchQ7pwcLmU4erCoaZQ6dulh5G6FA&usqp=CAU"
                alt="img"
                className="contactdp"
              ></img>
              <div>{data.username}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
