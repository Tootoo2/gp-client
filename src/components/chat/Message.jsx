import React from "react";
import moment from "moment-timezone";
import { makeStyles, Typography } from "@material-ui/core";
import Linkify from "linkifyjs/react";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    marginBottom: "4px",
  },
  messageDivider: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  messageUserInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  message: {
    margin: "0px",
  },
}));

const Message = ({ username, message, timestamp }) => {
  const date = moment.tz(timestamp, moment.tz.guess()).format("HH.mm.ss");
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <div className={classes.messageDivider}>
        <div className={classes.messageUserInfo}>
          <Typography variant="subtitle2">{username}</Typography>
          <Typography variant="subtitle2" color="secondary">
            {`<${date}>`}
          </Typography>
        </div>
        <Linkify className={classes.message} tagName="p">
          {message}
        </Linkify>
      </div>
    </div>
  );
};

export default Message;
