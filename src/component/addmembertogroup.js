import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Addmembertogroup = () => {
  const navigate = useNavigate();
  const groupid = Cookies.get("groupid");
  const groupname = Cookies.get("groupname");
  const [selectedValues, setSelectedValues] = useState([]);

  const [availablePeople, setavailablePeople] = useState([]);
  const socket = io("http://localhost:4000");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]); // Add value to selectedValues
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value)); // Remove value from selectedValues
    }
  };

  useEffect(() => {
    socket.emit("sendavailablepeopletobeagroupmember", groupid);

    socket.on("availablememberstobethememberofgroup", (data) => {
      setavailablePeople(data);
    });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (selectedValues.length > 0) {
      socket.emit("addthismembertothegroup", {
        groupid,
        groupname,
        selectedValues,
      });
      alert("Correction made successfully");

      navigate(`/groupchatarea/${groupid}`, { replace: true });
    } else {
      alert("Select at least one person");
    }
  };

  return (
    <form className="loginForm" onSubmit={handlesubmit}>
      <div className="creategroupclosebtnrow">
        <Link to={`/groupchatarea/${groupid}`}>
          <AiOutlineClose />
        </Link>
      </div>
      <h1 className="loginheader">Add people</h1>
      <div className="loginlablerow">Group Name</div>
      <div className="logininput">
        <div>{groupname}</div>
      </div>
      <div className="loginlablerow currentadminlable">
        <div>Available users</div>
      </div>
      {availablePeople.length === 0 && (
        <div className="logininput">
          <div>Each people is member now</div>
        </div>
      )}
      {availablePeople.length !== 0 && (
        <div className="checkboxcontainer">
          {availablePeople.map((data, index) => {
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
      {availablePeople.length > 0 && (
        <div className="editformbtncontainer">
          <button type="submit" className="newGroupBtn">
            Add
          </button>
        </div>
      )}
      {availablePeople.length === 0 && (
        <div className="editformbtncontainer">
          <Link className="newGroupBtn" to={`/groupchatarea/${groupid}`}>
            Back to chat
          </Link>
        </div>
      )}
    </form>
  );
};

export default Addmembertogroup;
