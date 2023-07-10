import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Notfound from "./component/pagenotfound";
import Login from "./component/login";
import Signup from "./component/signup";
import Contact from "./component/contact";
import Group from "./component/group";
import Chatarea from "./component/chatarea";
import Groupchatarea from "./component/groupchatarea";
import CreateNewGroup from "./component/createNewGroup";
import Setadmin from "./component/setadmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/contact" Component={Contact} />
        <Route path="/group" Component={Group} />
        <Route path="*" Component={Notfound} />
        <Route path="/chatarea/:receiver" Component={Chatarea} />
        <Route path="/createvewgroup" Component={CreateNewGroup} />
        <Route path="/setadmin" Component={Setadmin} />
        <Route path="/groupchatarea/:groupid" Component={Groupchatarea} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
