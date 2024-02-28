import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_PLAN, SOCKET_URL } from "../config/config";

const SocketContext = createContext();

export const useSocket = () => {
  
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Replace 'http://localhost:3001' with your socket server endpoint
    // ws://api.nfldraftfanatics.com/
    // https://api.nfldraftfanatics.com/
    const newSocket = io(`wss://api.nfldraftfanatics.com/`);
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
