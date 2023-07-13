import "../style/chatarea.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Group from "./group";

import { useParams } from "react-router-dom";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

import { SlOptionsVertical } from "react-icons/sl";

const Groupchatarea = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const socket = io("http://localhost:4000");
  const { groupid } = useParams();
  Cookies.set("groupid", groupid, { expires: 1 });

  const [groupChat, setgroupChat] = useState([]);

  const sender = Cookies.get("sender");

  const [adminstate, setadminstate] = useState(false);

  const [buttonavailableboolean, setbuttonavailableboolean] = useState(true);

  const [groupname, setgroupname] = useState("");

  const [message, setmessage] = useState("");

  const updateinputvalue = (e) => {
    const value = e.target.value;
    setmessage(value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("messagefromgroupchat", { message, sender, groupid });
      setmessage("");

      socket.on("updatedgroupmessage", (data) => {
        console.log(data);
        window.location.reload();
      });
    }
  };
  const mesagedisplayRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the mesagedisplayarea
    mesagedisplayRef.current.scrollTop = mesagedisplayRef.current.scrollHeight;
  }, [handlesubmit]);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    socket.emit("sendgroupchat", groupid);

    socket.on("groupchat", (data) => {
      setgroupChat(data.message);
      setgroupname(data.groupname);
      Cookies.set("groupname", data.groupname, { expires: 1 });
      const isSenderAdmin = data.admin.includes(sender);
      setadminstate(isSenderAdmin);
    });
  }, [groupid]);

  const doesShowOption = () => {
    setbuttonavailableboolean(!buttonavailableboolean);
  };

  return (
    <div className="homecontainer">
      <div className="chatleftcontainer">
        <Group />
      </div>
      <div className="chatrightcontainer">
        <form onSubmit={handlesubmit} className="chatareaContainer">
          <div className="chatareaheader">
            <div className="singleChatProfileArea">
              <img
                src="https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png"
                alt="img"
                className="contactdp"
              ></img>
              {groupname}
            </div>
            {adminstate || (
              <Link className="closeLinkBtn" to="/grouphome">
                <AiOutlineClose />
              </Link>
            )}
            {adminstate && (
              <div className="closeLinkBtn">
                <button className="optionbtn" onClick={doesShowOption}>
                  <SlOptionsVertical />
                </button>
                {buttonavailableboolean || (
                  <div className="hoverbtnplafrom">
                    <Link className="hoverbtn" to="/grouphome">
                      Close chat
                    </Link>
                    <Link className="hoverbtn" to="/addadmin">
                      Add
                    </Link>
                    <Link to="/removeadmin" className="hoverbtn">
                      Remove
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mesagedisplayarea" ref={mesagedisplayRef}>
            {groupChat.map((data, index) => {
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
              id="chatinput"
              name="chatinput"
              value={message}
              onChange={(e) => {
                updateinputvalue(e);
              }}
            ></textarea>
            <button type="submit" className="chatareasendbtn">
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Groupchatarea;
