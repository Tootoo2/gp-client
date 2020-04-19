import React from "react";
import moment from "moment-timezone";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    marginBottom: "4px",
  },
  messageDivider: {
    display: "flex",
    flexDirection: "column",
  },
  messageUserInfo: {
    flex: 1,
  },
}));

const Message = ({ username, message, timestamp }) => {
  const date = moment.tz(timestamp, moment.tz.guess()).format("HH.mm.ss");
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <div className={classes.messageDivider}>
        <div className={classes.messageUserInfo}>
          {username} {date}
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
