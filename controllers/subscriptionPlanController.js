const { SubscriptionPlan } = require('../models');

exports.createSubscriptionPlan = async (req, res) => {
  try {
    const { name, amount } = req.body;

    // Basic validation
    if (!name || !amount) {
      return res.status(400).json({ message: 'Name and amount are required.' });
    }

    // Create new subscription plan
    const plan = await SubscriptionPlan.create({
      name: name,
      amount: amount,
    });

    return res.status(201).json({
      message: 'Subscription plan created successfully.',
      data: plan,
    });
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//get all subscription plan
exports.getAllSubscriptionPlans = async (req, res) => {
    try {
      const plans = await SubscriptionPlan.findAll({
        order: [['createdAt', 'DESC']]
      });
  
      return res.status(200).json({
        message: 'Subscription plans fetched successfully.',
        data: plans
      });
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };


  // Delete subscription plan by ID
exports.deleteSubscriptionPlan = async (req, res) => {
    try {
      const { id } = req.params;
  
      const plan = await SubscriptionPlan.findByPk(id);
      if (!plan) {
        return res.status(404).json({ message: 'Subscription plan not found.' });
      }
  
      await plan.destroy();
  
      return res.status(200).json({ message: 'Subscription plan deleted successfully.' });
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };


// Update subscription plan by ID
exports.updateSubscriptionPlan = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, amount } = req.body;
  
      const plan = await SubscriptionPlan.findByPk(id);
      if (!plan) {
        return res.status(404).json({ message: 'Subscription plan not found.' });
      }
  
      // Update fields
      plan.name = name || plan.name;
      plan.amount = amount || plan.amount;
  
      await plan.save();
  
      return res.status(200).json({
        message: 'Subscription plan updated successfully.',
        data: plan
      });
    } catch (error) {
      console.error('Error updating subscription plan:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  
  
  