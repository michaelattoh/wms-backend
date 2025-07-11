const http = require('http');
const socketIo = require('socket.io');
const initSocket = require('./socket');

const app = require('./app'); // your Express app
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});

initSocket(io);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
