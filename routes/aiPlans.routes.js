const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const controller = require('../controllers/aiPlans.controller');

// Auth assumed
router.post('/', verifyToken, controller.createAIPlan);
router.get('/', verifyToken, controller.getMyPlans);

module.exports = router;
