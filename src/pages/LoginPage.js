import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/auth.js';
import axios from 'axios';
import { TextField, Button, Container, Typography, Snackbar, Grid, Paper, CssBaseline, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchServerStatus } from '../store/server.js';
import { useTheme } from '@mui/material/styles';

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverStatus = useSelector((state) => state.server.serverStatus);

  const validateEmail = (email) => {
    //eslint-disable-next-line
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Desafazer
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    dispatch(fetchServerStatus());
  }, [dispatch]);

  useEffect(() => {
    if (serverStatus === false) { // Explicitamente verifica se é false
      setOpen(true);
      setMessage('Erro ao conectar com o servidor.');
    } else {
      setOpen(false); // Pode optar por fechar o Snackbar se o status for true ou ainda não verificado
    }
  }, [serverStatus]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    try {
      const response = await axios.post(`http://localhost:3001/api/login`, { email, senha });
      dispatch(loginSuccess({
        token: response.data.token,
        email: email,
        name: response.data.username
      }));
      navigate('/');
    } catch (error) {
      alert('E-mail ou senha inválidos.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: isMobile ? 10 : 20, marginTop: isMobile ? 20 : 50 }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
        <Typography component="h1" variant="h5" style={{ marginBottom: 20, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                helperText={emailError ? "Por favor insira um endereço de e-mail válido." : ""} // Mensagem de erro
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!serverStatus}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}