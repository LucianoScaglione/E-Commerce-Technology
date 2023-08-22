import { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from "./redux/actions";
import swal from 'sweetalert';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(state);
      history.push('/')
      window.location.reload()
    } catch (error) {
      return swal({
        title: "Error",
        text: "Incorrect email or password",
        icon: "error",
        button: "Ok",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your mail</label>
        <input type='email' name='email' value={state.email} onChange={handleChange} />
        <label>Enter your password</label>
        <input type='password' name='password' value={state.password} onChange={handleChange} />
        <p>You do not have an account? Sign up <Link to='/register'>here</Link>.</p>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;