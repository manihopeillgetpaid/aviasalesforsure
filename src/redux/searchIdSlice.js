import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchId: ''
}

const idSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchId: (state, action) => {
            state.searchId = action.payload
        }
    }
})
export const { setSearchId } = idSlice.actions

export default idSlice.reducer;