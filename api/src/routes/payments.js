const { Router } = require('express');
const router = Router();
const Payments = require('../controller/Payments');

router.post('/create-order', Payments.createOrderMP);
router.get('/success');
router.get('/failure');
router.get('/pending');

module.exports = router;