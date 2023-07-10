import { Link } from "react-router-dom";
import "../style/pagenotfound.css";

const Notfound = () => {
  return (
    <div className="pagenotfound">
      <h1>Page not found</h1>
      <div className="pagenotfoundlink">
        Back to Login page? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Notfound;
