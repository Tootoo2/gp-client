import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";

import socket from "socket.io-client";

import Message from "./Message.jsx";

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
  send: {
    display: "flex",
    justifyContent: "space-around",
    margin: "24px",
  },
  reverseColumn: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  text: {
    width: "100%",
  },
  backdrop: {
    zIndex: 5,
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    position: "fixed",
    background: "rgba(0, 0, 0, .2)",
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const username = useSelector((state) => state.user.username);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState([]);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const io = socket("http://localhost:3090");
    io.on("postMessage", (data) => {
      setSocketMessage((prev) => [...prev, data]);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, socketMessage]);

  const handleMessage = () => {
    dispatch(sendMessage(username, newMessage));
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && handleMessage();
  };

  const toggleEmoji = () => {
    setIsEmojiOpen((prev) => !prev);
  };

  const selectEmoji = (e) => {
    console.log(e.id);
    setNewMessage((prev) => prev + e.native);
    setIsEmojiOpen(false);
  };

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
      {isEmojiOpen && (
        <div className={classes.backdrop} onClick={() => toggleEmoji()} />
      )}
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

      <div className={classes.send}>
        <TextField
          className={classes.text}
          variant="outlined"
          placeholder="Compose your message and hit ENTER to send"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Emoji emoji="smile" size={24} onClick={() => toggleEmoji()} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleMessage}>
          Send
        </Button>
        {isEmojiOpen && (
          <Picker
            native={true}
            style={{
              zIndex: 10,
              position: "absolute",
              bottom: "20px",
              right: "20px",
            }}
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={selectEmoji}
          />
        )}
      </div>
    </Container>
  );
};

export default Chat;
