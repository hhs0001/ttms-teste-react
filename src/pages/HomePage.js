import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    CssBaseline,
    Toolbar,
} from '@mui/material';
import { fetchCotacoesStart, fetchCotacoesSuccess, fetchCotacoesFailure } from '../store/cotacoes.js';
import { logout } from '../store/auth.js';
import { useTheme, useMediaQuery } from '@mui/material';
import AppBarComponent from '../components/AppBarComponent';
import DrawerComponent from '../components/DrawerComponent';
import CotacoesComponent from '../components/CotacoesComponent';

export default function HomePage() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const dispatch = useDispatch();
    const { usuario, token } = useSelector((state) => state.autenticacao);
    const { cotacoes, isLoading, error } = useSelector((state) => state.cotacoes);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        const buscarCotacao = async () => {
            dispatch(fetchCotacoesStart());
            try {
                const response = await axios.get('http://localhost:3001/api/coindesk', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch(fetchCotacoesSuccess(response.data));
            } catch (error) {
                dispatch(fetchCotacoesFailure(error.toString()));
            }
        };

        buscarCotacao();
    }, [dispatch, token]);

    const drawerWidth = 240;



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent handleDrawerToggle={handleDrawerToggle} />

            <DrawerComponent
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                usuario={usuario}
                handleLogout={handleLogout}
                isMobile={isMobile}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar /> {/* Espaço para o AppBar */}
                <Typography variant="h4" gutterBottom>
                    Bem-vindo, {usuario ? usuario.email : 'Visitante'}!
                </Typography>
                <CotacoesComponent cotacoes={cotacoes} isLoading={isLoading} error={error} />
            </Box>
        </Box>
    );
}