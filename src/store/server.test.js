import { configureStore } from '@reduxjs/toolkit';
jest.mock('axios');
import axios from 'axios';
import { fetchServerStatus, serverSlice } from './server';

// Mock axios
//jest.mock('axios');

describe('serverSlice', () => {
  // Configura uma store mockada para os testes
  const createStore = () => configureStore({ reducer: { server: serverSlice.reducer } });

  it('deve iniciar o estado com isLoading true quando fetchServerStatus é pendente', async () => {
    const store = createStore();
    // Mock axios para resolver imediatamente
    axios.get.mockResolvedValue({ data: { status: true } });

    store.dispatch(fetchServerStatus());
    const initialState = store.getState().server;

    // Verifica se isLoading é true
    expect(initialState.isLoading).toBe(true);
  });

  it('deve atualizar o estado corretamente quando fetchServerStatus é cumprida', async () => {
    const store = createStore();
    // Mock axios para resolver imediatamente com status true
    axios.get.mockResolvedValue({ data: { status: true } });

    await store.dispatch(fetchServerStatus());
    const state = store.getState().server;

    // Verifica se o estado foi atualizado corretamente
    expect(state.isLoading).toBe(false);
    expect(state.serverStatus).toBe(true);
    expect(state.error).toBeNull();
  });

  it('deve atualizar o estado corretamente quando fetchServerStatus é rejeitada', async () => {
    const store = createStore();
    // Mock axios para rejeitar a promessa
    axios.get.mockRejectedValue(new Error('Erro ao conectar com o servidor.'));

    await store.dispatch(fetchServerStatus());
    const state = store.getState().server;

    // Verifica se o estado foi atualizado corretamente
    expect(state.isLoading).toBe(false);
    expect(state.serverStatus).toBe(false);
    expect(state.error).toBeDefined();
  });
});
