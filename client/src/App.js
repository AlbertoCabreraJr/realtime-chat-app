import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const [room, setRoom] = useState(JSON.parse(localStorage.getItem("room")));

  let setUser;
  let room;
  let setRoom;
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   user = useSelector((state) => state.user);
  // }, []);

  return (
    <>
      {user && room ? (
        <Chat user={user} room={room} setUser={setUser} setRoom={setRoom} />
      ) : user ? (
        <Home setUser={setUser} user={user} setRoom={setRoom} />
      ) : (
        <Auth setUser={setUser} />
      )}
    </>
  );
}

export default App;
