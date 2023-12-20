import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const HeaderVideo = () => {
  const navigate = useNavigate();
  return (
    <div className="header-video">
      <div className="video-container">
        <video className="background-video" autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/doye6tvxz/video/upload/v1701812558/background2-video_online-video-cutter.com_rztuey.mp4"
            type="video/mp4"
          />
        </video>

        <div className="content-video text-center">
          <h1 className="text-center">Welcome to Advenshop</h1>

          <p className="text-center">
          Gear Up for the Adventure of a Lifetime
          </p>

          <Button className="btn-video" onClick={() => navigate("/products")}>Shop Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderVideo;
