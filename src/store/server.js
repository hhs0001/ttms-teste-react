import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ação assíncrona para buscar o status do servidor
export const fetchServerStatus = createAsyncThunk(
    'server/fetchStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3001/api/health');
            return response.data.status;
        } catch (error) {
            return rejectWithValue('Erro ao conectar com o servidor.');
        }
    }
);

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        serverStatus: undefined, // Inicialmente undefined
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServerStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchServerStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.serverStatus = action.payload; // true ou false com base na resposta
                state.error = null; // Limpa qualquer erro anterior
            })
            .addCase(fetchServerStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.serverStatus = false; // Considera o servidor como inacessível
                state.error = action.payload; // Armazena a mensagem de erro
            });
    },
});


export default serverSlice.reducer;
