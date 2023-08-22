const { Router } = require('express');
const router = Router();
const Favorites = require('../controller/Favorites')

router.get('/:id', Favorites.findAllFavoritesUser);
router.post('/', Favorites.createFavorite);
router.delete('/:id', Favorites.deleteFavorite);

module.exports = router;