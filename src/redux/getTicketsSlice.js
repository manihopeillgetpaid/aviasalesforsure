import { createSlice } from "@reduxjs/toolkit";
import { getTickets } from "./getTickets";
import { act } from "react";

const initialState = {
    tickets: [],
    stop: false,
    displayCount: 5
}
const getTicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        showMoreTickets: (state) => {
            state.displayCount += 5;
        }
    },
     extraReducers: (builder) => {
        builder.addCase(getTickets.fulfilled, (state, action) => {
            state.tickets = [...state.tickets, ...action.payload.tickets];
            state.stop = action.payload.stop
        })
     }
});

export const { showMoreTickets } = getTicketSlice.actions;

export default getTicketSlice.reducer;