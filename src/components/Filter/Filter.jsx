import { FilterContainer } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterValue, setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();

  return (
    <FilterContainer>
      <label>
        Find contacts by name:
        <input
          name="filter"
          type="text"
          value={filterValue}
          onChange={e => dispatch(setFilter(e.target.value))}
        />
      </label>
    </FilterContainer>
  );
};
