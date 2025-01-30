import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTickets } from "./getTicketsSlice";
export const getTickets = createAsyncThunk(
    'getTicketSlice/getTickets',
    async (searchId, thunkAPI) => {
        try {
            let stop = false; 
            
            while (!stop) {
                try {
                    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
                    
                    if (!response.ok){
                        continue; 
                    }     
                    const data = await response.json();
                    thunkAPI.dispatch(addTickets(data.tickets));  
                    stop = data.stop;
                } catch (e) { 
                    console.log('fuck it');
                }
            }
            return {tickets: [], stop };
        } catch (e) {
      
        }
    }
);
