import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home.jsx";
import Chat from "./components/chat/Chat.jsx";
import { useSelector, useDispatch } from "react-redux";
import MyAppBar from "./components/navigation/MyAppBar";
import MyDrawer from "./components/navigation/MyDrawer";
import { fetchUser, fetchAllUsers, fetchOnlineStatus } from "./actions";
import { initSocketConnection } from "./actions/socketActions";
import { SOCKET_CLOSE } from "./actions/types";

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const io = useSelector((state) => state.io.socket);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    authenticated && dispatch(fetchUser());
    authenticated && dispatch(initSocketConnection());
    authenticated && dispatch(fetchAllUsers());
    return () => {
      dispatch({ type: SOCKET_CLOSE });
    };
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (io && user._id) {
      io.emit("userOnline", user);
      io.on("onlineUsers", (users) => {
        dispatch(fetchOnlineStatus(users))
      });
    }
  }, [io, user, dispatch]);

  const AuthorizedRoutes = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    return (
      <>
        <MyAppBar toggleDrawer={toggleDrawer} />
        <MyDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}  />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/chat" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  };

  const UnAuthorizedRoutes = () => {
    return <>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Redirect to="/signin" />
      </Switch>
    </>;
  };

  return (
    <div className="App">
      {authenticated ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
    </div>
  );
}

export default App;
