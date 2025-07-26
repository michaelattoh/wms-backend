const express = require('express');
const router = express.Router();
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

// POST /api/subscription-plans
router.post('/', subscriptionPlanController.createSubscriptionPlan);
// get all
router.get('/', subscriptionPlanController.getAllSubscriptionPlans);
//delete subscriptio
router.delete('/:id', subscriptionPlanController.deleteSubscriptionPlan);
// edit or update
router.put('/:id', subscriptionPlanController.updateSubscriptionPlan);



module.exports = router;
