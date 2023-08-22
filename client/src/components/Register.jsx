import { useState } from 'react';
import { registerUser } from './redux/actions';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    lastname: '',
    age: '',
    email: '',
    password: '',
    phone: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(state)
    swal("User registred succesfully", "", "success")
    history.push('/login')
    setState({
      name: '',
      lastname: '',
      age: '',
      email: '',
      password: '',
      phone: ''
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input type='text' name='name' value={state.name} onChange={handleChange} />
        <label>Enter your lastname</label>
        <input type='text' name='lastname' value={state.lastname} onChange={handleChange} />
        <label>Enter your age</label>
        <input type='number' name='age' value={state.age} onChange={handleChange} />
        <label>Enter your email</label>
        <input type='email' name='email' value={state.email} onChange={handleChange} />
        <label>Enter your password</label>
        <input type='password' name='password' value={state.password} onChange={handleChange} />
        <label>Enter your phone</label>
        <input type='number' name='phone' value={state.phone} onChange={handleChange} />
        <input type='submit' value='Register me' />
      </form>
    </div>
  );
};

export default Register;