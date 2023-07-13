import Cookies from "js-cookie";
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const Group = () => {
  const socket = io("http://localhost:4000");
  const sender = Cookies.get("sender");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [groupNames, setgroupNames] = useState([
    { groupname: "Loading...", groupid: "1" },
  ]);

  useEffect(() => {
    socket.emit("grouplistfetch", sender);
  }, []);

  socket.on("grouplistresponse", (data) => {
    setgroupNames(data);
  });

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  return (
    <div className="contactContainer">
      <Navbar />
      {groupNames.length > 0 && (
        <div className="newGroupContainer">
          <Link className="newGroupBtnorigional" to="/createvewgroup">
            New Group
          </Link>
        </div>
      )}
      <div className="chatboxlinkContainer">
        {groupNames.length === 0 && (
          <div className="nogroupcontainer">
            <h3 className="createneewgroupheading">
              You are not in any of the groups
            </h3>
            <Link className="newGroupBtn" to="/createvewgroup">
              Create Group
            </Link>
          </div>
        )}
        <div className="">
          {groupNames.map((data) => {
            return (
              <Link
                to={`/groupchatarea/${data.groupid}`}
                key={data.groupid}
                className="contactNames"
              >
                <img
                  src="https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png"
                  alt="img"
                  className="contactdp"
                ></img>
                <div>{data.groupname}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Group;
