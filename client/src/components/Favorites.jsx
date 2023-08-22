import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritesUser, isAuthenticated, deleteFavorite } from '../components/redux/actions';
import { CartContext } from './context/CartContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Favorites = () => {
  const { addItemToCart } = useContext(CartContext);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const user = isAuthenticated();
  useEffect(() => {
    !favorites.length && dispatch(favoritesUser(user.usuario.id))
  }, [favorites, user])
  return (
    <div>
      {
        favorites.length ? favorites.map(favorite => {
          console.log("favoritos: ", favorite.id);
          return (
            <div key={favorite.id}>
              <button onClick={() => dispatch(deleteFavorite(favorite.id))}>X</button>
              <Link to={`/products/${favorite.Products.map(p => p.id)}`}>
                <h1>{favorite.Products.map(p => p.name)}</h1>
                <img src={favorite.Products.map(p => p.image)} alt='Not found' />
              </Link>
              <p>${favorite.Products.map(p => p.price)}</p>
              <button onClick={() => addItemToCart(favorite.Products.map(p => p)[0])}>Add to cart</button>
            </div>
          )
        }) : <p>You haven't favorites products added.</p>
      }
    </div>
  )
}

export default Favorites
