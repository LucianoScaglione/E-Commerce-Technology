import './App.css';
import Detail from './components/Detail';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import Register from './components/Register';
import Login from './components/Login';
import { CartProvider } from './components/context/CartContext';
import Favorites from './components/Favorites';
import UserPrivateRoute from './components/UserPrivateRoute';
import HomeUser from './components/UserPanel/HomeUser';

function App() {
  return (
    <CartProvider>
      <Route exact path='/' component={Home} />
      <Route exact path='/products/:id' component={Detail} />
      <Route exact path='/cart' component={ShoppingCart} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <UserPrivateRoute exact path='/favorites' component={Favorites} />
      <UserPrivateRoute exact path='/user/:id' component={HomeUser} />
    </CartProvider>
  )
}

export default App;
