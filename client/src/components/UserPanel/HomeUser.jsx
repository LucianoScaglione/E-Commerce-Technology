import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Information from './Information';
import ShoppingCart from '../ShoppingCart';
import Favorites from '../Favorites';
import { useParams } from 'react-router-dom';
import { infoUser } from '../redux/actions';
import Edit from './Edit';
import Shopping from './Shopping';

const HomeUser = () => {
  const [state, setState] = useState('Home');
  const id = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(infoUser(id.id));
  }, [dispatch]);
  return (
    <div>
      <div>
        <p onClick={() => setState('Home')}>Home</p>
        <p onClick={() => setState('Edit')}>Edit</p>
        <p onClick={() => setState('Shopping')}>Shopping</p>
        <p onClick={() => setState('Favorites')}>Favorites</p>
        <p onClick={() => setState('Cart')}>Cart</p>
      </div>
      <div>
        {state === 'Home' && <Information user={user} />}
        {state === 'Edit' && <Edit user={user} />}
        {state === 'Shopping' && <Shopping user={user} />}
        {state === 'Favorites' && <Favorites />}
        {state === 'Cart' && <ShoppingCart />}
      </div>
    </div>
  )
}

export default HomeUser;
