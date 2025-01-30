import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchId = createAsyncThunk(
    'searchIdSlice/getSearchId',
    async (thunkAPI) => {
        try{
            const response = await fetch('https://aviasales-test-api.kata.academy/search');
            if(!response.ok) throw new Error('wrooong');
            const data = await response.json();
            return data;
        }
        catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }

    }
)