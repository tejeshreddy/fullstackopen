import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const FilterInput = () => {
  const dispatch = useDispatch();

  const setFilter = (event) => {
    dispatch(filterChange(event.target.value));
  };

  return (
    <>
      <p>Filter</p>
      <div>
        <input type="text" name="filter" onChange={setFilter} />
      </div>
    </>
  );
};

export default FilterInput;
