import socket from "socket.io-client";
import { APIPREFIX } from "../config";
import { SOCKET_CONNECT } from "./types";

export const initSocketConnection = () => (dispatch) => {
  const io = socket(APIPREFIX);
  dispatch({
    type: SOCKET_CONNECT,
    payload: io,
  });
};
