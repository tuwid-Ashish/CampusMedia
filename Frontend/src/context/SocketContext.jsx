 /* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react"
import socketio from "socket.io-client"
import { LocalStorage, CookieStorage } from "../utils"

// Function to establish a socket connection with authorization token
const getSocket = () => {
  const token = CookieStorage.get("acess-token") || LocalStorage.get("access_token") // Retrieve jwt token from local storage or cookie
 console.log("token", token);
  // Create a socket connection with the provided URI and authentication
  return socketio(import.meta.env.VITE_SOCKET_URI, {
    withCredentials: true,
    auth: { token }
  })
}

// Create a context to hold the socket instance
const SocketContext = createContext({
  socket: null
})

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext)

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider = ({ children }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState(null)

  // Set up the socket connection when the component mounts
  useEffect(() => {
    setSocket(getSocket())
  }, [])
  console.log("this is my socket",socket);
  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket }
