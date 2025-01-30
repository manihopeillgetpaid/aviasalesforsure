import { createSlice } from "@reduxjs/toolkit";
import { getTickets } from "./getTickets";

const initialState = {
    tickets: [],
    stop: false,
    displayCount: 5
}
const getTicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTickets: (state, action) => {
            state.tickets = [...state.tickets, ...action.payload]; // Ensure new array reference
        },
        showMoreTickets: (state) => {
            state.displayCount += 5;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTickets.fulfilled, (state, action) => {
            // This is now redundant since tickets are added incrementally
            state.stop = action.payload.stop;
        });
    }
     
});

export const { showMoreTickets, addTickets } = getTicketSlice.actions;

export default getTicketSlice.reducer;