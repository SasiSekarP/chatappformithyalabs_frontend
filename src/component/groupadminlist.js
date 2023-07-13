import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Groupadminlist = () => {
  const socket = io("http://localhost:4000");
  const groupid = Cookies.get("groupid");
  const groupname = Cookies.get("groupname");
  const sender = Cookies.get("sender");
  const [members, setmembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("sendadminlist", groupid);

    socket.on("currentadminlist", (data) => {
      setmembers(data);
    });
  }, []);

  const backtothechat = () => {
    navigate(`/groupchatarea/${groupid}`);
  };

  return (
    <div className="loginForm">
      <div className="creategroupclosebtnrow">
        <Link to={`/groupchatarea/${groupid}`}>x</Link>
      </div>
      <h1 className="loginheader">Current Admin</h1>
      <div className="loginlablerow">Group Name</div>
      <div className="logininput">
        <div>{groupname}</div>
      </div>
      <div className="loginlablerow currentadminlable">
        <div>Current Admin</div>
      </div>
      <div className="checkboxcontainer">
        {members.map((data, index) => {
          return (
            <div key={index} className="checkrow">
              <div className="checkboxlable">
                {sender === data ? "You" : data}
              </div>
            </div>
          );
        })}
      </div>
      <div className="editformbtncontainer">
        <button type="button" onClick={backtothechat} className="newGroupBtn">
          Back to chat
        </button>
      </div>
    </div>
  );
};

export default Groupadminlist;
