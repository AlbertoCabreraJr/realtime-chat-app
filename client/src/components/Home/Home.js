import "./home.css";

import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/users";
import { useRef } from "react";

const Home = ({ setUser, user, setRoom }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const handleLogout = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const room = ref.current.value;

    try {
      const {
        data: { roomID },
      } = await axios.post("https://room-app-server.herokuapp.com/api/rooms", {
        roomName: room,
        user: user.name,
        text: "",
      });

      localStorage.setItem("room", JSON.stringify({ roomName: room, roomID }));
      setRoom({ roomName: room, roomID: roomID });
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
