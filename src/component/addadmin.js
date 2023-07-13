import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Addadmin = () => {
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
    socket.emit("sendlistofavailablepeopletobeadmin", groupid);

    socket.on("responseforavaliablepeopletobeadmin", (data) => {
      // const subtractedArray = data.totalmembers.filter(
      //   (element) => !data.admin.includes(element)
      // );
      setavailablePeople(data);
    });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (selectedValues.length > 0) {
      socket.emit("addadmin", {
        groupid,
        groupname,
        admin: [...selectedValues],
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
      <h1 className="loginheader">Add admin</h1>
      <div className="loginlablerow">Group Name</div>
      <div className="logininput">
        <div>{groupname}</div>
      </div>
      <div className="loginlablerow currentadminlable">
        <div>Members</div>
      </div>
      {availablePeople.length === 0 && (
        <div className="logininput">
          <div>Each Member is admin now</div>
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

export default Addadmin;
