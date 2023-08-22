import { useState } from 'react'
import { filters } from './redux/actions';
import { useDispatch } from 'react-redux';

const Filters = ({ setOrder, brands }) => {
  const [state, setState] = useState({
    categorie: '',
    brand: '',
    priceMin: 0,
    priceMax: 200000,
    range: ''
  });
  let brand = Array.from(new Set(brands));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = () => {
    dispatch(filters(state));
    // setOrder(1);
  };
  return (
    <div>
      <label>Categorie</label>
      <select name="categorie" onChange={handleChange}>
        <option hidden>Select a categorie</option>
        <option value="">All categories</option>
        <option value="Keyboards">Keyboards</option>
        <option value="Monitors">Monitors</option>
        <option value="Mouses">Mouses</option>
        <option value="Laptops">Laptops</option>
        <option value="Headsets">Headsets</option>
      </select>
      <label>Brand</label>
      <select name="brand" onChange={handleChange}>
        <option hidden>Select a brand</option>
        <option value="">All brands</option>
        {
          brand.sort((a, b) => {
            if (a > b) {
              return 1
            }
            if (a < b) {
              return -1
            }
            return 0
          }).map(b => (
            <option key={b} value={b}>{b}</option>
          ))
        }
      </select>
      <label>From</label>
      <input type='number' name='priceMin' onChange={handleChange} placeholder='Price min' />
      <label>To</label>
      <input type='number' name='priceMax' onChange={handleChange} placeholder='Price max' />
      <button onClick={() => handleSubmit()}>Aplicar filtro</button>
    </div>
  );
};

export default Filters;