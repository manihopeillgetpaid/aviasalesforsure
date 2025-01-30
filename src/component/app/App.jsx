import React from "react"
import image from '../assets/logo.png';
import './app.scss';
import SideMenu from '../sideMenu/SideMenu.jsx'
import FlightFilter from "../flightFilter/FlightFilter.jsx";
import Ticket from "../tickets/Ticket.jsx";
import ShowMore from "../showMore/ShowMore.jsx";
import { useSelector } from "react-redux";
import { Spin } from "antd";
const App = () => {
  const filters = useSelector((state) => state.filters);
  const isActive = Object.values(filters).some(value => value);
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.loader.loading);

    return(
      <div>
     
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <img src={image} alt=""/>
      </div>
      <div style={{display:'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>

      <div>
      <SideMenu/>
      </div>
<div>
  <FlightFilter/>
  <Ticket/>
  {(!isActive && tickets.length !== 0 ) ? <NoResults/> : <ShowMore/>}
  </div>

      </div>
      </div>
    )
   
    }

const NoResults = () => {
  return(
    <p style={{
      width: '100%',
      textAlign: 'center'
    }}>Рейсов, подходящих под заданные фильтры, не найдено</p>
  )
}
export default App;