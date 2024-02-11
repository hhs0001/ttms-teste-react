import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppBarComponent from './AppBarComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock useMediaQuery para controlar o retorno de valores
jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('AppBarComponent', () => {
  const mockHandleDrawerToggle = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa mocks entre os testes
  });

  it('deve mostrar o botão de menu em dispositivos móveis', () => {
    // Mock useMediaQuery para retornar true, simulando um dispositivo móvel
    require('@mui/material/useMediaQuery').mockImplementation(() => true);
    
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <AppBarComponent handleDrawerToggle={mockHandleDrawerToggle} />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
  });

  it('não deve mostrar o botão de menu em dispositivos desktop', () => {
    // Mock useMediaQuery para retornar false, simulando um dispositivo desktop
    require('@mui/material/useMediaQuery').mockImplementation(() => false);
    
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <AppBarComponent handleDrawerToggle={mockHandleDrawerToggle} />
      </ThemeProvider>
    );

    expect(screen.queryByLabelText('open drawer')).not.toBeInTheDocument();
  });

  it('deve sempre mostrar o título "Dashboard"', () => {
    // Não importa o tamanho do dispositivo, o título deve estar presente
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <AppBarComponent handleDrawerToggle={mockHandleDrawerToggle} />
      </ThemeProvider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});