import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const toggleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };

  const { userInfo } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
        <Link to="/v1/home" className="logo">
        <img src="/logoNavbar.png" alt="" />
        </Link>  

  
      <div className="icons">
        <div className="icon">
          <img className="svg-icon" src="/maximize.svg" alt="icon" onClick={toggleFullScreen} />
        </div>
        <Link to="/v1/profile" className="user">
          <img src="/noavatar.png" alt="" />
        </Link>  
        <div className="logout">
          <img className="svg-icon" src="/logout.svg" alt="icon" onClick={logoutHandler} />
        </div>
      </div>
    </div>
  );

  }