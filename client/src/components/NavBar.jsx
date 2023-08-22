import { useState } from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated, searchProducts } from "./redux/actions";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = isAuthenticated();
  const [state, setState] = useState('')
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(searchProducts(state))
  }
  const signOff = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("shoppingCart");
    window.location.reload();
  }
  return (
    <div>
      <input onChange={(e) => setState(e.target.value)} value={state} placeholder="Search product" />
      <button onClick={() => handleSubmit()}>Search</button>
      {user.token ? <button onClick={() => signOff()}>Cerrar sesión</button> : <Link to='/login'>
        <button>Login</button>
      </Link>}
      {user.usuario && <Link to={`/user/${user.usuario.id}`}><p>Hello {user.usuario.name} {user.usuario.lastname}</p>  </Link>}
      <Link to='/cart'>
        <button>Cart</button>
      </Link>
      <Link to='favorites'>
        <button>Favorites</button>
      </Link>
    </div>
  );
};

export default NavBar;