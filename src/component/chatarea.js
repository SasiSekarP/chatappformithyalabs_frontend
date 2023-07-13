import "../style/chatarea.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import Contact from "./contact";

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

  const [singlepersonchat, setsinglepersonchat] = useState([
    {
      sender: "Sender",
      receiver: "you",
      message: "Still now no conversation. Say hi to start",
    },
  ]);

  const updatemessage = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setmessageDetails({ ...messageDetails, [name]: value });
  };

  const socket = io("http://localhost:4000");

  const sendmessage = () => {
    console.log(messageDetails);
    socket.emit("frontendsendingcontactmessage", messageDetails);
    setmessageDetails({
      sender,
      receiver,
      message: "",
    });
    window.location.reload();
  };

  const mesagedisplayRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the mesagedisplayarea
    mesagedisplayRef.current.scrollTop = mesagedisplayRef.current.scrollHeight;
  }, [socket]);

  useEffect(() => {
    socket.emit("sendSinglePersonChat", { sender, receiver, token });

    socket.on("backendsendingpersonalchat", (data) => {
      setsinglepersonchat(data);
    });

    setmessageDetails({
      sender,
      receiver,
      message: "",
    });

    // socket.on("messageUpdated", (data) => {
    //   setsinglepersonchat(data);
    // });
  }, [receiver]);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="homecontainer">
      <div className="chatleftcontainer">
        <Contact />
      </div>
      <div className="chatrightcontainer">
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
            <Link className="closeLinkBtn" to="/contacthome">
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
                    <div className="senderDetails">
                      {data.sender !== sender && <div>{data.sender}</div>}
                      {data.sender === sender && <div>you</div>}
                    </div>
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
            <button
              onClick={sendmessage}
              className="chatareasendbtn"
              type="button"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatarea;
