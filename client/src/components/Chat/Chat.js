import InfoBar from "./InfoBar/InfoBar";
import Messages from "./Messages/Messages";
import Input from "./Input/Input";

import "./chat.css";

import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeRoom, getRoomMessages, sendMessage } from "../../store/rooms";
import { logout } from "../../store/users";

let socket;
const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);

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

    axios
      .delete(`${ENDPOINT}/api/rooms/${room.roomID}/${currentUser.name}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    dispatch(removeRoom());
    dispatch(logout());
    socket.disconnect();

    axios
      .delete(`${ENDPOINT}/api/rooms/${room.roomID}/${currentUser.name}`)
      .then(({ data }) => {
        console.log(data);
      })
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
