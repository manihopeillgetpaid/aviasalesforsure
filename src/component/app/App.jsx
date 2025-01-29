import React from "react"
import image from '../assets/logo.png';
import './app.scss';
import SideMenu from '../sideMenu/SideMenu.jsx'
import FlightFilter from "../flightFilter/FlightFilter.jsx";
import Ticket from "../tickets/Ticket.jsx";
import ShowMore from "../showMore/ShowMore.jsx";
const App = () => {
  
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
  <ShowMore/>
  </div>

      </div>
      </div>
    )
   
    }
export default App;