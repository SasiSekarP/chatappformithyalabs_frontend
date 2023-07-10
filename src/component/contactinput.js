import Cookies from "js-cookie";
import { useState } from "react";
const ContactInput = (props) => {
  const sender = Cookies.get("sender");
  const { receiver } = props;
  const [messageDetails, setMessageDetails] = useState({
    sender,
    receiver,
    message: "",
  });

  const updatemessage = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMessageDetails({ ...messageDetails.message, [name]: value });
  };

  const submithadler = () => {
    alert(messageDetails.message);
  };
  return (
    <div className="chatboxinputrow">
      <textarea
        className="chatboxinput"
        placeholder="Message..."
        id="message"
        name="message"
        value={messageDetails.message}
        onChange={(e) => {
          updatemessage(e);
        }}
      ></textarea>
      <button className="chatareasendbtn" type="button" onClick={submithadler}>
        send
      </button>
    </div>
  );
};

export default ContactInput;
