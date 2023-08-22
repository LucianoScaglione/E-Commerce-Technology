import swal from 'sweetalert';

const initialState = {
  products: [],
  productsCopy: [],
  product: [],
  favorites: [],
  user: [],
  ordersUser: [],
  comments: []
};

import { ALL_PRODUCTS, SEARCH_PRODUCTS, DETAIL_PRODUCT, EMPTY_STATE, FILTERS, FAVORITES_USER, DELETE_FAVORITE, INFO_USER, ORDERS_USER, GET_COMMENTS } from './actions';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        products: payload,
        productsCopy: payload
      }
    };
    case SEARCH_PRODUCTS: {
      return {
        ...state,
        products: payload
      }
    }
    case DETAIL_PRODUCT: {
      return {
        ...state,
        product: payload
      }
    };
    case EMPTY_STATE: {
      return {
        ...state,
        product: [],
        comments: []
      }
    };
    case FILTERS: {
      const render = () => {
        const { categorie, brand, priceMin, priceMax } = payload
        const priceMaxIs = priceMax ? priceMax : 200000;
        const filterProducts = categorie && brand ? state.productsCopy.filter(p => p.categorie === categorie && p.brand === brand) : categorie && !brand ? state.productsCopy.filter(p => p.categorie === categorie) : !categorie && brand ? state.productsCopy.filter(p => p.brand === brand) : !categorie && !brand && state.productsCopy;
        if (!filterProducts.length) {
          swal({
            title: "Error",
            text: "No results found",
            icon: "error",
            button: "Ok",
          });
          return state.products;
        }
        if (priceMin || priceMax) {
          const results = filterProducts.filter(p => p.price >= priceMin && p.price <= priceMaxIs)
          if (!results.length) {
            swal({
              title: "Error",
              text: "No results found",
              icon: "error",
              button: "Ok",
            });
            return state.products;
          } else {
            return results;
          };
        };
        return filterProducts;
      };
      let result = render()
      return {
        ...state,
        products: result.sort((a, b) => {
          if (a.price > b.price) { return 1 }
          if (a.price < b.price) { return -1 }
          else return 0
        })
      };
    };
    case FAVORITES_USER: {
      return {
        ...state,
        favorites: payload
      }
    }
    case DELETE_FAVORITE: {
      console.log("reducer le llega: ", payload);
      const filterState = state.favorites.filter(f => f.id !== payload);
      console.log("filterState reducer: ", filterState);
      return {
        ...state,
        favorites: filterState
      }
    }
    case INFO_USER: {
      return {
        ...state,
        user: payload
      }
    }
    case ORDERS_USER: {
      return {
        ...state,
        ordersUser: payload
      }
    }
    case GET_COMMENTS: {
      console.log(payload)
      return {
        ...state,
        comments: payload
      }
    }
    default: return state;
  }
}

export default reducer;