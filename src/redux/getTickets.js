import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTickets = createAsyncThunk(
    'getTicketSlice/getTickets',
    async (searchId, thunkAPI) => {
        
        try{
            const responce = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
            if(!responce.ok) throw new Error('wrong with getting tickets');
            const data = await responce.json();
            console.log(data);
            return data;
        }
        catch(e){
            return thunkAPI.rejectWithValue(e.message);
        }
    }   

)