import { configureStore } from '@reduxjs/toolkit';
import autenticacaoReducer from './auth';
import cotacoesReducer from './cotacoes';
import server from './server';

export const store = configureStore({
  reducer: {
    autenticacao: autenticacaoReducer,
    cotacoes: cotacoesReducer,
    server: server
  },
});