import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/chatarea.css";
import "./style/contact.css";
import "./style/createnewgroup.css";
import "./style/pagenotfound.css";
import "./style/navbar.css";
import "./style/login.css";
import "./style/editadmindetails.css";
import "./style/homecontainer.css";

import Notfound from "./component/pagenotfound";
import Login from "./component/login";
import Signup from "./component/signup";
import Chatarea from "./component/chatarea";
import Groupchatarea from "./component/groupchatarea";
import CreateNewGroup from "./component/createNewGroup";
import Setadmin from "./component/setadmin";
import Addadmin from "./component/addadmin";
import Removeadmin from "./component/removeadmin";
import Contacthome from "./component/contacthome";
import Grouphome from "./component/grouphome";
import Addmembertogroup from "./component/addmembertogroup";
import Removepeople from "./component/removepeople";
import Deletegroup from "./component/deletegroup";
import Groupuserlist from "./component/groupuserlist";
import Groupadminlist from "./component/groupadminlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/contacthome" Component={Contacthome} />
        <Route path="/signup" Component={Signup} />
        <Route path="/grouphome" Component={Grouphome} />
        <Route path="/chatarea/:receiver" Component={Chatarea} />
        <Route path="/createvewgroup" Component={CreateNewGroup} />
        <Route path="/setadmin" Component={Setadmin} />
        <Route path="/addadmin" Component={Addadmin} />
        <Route path="/groupchatarea/:groupid" Component={Groupchatarea} />
        <Route path="/addmembertogroup" Component={Addmembertogroup} />
        <Route path="/removeadmin" Component={Removeadmin} />
        <Route path="/removepeople" Component={Removepeople} />
        <Route path="/deletegroup" Component={Deletegroup} />
        <Route path="/groupuserlist" Component={Groupuserlist} />
        <Route path="/groupadminlist" Component={Groupadminlist} />
        <Route path="*" Component={Notfound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
