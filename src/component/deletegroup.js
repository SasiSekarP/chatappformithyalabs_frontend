import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const Deletegroup = () => {
  const token = Cookies.get("token");
  const groupid = Cookies.get("groupid");
  const socket = io("http://localhost:4000");
  const groupname = Cookies.get("groupname");

  const navigate = useNavigate();

  const handlesubmit = () => {
    socket.emit("deletethisgroup", groupid);

    alert("Group deleted successfully");

    navigate("/grouphome", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  const dontdeleteFn = () => {
    navigate(`/groupchatarea/${groupid}`);
  };
  return (
    <form className="loginForm" onSubmit={handlesubmit}>
      <div className="creategroupclosebtnrow">
        <Link to={`/groupchatarea/${groupid}`}>x</Link>
      </div>
      <h1 className="loginheader">Delete Group</h1>
      <div className="loginlablerow">Group Name</div>
      <div className="logininput">
        <div>{groupname}</div>
      </div>
      <div className="loginlablerow currentadminlable">
        <div className="loginlablerow">Do you want to delete this group?</div>
      </div>
      <div className="editformbtncontainer">
        <button type="submit" className="newGroupBtn deletegroupbtn">
          Yes
        </button>
        <button
          type="button"
          onClick={dontdeleteFn}
          className="newGroupBtn deletegroupbtn"
        >
          No
        </button>
      </div>
    </form>
  );
};

export default Deletegroup;
