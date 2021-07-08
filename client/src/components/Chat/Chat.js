import InfoBar from "./InfoBar/InfoBar";
import Messages from "./Messages/Messages";
import Input from "./Input/Input";

import "./chat.css";

import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeRoom,
  getRoomMessages,
  sendMessage,
  deleteRoom,
} from "../../store/rooms";
import { logout } from "../../store/users";
import { URL } from "../../store/api";

let socket;

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(URL);

    getRoomMessages(room)
      .then((messages) => {
        if (messages.length) setMessages([...messages]);
        socket.emit("join", {
          roomName: room.roomName,
          user: currentUser,
          text: "",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    socket.on("send message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("chat message", {
        roomName: room.roomName,
        user: currentUser.name,
        text: message,
      });

      sendMessage({ room, user: currentUser, text: message });
    }

    setMessage("");
  };

  const goBackHandler = (e) => {
    e.preventDefault();

    dispatch(removeRoom());

    socket.disconnect();

    deleteRoom({ room, user: currentUser })
      .then()
      .catch((err) => console.log(err));
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    dispatch(removeRoom());
    dispatch(logout());
    socket.disconnect();

    deleteRoom({ room, user: currentUser })
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="chat-container">
      <InfoBar
        goBackHandler={goBackHandler}
        logoutHandler={logoutHandler}
        room={room}
      />
      <Messages messages={messages} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
};

export default Chat;
