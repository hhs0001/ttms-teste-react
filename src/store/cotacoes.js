import { createSlice } from '@reduxjs/toolkit';

export const cotacoesSlice = createSlice({
  name: 'cotacoes',
  initialState: {
    cotacoes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCotacoesStart: (state) => {
      state.isLoading = true;
    },
    fetchCotacoesSuccess: (state, action) => {
      state.isLoading = false;
      state.cotacoes = action.payload;
    },
    fetchCotacoesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCotacoesStart, fetchCotacoesSuccess, fetchCotacoesFailure } = cotacoesSlice.actions;

export default cotacoesSlice.reducer;