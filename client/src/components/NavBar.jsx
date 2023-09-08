import { useState } from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated, searchProducts } from "./redux/actions";
import { Link } from 'react-router-dom';
import style from './styles/NavBar.module.css'

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
    <div className={style.container}>
      <div className={style.div1}>
        <h1>Technology</h1>
        <Link to='/cart'>
          <img src="https://img.icons8.com/fluency-systems-regular/48/fast-cart.png" alt="cart" title="Cart" />
        </Link>
        <Link to='favorites'>
          <img src="https://img.icons8.com/fluency-systems-regular/48/add-to-favorites.png" alt="favorites" title="Favorites" />
        </Link>
      </div>
      <div className={style.div2}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
        </svg>
        <input onChange={(e) => setState(e.target.value)} value={state} placeholder="Search product" />
        <button onClick={() => handleSubmit()}>Search</button>
      </div>
      <div className={style.div3}>
        {user.usuario &&
          <Link to={`/user/${user.usuario.id}`}>
            <div className={style.box}>
              <img className={style.div3Img} src="https://img.icons8.com/fluency-systems-regular/48/user--v1.png" alt="user panel" title='User panel' />
              <p>Hello {user.usuario.name} {user.usuario.lastname}!</p>
            </div>
          </Link>}
        {user.token ? <button className={style.logout} onClick={() => signOff()}>Logout</button> : <Link to='/login'><button className={style.login}>Login</button>
        </Link>}
      </div>
    </div >
  );
};

export default NavBar;