const { Router } = require("express");
const router = Router();
const Payments = require('../controller/Payments');

router.post('/', Payments.createInformationOrderWithPayment);
router.get('/success/:id', Payments.orderSuccess);
router.get('/pending/:id', Payments.orderPending);
router.get('/failure/:id', Payments.orderFailure);

module.exports = router;