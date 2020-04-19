import {
  AUTH_USER,
  AUTH_FAIL,
  USER_SIGNOUT,
  FETCH_USER,
  FETCH_CHAT,
} from "./types";

export const signup = (username, password) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    return dispatch({ type: AUTH_FAIL, payload: data.error });
  }
  const data = await response.json();
  dispatch({
    type: AUTH_USER,
    payload: data.token,
  });
  localStorage.setItem("token", data.token);
  dispatch(fetchUser());
};
export const signin = (username, password) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/signin", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return dispatch({ type: AUTH_FAIL, payload: "Invalid credentials" });
  }
  const data = await response.json();
  dispatch({
    type: AUTH_USER,
    payload: data.token,
  });
  localStorage.setItem("token", data.token);
  dispatch(fetchUser());
};

export const signout = () => {
  localStorage.removeItem("token");
  return { type: USER_SIGNOUT };
};

export const fetchUser = () => async (dispatch) => {
  const response = await fetch("http://localhost:3090/user", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    console.log("bad fetch user");
    return;
  }
  const data = await response.json();
  dispatch({
    type: FETCH_USER,
    payload: data,
  });
};

export const fetchMessages = () => async (dispatch) => {
  const response = await fetch("http://localhost:3090/chat", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    console.log("bad message");
    return;
  }

  const data = await response.json();

  dispatch({
    type: FETCH_CHAT,
    payload: data,
  });
};

export const sendMessage = (username, message) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/message", {
    method: "POST",
    body: JSON.stringify({ username, message }),
  });

  if (!response.ok) {
    console.log("failed sending msg");
    return;
  }
  // temp to see if it works
};
