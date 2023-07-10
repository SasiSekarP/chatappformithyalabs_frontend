import "../style/chatarea.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

const Groupchatarea = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const socket = io("http://localhost:4000");
  const { groupid } = useParams();
  const [groupChat, setgroupChat] = useState([]);

  const mesagedisplayRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the mesagedisplayarea
    mesagedisplayRef.current.scrollTop = mesagedisplayRef.current.scrollHeight;
  }, [socket]);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    socket.emit("sendgroupchat", groupid);
    socket.on("groupchat", (data) => {
      setgroupChat(data.message);
    });
  }, []);

  return (
    <div className="chatareaContainer">
      <div className="chatareaheader">
        <div className="singleChatProfileArea">
          <img
            src="https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png"
            alt="img"
            className="contactdp"
          ></img>
          Group Name
        </div>
        <Link className="closeLinkBtn" to="/group">
          <AiOutlineClose />
        </Link>
      </div>
      <div className="mesagedisplayarea" ref={mesagedisplayRef}>
        {groupChat.map((data, index) => {
          return (
            <div
              key={index}
              className={
                data.sender === "Sasi"
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
        <textarea className="chatboxinput" placeholder="Message..."></textarea>
        <button className="chatareasendbtn">send</button>
      </div>
    </div>
  );
};

export default Groupchatarea;
