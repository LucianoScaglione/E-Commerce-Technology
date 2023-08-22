import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';
import swal from 'sweetalert';

const Edit = ({ user }) => {
  const [state, setState] = useState({
    name: user.name,
    lastname: user.lastname,
    age: user.age,
    phone: user.phone
  })
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({id: user.id, state}));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' value={state.name} name='name' onChange={handleChange} />
        <label>Lastname</label>
        <input type='text' value={state.lastname} name='lastname' onChange={handleChange} />
        <label>Age</label>
        <input type='number' value={state.age} name='age' onChange={handleChange} />
        <label>Phone</label>
        <input type='number' value={state.phone} name='phone' onChange={handleChange} />
        <input type='submit' value='Update' />
      </form>
    </div>
  )
}

export default Edit;