import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, isAuthenticated } from "./redux/actions";
import { Link } from "react-router-dom";
import style from './styles/Home.module.css';
import Pagination from "./Pagination";
import NavBar from "./NavBar";
import Filters from "./Filters";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const productsCopy = useSelector(state => state.productsCopy);
  const user = isAuthenticated();
  const [order, setOrder] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const indexLatestProduct = currentPage * 10;
  const indexFirstProduct = indexLatestProduct - 10;
  const showProducts = products.slice(indexFirstProduct, indexLatestProduct);
  const paginated = (currentPageNumber) => {
    setCurrentPage(currentPageNumber);
  };
  useEffect(() => {
    dispatch(allProducts());
    if (!user) {
      return {};
    };
  }, [dispatch]);
  return (
    <div>
      <div>
        <NavBar />
        <Pagination
          products={products.length}
          paginated={paginated}
        />
        <Filters
          setOrder={setOrder}
          brands={productsCopy.map(p => p.brand)} />
        {products.length && showProducts.map(p => {
          return (
            <div key={p.id}>
              <Link to={`products/${p.id}`}>
                <h1>{p.name}</h1>
                <img src={p.image} alt='Not found' />
              </Link>
              <p>${p.price}</p>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Home;