import io from 'socket.io-client';

let socket = null;

const initializeSocket = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const data = JSON.parse(userData);
    const token = data.token;

    socket = io('ws://localhost:8900', {
      auth: {
        token: token
      }
    });


    console.log('Socket initialized');

  } else {
    console.log('User not logged in. Socket not initialized');
  }
};

export { socket, initializeSocket };

