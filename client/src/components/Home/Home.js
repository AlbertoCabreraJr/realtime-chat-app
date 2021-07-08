import "./home.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { logout } from "../../store/users";
import { setRoom } from "../../store/rooms";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomName = ref.current.value;

    try {
      dispatch(setRoom({ roomName, user, text: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="home-title">Create or Join a Room</div>
      <div className="home-input-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-room"
            placeholder="Room Name"
            ref={ref}
            minLength={1}
            maxLength={16}
            required
          />
          <button type="submit" className="home-go-button">
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
