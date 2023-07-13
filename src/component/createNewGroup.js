import { Link } from "react-router-dom";
import { useState } from "react";
import "../style/createnewgroup.css";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateNewGroup = () => {
  const socket = io("http://localhost:4000");

  const token = Cookies.get("token");
  const creater = Cookies.get("sender");
  const navigate = useNavigate();

  const [contacts, setcontacts] = useState([]);
  const [groupname, setgroupname] = useState("");

  const [selectedValues, setSelectedValues] = useState([]);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (selectedValues.length !== 0 && groupname) {
      e.preventDefault();
      const groupid = uuidv4();
      Cookies.set("groupid", groupid, { expires: 1 });
      Cookies.set("groupname", groupname, { expires: 1 });

      socket.emit("createnewgroup", {
        selectedValues: [...selectedValues, creater],
        groupname,
        creater,
        groupid,
      });

      navigate("/setadmin", { replace: true });

      socket.disconnect();
    } else {
      alert("Group name member names are mandatory to create group");
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]); // Add value to selectedValues
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value)); // Remove value from selectedValues
    }
  };

  const updatename = (e) => {
    const value = e.target.value;
    setgroupname(value);
  };

  useEffect(() => {
    socket.emit("fetchContact", { token });

    socket.on("sendContacts", (data) => {
      const dataArr = data.map((data) => {
        return data.username;
      });
      setcontacts(dataArr);
    });
  }, []);

  return (
    <div>
      <form className="loginForm" onSubmit={handlesubmit}>
        <div className="creategroupclosebtnrow">
          <Link to="/grouphome">x</Link>
        </div>
        <h1 className="loginheader">Create New Group</h1>
        <div className="loginlablerow">
          <label htmlFor="groupname">Group Name</label>
        </div>
        <div className="loginlablerow">
          <input
            className="logininput"
            id="groupname"
            placeholder="Group name"
            type="text"
            value={groupname}
            onChange={(e) => {
              updatename(e);
            }}
            name="groupname"
          ></input>
        </div>
        <div className="loginlablerow">
          <label htmlFor="groupname">Add members</label>
        </div>
        <div className="checkboxcontainer">
          {contacts.map((data, index) => {
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
        <div className="editformbtncontainer">
          <button type="submit" className="newGroupBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewGroup;
