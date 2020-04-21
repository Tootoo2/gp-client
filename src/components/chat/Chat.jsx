import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { APIPREFIX } from "../../config.js";
import socket from "socket.io-client";

import Message from "./Message.jsx";
import SendMessage from "./SendMessage";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    flex: 1,
    minHeight: "0px",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    // scrollbarWidth: "none",
  },

  reverseColumn: {
    display: "flex",
    flexDirection: "column-reverse",
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const [socketMessage, setSocketMessage] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const io = socket(`${APIPREFIX}`);
    io.on("postMessage", (data) => {
      setSocketMessage((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, socketMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  console.log("rerender");

  const RenderMessages = () => {
    if (!messages.messages) return null;
    return messages.messages.map((mess) => (
      <Message
        key={mess.timestamp}
        username={mess.username}
        message={mess.message}
        timestamp={mess.timestamp}
      />
    ));
  };

  const RenderSocketMessages = () => {
    return socketMessage.map((mess) => (
      <Message
        key={mess.timestamp}
        username={mess.username}
        message={mess.message}
        timestamp={mess.timestamp}
      />
    ));
  };

  return (
    <Container className={classes.chatContainer} maxWidth="lg">
      <div className={classes.messages}>
        <div className={classes.reverseColumn}>
          <div>
            <RenderSocketMessages />
          </div>
          <div className={classes.reverseColumn}>
            <RenderMessages />
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <SendMessage />
    </Container>
  );
};

export default Chat;
