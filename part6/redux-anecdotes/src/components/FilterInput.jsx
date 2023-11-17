import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterSlice';

const FilterInput = () => {
  const dispatch = useDispatch();

  return (
    <>
      <p>Filter</p>
      <div>
        <input
          type="text"
          name="filter"
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
      </div>
    </>
  );
};

export default FilterInput;
