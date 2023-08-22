import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "./redux/actions";

const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated();
  return (
    <Route {...rest}>{user.usuario ? <Component /> : <Redirect to='/login' />}</Route>
  )
}

export default UserPrivateRoute;