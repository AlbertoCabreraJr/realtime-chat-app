import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

import { useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [room, setRoom] = useState(JSON.parse(localStorage.getItem("room")));

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
