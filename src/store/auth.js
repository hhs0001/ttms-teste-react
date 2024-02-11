import { createSlice } from '@reduxjs/toolkit';

export const autenticacaoSlice = createSlice({
  name: 'autenticacao',
  initialState: {
    usuario: null,
    token: null,
    isAuthenticated: false,
    name: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.usuario = action.payload;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.usuario = null;
      state.token = null;
      state.isAuthenticated = false;
      state.name = null;
    },
  },
});

export const { loginSuccess, logout } = autenticacaoSlice.actions;

export default autenticacaoSlice.reducer;