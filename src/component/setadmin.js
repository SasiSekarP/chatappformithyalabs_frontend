import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Setadmin = () => {
  const token = Cookies.get("token");
  const groupid = Cookies.get("groupid");
  const groupname = Cookies.get("groupname");
  const [members, setMembers] = useState([]);
  const socket = io("http://localhost:4000");
  const sender = Cookies.get("sender");
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]); // Add value to selectedValues
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value)); // Remove value from selectedValues
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    socket.emit("addadmin", {
      groupid,
      groupname,
      admin: [...selectedValues, sender],
    });
    alert("Group created successfully");

    navigate("/grouphome", { replace: true });
  };

  useEffect(() => {
    socket.emit("sendmemberlist", groupid);

    socket.on("backendsendingmemberlisttomakeadmin", (data) => {
      console.log();
      const newMembers = data.filter((data) => {
        return data !== sender;
      });
      setMembers(newMembers);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <form className="loginForm" onSubmit={handlesubmit}>
      <h1 className="loginheader">Select admin</h1>
      <div className="loginlablerow">
        <div>Group name</div>
      </div>
      <div className="loginlablerow">
        <div className="logininput">{groupname}</div>
      </div>
      <div className="loginlablerow">
        <div>Add admin</div>
      </div>
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
      <div className="editformbtncontainer">
        <button type="submit" className="newGroupBtn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Setadmin;
