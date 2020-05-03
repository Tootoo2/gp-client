import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  online: {
    height: '6px',
    width: '6px',
    borderRadius: '50%',
    background: 'green',
    marginRight: '2px',
  },
  offline: {
    height: '6px',
    width: '6px',
    borderRadius: '50%',
    background: 'red',
    marginRight: '2px',
  },
}));

const OnlineDots = ({ username }) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const classes = useStyles();

  useEffect(() => {}, [onlineUsers]);

  const OnlineOrOffline = () => {
    if (onlineUsers.users) {
      const test = onlineUsers.users.filter(
        (user) => user.username === username
      );
      if (test.length > 0) {
        return <div className={classes.online} />;
      }
      return <div className={classes.offline} />;
    }
    return null;
  };

  return <OnlineOrOffline />;
};

export default OnlineDots;
