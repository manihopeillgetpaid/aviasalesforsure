import React from "react";
import './flightFilter.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from "../../redux/sortSlice";

const FlightFilter = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.sort.sortBy);
    const handleSortChange = (type) => {
        dispatch(setSortBy(type))
    }
    return(
       <ul>
        <li className={sortBy === 'cheap' ? 'active' : null} onClick={() => handleSortChange('cheap')}>САМЫЙ ДЕШЕВЫЙ</li>
        <li className={sortBy === 'fast' ? 'active' : null} onClick={() => handleSortChange('fast')}>САМЫЙ БЫСТРЫЙ</li>
        <li className={sortBy === 'optimal' ? 'active' : null}  onClick={() => handleSortChange('optimal')}>ОПТИМАЛЬНЫЙ</li>
       </ul>
    )
}
export default FlightFilter;