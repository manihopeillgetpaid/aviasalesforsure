import React, { useEffect } from "react";
import { parseISO, format, addMinutes } from 'date-fns';
import './ticket.scss';
import { useDispatch, useSelector } from "react-redux";
import { getSearchId } from "../../redux/searchIdFunc";
import { setSearchId } from '../../redux/searchIdSlice';
import { getTickets } from "../../redux/getTickets";
import { Spin } from 'antd';
import { setLoader } from "../../redux/loaderSlice";

const Ticket = () => {
    const dispatch = useDispatch();
    const searchId = useSelector((state) => state.search.searchId);
    const tickets = useSelector((state) => state.tickets.tickets);
    const displayCount = useSelector((state) => state.tickets.displayCount);
    const loading = useSelector((state) => state.loader.loading);
    const filters = useSelector((state) => state.filters);
    
    const sorted = useSelector((state) => state.sort.sortBy);
    useEffect(() => {
        // Fetch the searchId and set it in the Redux store
        dispatch(setLoader(true));
        dispatch(getSearchId()).then((result) => {
            if (result.payload) {
                dispatch(setSearchId(result.payload.searchId));
            }
            dispatch(setLoader(false));
        });
    }, [dispatch]);
    
    useEffect(() => {
        // Start fetching tickets when searchId is available
        if (searchId) {
            dispatch(setLoader(true));
            dispatch(getTickets(searchId)).finally(() => {
                dispatch(setLoader(false));
            });
        }
    }, [dispatch, searchId]);
    useEffect(() => {
        // This useEffect ensures the component re-renders when tickets are updated
        // No need to dispatch anything here; it just reacts to changes in the Redux store
    }, [tickets]); // Add `tickets` as a dependency

    
    const filteredTickets = tickets.filter(ticket => {

        return (
            (filters.noTransfers && ticket.segments.every(segment => segment.stops.length === 0)) ||
            (filters.oneTransfer && ticket.segments.every(segment => segment.stops.length === 1)) ||
            (filters.twoTransfers && ticket.segments.every(segment => segment.stops.length === 2)) ||
            (filters.threeTransfers && ticket.segments.every(segment => segment.stops.length === 3))
        );
    });
    

    const sortedTickets = [...filteredTickets].sort((a,b) => {
        if(sorted === 'cheap'){
            return a.price - b.price
        }
        if(sorted === 'fast'){
            const durationA = a.segments[0].duration;
            const durationB = b.segments[1].duration;
            return durationA - durationB
        }
        if(sorted === 'optimal'){
            const durationA = a.segments[0].duration;
            const durationB = b.segments[1].duration;
            return (a.price + durationA) - (b.price + durationB)
        }
    })

    const formatDateAt = (date) => {
        const data = parseISO(date);
        return format(data, 'HH:mm')
    }
    const formatDateTo = (date, duration) => {
        const data = parseISO(date);
        const arrival = addMinutes(data, duration);
        return format(arrival, 'HH:mm')
    }
    const formatDuration = (duration) => {
        const hours = Math.floor(duration/60);
        const minutes = duration % 60;
        return `${hours}ч ${minutes}м`;
    }
    const setTransfer = (stop) => {
  
        if(stop.length === 0) {
            return '0 ПЕРЕСАДОК'}
        else if(stop.length === 1) {
            return '1 ПЕРЕСАДКА'}
        else 
        {return `${stop.length} ПЕРЕСАДКИ`};
       
    }

    if (loading && tickets.length === 0) {
        return <Spin size="large" style={{ width: '100%', marginTop: '20px' }} />;
    }


   return  sortedTickets.slice(0,displayCount).map((ticket,index) => {
     return(
<div className="container" key={index}>

<header>
    <p>{ticket.price} P</p>
    
    <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="" />
</header>
<div className="inner">
    <div>
        <p>{ticket.segments[0].origin} - {ticket.segments[0].destination}</p>
        <p>{formatDateAt(ticket.segments[0].date)} - {formatDateTo(ticket.segments[0].date, ticket.segments[0].duration)}</p>
    </div>
    <div>
        <p>В ПУТИ</p>
        <p>{formatDuration(ticket.segments[0].duration)}</p>
    </div>
    <div>
        <p>{setTransfer(ticket.segments[0].stops)}</p>
        <p>{ ticket.segments[0].stops.join(',')}</p>
    </div>
</div>
<div className="inner">
<div>
        <p>{ticket.segments[1].origin} - {ticket.segments[1].destination}</p>
        <p>{formatDateAt(ticket.segments[1].date)} - {formatDateTo(ticket.segments[1].date, ticket.segments[1].duration)}</p>
    </div>
    <div>
        <p>В ПУТИ</p>
        <p>{formatDuration(ticket.segments[1].duration)}</p>
    </div>
    <div>
        <p>{setTransfer(ticket.segments[1].stops)}</p>
        <p>{ticket.segments[1].stops.join(',')}</p>
    </div>
</div>

</div>

     )  
    })
   
}

export default Ticket;
