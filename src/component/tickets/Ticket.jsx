import React, { useEffect } from "react";
import { parseISO, format, addMinutes } from 'date-fns';
import './ticket.scss';
import { useDispatch, useSelector } from "react-redux";
import { getSearchId } from "../../redux/searchIdFunc";
import { setSearchId } from '../../redux/searchIdSlice';
import { getTickets } from "../../redux/getTickets";
import ShowMore from "../showMore/ShowMore";


const Ticket = () => {
    const dispatch = useDispatch();
    const searchId = useSelector((state) => state.search.searchId);
    const tickets = useSelector((state) => state.tickets.tickets);
    const displayCount = useSelector((state) => state.tickets.displayCount);
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
    useEffect(() => {
        dispatch(getSearchId()).then((result) => {
            if(result.payload){
                dispatch(setSearchId(result.payload.searchId))
            }
        })       
    }, [dispatch]);
   useEffect(() => {
    if(searchId) {
        dispatch(getTickets(searchId));
    }
   }, [dispatch, searchId])

   return  tickets.slice(0,displayCount).map((ticket,index) => {
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
