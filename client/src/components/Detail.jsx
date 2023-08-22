import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { addToFavorite, createComment, detailProduct, emptyState, getComments, isAuthenticated } from './redux/actions';
import { CartContext } from './context/CartContext';

const Detail = () => {
  const { addItemToCart } = useContext(CartContext);
  const [state, setState] = useState({
    idProduct: '',
    userId: '',
    description: '',
    calification: 0
  })
  const history = useHistory();
  const user = isAuthenticated();
  const idProduct = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const comments = useSelector(state => state.comments);
  const addFavorite = () => {
    if (user.token) {
      dispatch(addToFavorite({ productId: product.id, userId: user.usuario.id }));
      swal("Product added to favorites", "", "success");
    } else {
      swal({
        title: "You are not a user",
        text: "If you already have an account, enter it or register.",
        icon: "warning",
        buttons: ["Register", "Login"],
        dangerMode: false,
      })
        .then((willDelete) => {
          if (willDelete) {
            history.push('/login');
          } else {
            history.push('/register');
          };
        });
    };
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment(state));
    setState({
      idProduct: '',
      userId: '',
      description: '',
      calification: 0
    })
  }
  useEffect(() => {
    dispatch(detailProduct(idProduct.id));
    dispatch(getComments(idProduct.id));
    if (user.usuario) {
      setState({
        idProduct: idProduct.id,
        userId: user.usuario.id,
        description: '',
        calification: 0
      })
    }
    return () => {
      dispatch(emptyState());
    };
  }, [dispatch]);
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt='Not found' />
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Brand: {product.brand}</p>
      <p>Categorie: {product.categorie}</p>
      <button onClick={() => addItemToCart(product)}>Add to the cart</button>
      <button onClick={() => addFavorite()}>Add to favorites</button>
      <div>
        <h2>Comments:</h2>
        {user &&
          <form onSubmit={handleSubmit}>
            <input type='text' name='description' placeholder='Create comment' onChange={handleChange} />
            <input type='number' name='calification' placeholder='Calification' onChange={handleChange} />
            <input type='submit' value='Send' />
          </form>}
        {
          comments.length ? comments.map(comment => {
            return (
              <div key={comment.id}>
                <p>{comment.User.name} {comment.User.lastname}</p>
                <p>{comment.description}</p>
                <p>{comment.calification}</p>
              </div>
            )
          }) : <p>Without comments</p>
        }
      </div>
    </div>
  );
}

export default Detail;

