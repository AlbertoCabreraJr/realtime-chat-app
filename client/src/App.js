import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);

  return <>{user && room ? <Chat /> : user ? <Home /> : <Auth />}</>;
}

export default App;
