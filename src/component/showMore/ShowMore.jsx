import React from "react";
import './showMore.scss';
import { useDispatch, useSelector } from "react-redux";
import { showMoreTickets } from '../../redux/getTicketsSlice'
 const ShowMore = () => {
    const dispatch = useDispatch();
    const stop = useSelector((state) => state.tickets.stop);
    const tickets = useSelector((state) => state.tickets.tickets);
    const displayCount = useSelector((state) => state.tickets.displayCount);
 
       return (
       <div>
 {(displayCount < tickets.length )&& (<div style={{
            backgroundColor: '#2196F3',
            color: 'white',
             padding: '15px',
             marginLeft: '20px',
             borderRadius: '5px',
             textAlign: 'center',
             marginTop: '20px',
             cursor: 'pointer'
        }} onClick={() => dispatch(showMoreTickets())}>
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </div>)
       }
       </div>
     )
    
}
export default ShowMore;