export const handleConnect = (socket) => {
  socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
    // Handle the connect event logic here
  });
};