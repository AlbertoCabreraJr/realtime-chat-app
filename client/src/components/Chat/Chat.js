import InfoBar from "./InfoBar/InfoBar";
import Messages from "./Messages/Messages";
import Input from "./Input/Input";

import "./chat.css";

import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";

let socket;
const ENDPOINT = "https://room-app-server.herokuapp.com";

const Chat = ({ user: currentUser, room, setUser, setRoom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);

    axios
      .get(`${ENDPOINT}/api/rooms/${room.roomID}`)
      .then(({ data }) => {
        if (data.length) setMessages([...data]);
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

      axios
        .post(`${ENDPOINT}/api/rooms`, {
          roomName: room.roomName,
          user: currentUser.name,
          text: message,
        })
        .then(() => {})
        .catch((err) => console.log(err));
    }

    setMessage("");
  };

  const goBackHandler = (e) => {
    e.preventDefault();

    setRoom(null);
    localStorage.removeItem("room");
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

    setRoom(null);
    setUser(null);
    localStorage.removeItem("room");
    localStorage.removeItem("profile");
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
      <Messages messages={messages} currentUser={currentUser.name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
};

export default Chat;
