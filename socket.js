const { ChatMessage } = require('./models');

function initSocket(io) {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(`User ${userId} connected`);
    socket.join(userId);

    // 1. Send message
    socket.on('chat:send', async ({ receiverId, message, type = 'text' }) => {
      const saved = await ChatMessage.create({
        senderId: userId,
        receiverId,
        message,
        type,
        isRead: false,
        reactions: {},
      });

      io.to(receiverId).emit('chat:receive', saved);
    });

    // 2. Read receipts
    socket.on('chat:read', async ({ messageId }) => {
      const msg = await ChatMessage.findByPk(messageId);
      if (msg && msg.receiverId == userId) {
        msg.isRead = true;
        await msg.save();
        io.to(msg.senderId).emit('chat:read-receipt', { messageId });
      }
    });

    // 3. Typing indicators
    socket.on('chat:typing', ({ to }) => {
      io.to(to).emit('chat:typing', { from: userId });
    });

    // 4. Reactions (like emoji)
    socket.on('chat:react', async ({ messageId, emoji }) => {
      const msg = await ChatMessage.findByPk(messageId);
      if (msg) {
        const reactions = msg.reactions || {};
        reactions[userId] = emoji;
        msg.reactions = reactions;
        await msg.save();
        io.to(msg.receiverId).emit('chat:reaction', { messageId, emoji, from: userId });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected`);
    });
  });
}

module.exports = initSocket;
