const { Router } = require('express');
const router = Router();
const Products = require('../controller/Products')

router.get('/', Products.findAllProducts);
router.get('/:id', Products.findOneProduct);
router.post('/', Products.createProducts);
router.put('/:id', Products.updateProduct);
router.delete('/:id', Products.deleteProduct);

module.exports = router;


