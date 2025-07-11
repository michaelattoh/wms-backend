const { ChatMessage } = require('../models');

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
