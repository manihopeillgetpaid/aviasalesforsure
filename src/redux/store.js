import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './sortSlice';
import filterReducer from './filterSlice';
import searchReducer from './searchIdSlice';
import ticketReducer from './getTicketsSlice';
const store = configureStore({
    reducer: {
        sort: sortReducer,
        filters: filterReducer,
        search: searchReducer,
        tickets: ticketReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat()
    
});
export default store;