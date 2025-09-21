import { io } from 'socket.io-client';

export const initSocket = () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket']
  };
  const url = import.meta.env.VITE_BACKEND_URL || 'https://mocktogether-backend.onrender.com';
  return io(url, options);
};


// it returns an instance of io 
// used to socket connection 
// there is not need of dotenv 