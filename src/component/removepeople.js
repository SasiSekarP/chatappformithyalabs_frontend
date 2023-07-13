import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Removepeople = () => {
  const navigate = useNavigate();
  const socket = io("http://localhost:4000");

  const [members, setmembers] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);

  const sender = Cookies.get("sender");
  const groupid = Cookies.get("groupid");
  const groupname = Cookies.get("groupname");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]); // Add value to selectedValues
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value)); // Remove value from selectedValues
    }
  };

  useEffect(() => {
    socket.emit("sendpeoplelisttoremovefromthegroup", groupid);

    socket.on("availablepeopleforremoval", (data) => {
      const editeddata = data.filter((singledata) => {
        return singledata !== sender;
      });
      setmembers(editeddata);
    });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (selectedValues.length > 0) {
      socket.emit("removethismembersfromgroup", { groupid, selectedValues });

      alert("Correction made successfully");

      navigate(`/groupchatarea/${groupid}`, { replace: true });
    } else {
      alert("Select at least one contact to continue");
    }
  };

  return (
    <div>
      <form className="loginForm" onSubmit={handlesubmit}>
        <div className="creategroupclosebtnrow">
          <Link to={`/groupchatarea/${groupid}`}>x</Link>
        </div>
        <h1 className="loginheader">Remove member</h1>
        <div className="loginlablerow">Group Name</div>
        <div className="logininput">
          <div>{groupname}</div>
        </div>
        <div className="loginlablerow currentadminlable">
          <div>Current members</div>
        </div>
        {members.length === 0 && (
          <div className="logininput">
            <div>You are the only member</div>
          </div>
        )}
        {members.length !== 0 && (
          <div className="checkboxcontainer">
            {members.map((data, index) => {
              return (
                <div key={index} className="checkrow">
                  <input
                    type="checkbox"
                    value={data}
                    onChange={handleCheckboxChange}
                  />
                  <div className="checkboxlable">{data}</div>
                </div>
              );
            })}
          </div>
        )}
        {members.length > 0 && (
          <div className="editformbtncontainer">
            <button type="submit" className="newGroupBtn">
              Remove
            </button>
          </div>
        )}
        {members.length === 0 && (
          <div className="editformbtncontainer">
            <Link className="newGroupBtn" to={`/groupchatarea/${groupid}`}>
              Back to chat
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Removepeople;
