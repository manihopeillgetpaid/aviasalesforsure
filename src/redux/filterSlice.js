import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: false,
  noTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const filter = action.payload;
      state[filter] = !state[filter];

      // Если убрали фильтр при включенном "Все", снимаем "Все"
      if (filter !== 'all' && state.all && !state[filter]) {
        state.all = false;
      }

      // Если все фильтры выбраны, включаем "Все"
      const areAllSelected =
        state.noTransfers && state.oneTransfer && state.twoTransfers && state.threeTransfers;

      if (areAllSelected) {
        state.all = true;
      }
    },
    toggleAll: (state) => {
      const newValue = !state.all;
      state.all = newValue;
      state.noTransfers = newValue;
      state.oneTransfer = newValue;
      state.twoTransfers = newValue;
      state.threeTransfers = newValue;
    },
  },
});

export const { toggleFilter, toggleAll } = filtersSlice.actions;
export default filtersSlice.reducer;
