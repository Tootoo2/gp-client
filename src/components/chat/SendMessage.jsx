import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Picker, Emoji } from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../actions/index";

const useStyles = makeStyles((theme) => ({
  send: {
    display: "flex",
    marginBottom: "24px",
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

const SendMessage = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

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
    setNewMessage((prev) => prev + e.native);
    setIsEmojiOpen(false);
  };

  return (
    <>
      {isEmojiOpen && (
        <div className={classes.backdrop} onClick={() => toggleEmoji()} />
      )}
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
        <Button
          variant="contained"
          color="secondary"
          style={{ boxShadow: "none", marginLeft: "4px" }}
          onClick={handleMessage}
        >
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
    </>
  );
};

export default SendMessage;
