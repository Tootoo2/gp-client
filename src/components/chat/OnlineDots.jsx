import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const OnlineDots = ({ username }) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);

  useEffect(() => {
    console.log(onlineUsers.users);
  }, [onlineUsers]);

  const OnlineOrOffline = () => {
    if (onlineUsers.users) {
      return onlineUsers.users.map((user) =>
        user.username === username ? <p>green</p> : <p>red</p>
      );
    }
    return null;
  };

  return (
    <div>
      <OnlineOrOffline />
    </div>
  );
};

export default OnlineDots;
