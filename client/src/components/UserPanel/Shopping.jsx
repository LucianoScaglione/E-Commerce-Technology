import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersUser } from '../redux/actions';

const Shopping = ({ user }) => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.ordersUser);
  useEffect(() => {
    dispatch(ordersUser(user.id))
  }, [dispatch]);
  console.log("orders: ", orders);
  return (
    <div>
      {
        orders.length ? orders.map(order => {
          return (
            <div>
              <div>
                <p>State: {order.state}</p>
                <p>Total price: ${order.priceOrder}</p>
                <p>Order date: {order.date}</p>
              </div>
              <div>
                <h3>Products:</h3>
                {
                  order.Products.map(p => {
                    return (
                      <div>
                        <p>{p.name}</p>
                        <p>{p.categorie}</p>
                        <p>{p.brand}</p>
                        <img src={p.image} alt='Not found' />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        ) : <p>You have no registered orders</p>
      }
    </div>
  )
}

export default Shopping
