import "../style/chatarea.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Chatarea = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const sender = Cookies.get("sender");
  const { receiver } = useParams();

  const [messageDetails, setmessageDetails] = useState({
    sender,
    receiver,
    message: "",
  });

  const [singlepersonchat, setsinglepersonchat] = useState([]);

  const updatemessage = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setmessageDetails({ ...messageDetails, [name]: value });
  };

  const socket = io("http://localhost:4000");
  const sendmessage = () => {
    socket.emit("frontendsendingcontactmessage", messageDetails);
    setmessageDetails({
      sender,
      receiver,
      message: "",
    });

    socket.on("messageUpdated", (data) => {
      window.location.reload();
      setsinglepersonchat(data);
    });
  };

  const mesagedisplayRef = useRef(null);

  useEffect(() => {
    socket.on("backendsendingpersonalchat", (data) => {
      setsinglepersonchat(data);
    });

    socket.on("messageUpdated", (data) => {
      setsinglepersonchat(data);
    });

    // Scroll to the bottom of the mesagedisplayarea
    mesagedisplayRef.current.scrollTop = mesagedisplayRef.current.scrollHeight;
  }, [socket]);

  useEffect(() => {
    socket.emit("sendSinglePersonChat", { sender, receiver });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="chatareaContainer">
      <div className="chatareaheader">
        <div className="singleChatProfileArea">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngSZYmJj4uV3dY8s8Pi-WcERTG7VVgupXlcm5LRQchQ7pwcLmU4erCoaZQ6dulh5G6FA&usqp=CAU"
            alt="img"
            className="contactdp"
          ></img>
          {receiver}
        </div>
        <Link className="closeLinkBtn" to="/contact">
          <AiOutlineClose />
        </Link>
      </div>

      <div className="mesagedisplayarea" ref={mesagedisplayRef}>
        {singlepersonchat.map((data, index) => {
          return (
            <div
              key={index}
              className={
                data.sender === sender
                  ? "messageTagContainer rightmessage"
                  : "messageTagContainer leftmessage"
              }
            >
              <div className="messageTag">
                <div className="senderDetails">{data.sender}</div>
                <div>{data.message}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chatboxinputrow">
        <textarea
          className="chatboxinput"
          placeholder="Message..."
          id="message"
          name="message"
          value={messageDetails.message}
          onChange={(e) => {
            updatemessage(e);
          }}
        ></textarea>
        <button className="chatareasendbtn" type="submit" onClick={sendmessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chatarea;
