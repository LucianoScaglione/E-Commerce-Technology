const { Router } = require('express');
const router = Router();
const Orders = require('../controller/Orders')

router.get('/', Orders.findAllOrders);
router.get('/:id', Orders.findOneOrder);
router.post('/', Orders.createOrder);
router.put('/:id', Orders.updateOrder);
router.delete('/:id', Orders.deleteOrder);

module.exports = router;