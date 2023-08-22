const { Router } = require('express');
const router = Router();
const Comments = require('../controller/Comments.js')

router.get('/:id', Comments.getCommentsProduct);
router.post('/:idProduct/:userId', Comments.createComments);

module.exports = router;