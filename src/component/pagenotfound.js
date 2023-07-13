import { Link } from "react-router-dom";
import "../style/pagenotfound.css";

const Notfound = () => {
  return (
    <div className="pagenotfound">
      <div className="errornumber">404</div>
      <h1>Oops!</h1>
      <h1>Page not found</h1>

      <div className="pagenotfoundlink">
        Back to Login page? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Notfound;
