import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const useWebSocket = () => {
  const [location, setLocation] = useState('');
  const [websocket, setWebSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.1.6:3001', {});
    setWebSocket(socket);

    socket.on('connect', () => {
      console.log('Welcome Hack server');
    });

    socket.on('locationUpdate', data => {
      setLocation(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {websocket, location};
};

export default useWebSocket;
