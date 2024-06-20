import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import "./chat.scss";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Mesaages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import checkOut from "../../Icons/checkout.svg";
let socket;

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const endPoint = "https://chatbuddy-2lhx.onrender.com";
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(endPoint, { transports: ["websocket"] });

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, ({ error }) => {
      if (error) {
        alert(`${error} Please go back and choose a different name`);
      }
    });
    return () => {
      // socket.emit("disconnect");
      socket.disconnect();
      socket.off();
    };
  }, [endPoint, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="outinContainer">
        <div className="blackdiv">
          {/* <img src="./chat.svg" alt="" /> */}
          {/* <a href="/">
            <img src={checkOut} alt="" className="svvg" />
          </a> */}
        </div>
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <TextContainer users={users} room={room} />
      </div>
    </div>
  );
}

export default Chat;
