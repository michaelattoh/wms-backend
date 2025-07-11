const aiService = require('../services/aiPlanner.service');
const { AIPlan } = require('../models');

exports.createAIPlan = async (req, res) => {
  try {
    const { weddingDate, guestCount, budget, preferences } = req.body;

    const generatedPlan = aiService.generateWeddingPlan({
      weddingDate,
      guestCount,
      budget,
      preferences,
    });

    const plan = await AIPlan.create({
      userId: req.user.id,
      weddingDate,
      guestCount,
      budget,
      preferences,
      plan: generatedPlan,
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyPlans = async (req, res) => {
  const plans = await AIPlan.findAll({ where: { userId: req.user.id } });
  res.json(plans);
};
