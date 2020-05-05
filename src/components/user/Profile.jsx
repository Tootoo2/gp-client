import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const myUser = useSelector((state) => state.user);

  console.log(id);

  useEffect(() => {
    myUser._id && setLoading(false);
  }, [myUser._id]);

  const ProfileToRender = () => {
    if (!id) {
      return loading ? null : <p>{myUser.username}</p>;
    }
    else{
      return <div>Render someone elses user</div>
    }
  };

  return <ProfileToRender />;
};

export default Profile;
