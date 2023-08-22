import axios from 'axios';

const backend = 'http://localhost:3001';

export const ALL_PRODUCTS = 'ALL_PRODUCTS';
export const DETAIL_PRODUCT = "DETAIL_PRODUCT";
export const EMPTY_STATE = "EMPTY_STATE";
export const FILTERS = "FILTERS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FAVORITES_USER = "FAVORITES_USER";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const INFO_USER = "INFO_USER";
export const ORDERS_USER = "ORDERS_USER";
export const GET_COMMENTS = "GET_COMMENTS";

export const allProducts = () => {
  return (dispatch) => {
    return axios.get(`${backend}/products`)
      .then(res => dispatch({ type: ALL_PRODUCTS, payload: res.data }))
      .catch(err => console.log(err));
  }
};

export const searchProducts = (payload) => {
  return (dispatch) => {
    return axios.get(`${backend}/products?name=${payload}`)
      .then(res => dispatch({ type: SEARCH_PRODUCTS, payload: res.data }))
      .catch(err => swal({
        title: "Error",
        text: "No results found",
        icon: "error",
        button: "Ok",
      }));
  }
}

export const detailProduct = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/products/${id}`)
      .then(res => dispatch({ type: DETAIL_PRODUCT, payload: res.data }))
      .catch(err => console.log(err))
  }
};

export const emptyState = () => {
  return {
    type: EMPTY_STATE
  };
};

export const registerUser = (payload) => {
  return axios.post(`${backend}/users/register`, payload)
    .then(res => { return res })
    .catch(error =>
      swal({
        title: "Error",
        text: "There is already a registered user with that email, try another one",
        icon: "error",
        button: "Ok",
      }));
}

export const loginUser = async (payload) => {
  const login = await axios.post(`${backend}/users/login`, payload);
  localStorage.setItem("user", JSON.stringify(login.data));
  return login.data;
}

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return {};
  };
};

export const filters = (payload) => {
  return {
    type: FILTERS,
    payload: payload
  };
};

export const addToFavorite = (payload) => {
  return () => {
    return axios.post(`${backend}/favorites`, payload)
      .then(res => { return res })
      .catch(error => swal({
        title: "Error",
        text: "This product is already added to favorites",
        icon: "error",
        button: "Ok",
      }));
  };
};

export const favoritesUser = (payload) => {
  return (dispatch) => {
    return axios.get(`${backend}/favorites/${payload}`)
      .then(res => dispatch({ type: FAVORITES_USER, payload: res.data }))
      .catch(err => console.log(err));
  };
};

export const deleteFavorite = (payload) => {
  console.log("action: ", payload)
  return (dispatch) => {
    return axios.delete(`${backend}/favorites/${payload}`)
      .then(res => dispatch({ type: DELETE_FAVORITE, payload }))
      .catch(err => console.log(err));
  }
};

export const infoUser = (payload) => {
  return (dispatch) => {
    return axios.get(`${backend}/users/${payload}`)
      .then(res => dispatch({ type: INFO_USER, payload: res.data }))
      .catch(err => console.log(err));
  };
};

export const updateUser = (payload) => {
  return axios.put(`${backend}/users/${payload.id}`, payload.state)
    .then(res => {
      swal("User updated succesfully", "", "success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch(err => swal({
      title: "Error",
      text: "Something went wrong, try again",
      icon: "error",
      button: "Ok",
    }));
};

export const ordersUser = (payload) => {
  return (dispatch) => {
    return axios.get(`${backend}/orders?userId=${payload}`)
      .then(res => dispatch({ type: ORDERS_USER, payload: res.data }))
      .catch(err => console.log(err));
  };
};

export const createComment = (payload) => {
  return axios.post(`${backend}/comments/${payload.idProduct}/${payload.userId}`, { description: payload.description, calification: payload.calification })
    .then(res => {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
      return swal("Comment created succesfully", "", "success")
    })
    .catch(err => console.log(err));
};

export const getComments = (payload) => {
  return (dispatch) => {
    return axios.get(`${backend}/comments/${payload}`)
      .then(res => dispatch({ type: GET_COMMENTS, payload: res.data }))
      .catch(err => null)
  }
}