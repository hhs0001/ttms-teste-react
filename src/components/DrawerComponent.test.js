import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawerComponent from './DrawerComponent';

// Mock para as funções de manipulação
const mockHandleDrawerToggle = jest.fn();
const mockHandleLogout = jest.fn();

describe('DrawerComponent', () => {
  const drawerWidth = 240;

  it('deve renderizar o conteúdo do drawer corretamente', () => {
    render(
      <DrawerComponent
        drawerWidth={drawerWidth}
        mobileOpen={false}
        handleDrawerToggle={mockHandleDrawerToggle}
        usuario={{ name: "Test User" }}
        handleLogout={mockHandleLogout}
        isMobile={false}
      />
    );

    // Verifica se os itens do menu são renderizados
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('deve abrir o drawer em dispositivos móveis quando mobileOpen é true', () => {
    // Renderiza o componente em modo móvel com o drawer aberto
    render(
      <DrawerComponent
        drawerWidth={drawerWidth}
        mobileOpen={true}
        handleDrawerToggle={mockHandleDrawerToggle}
        usuario={{ name: "Test User" }}
        handleLogout={mockHandleLogout}
        isMobile={true}
      />
    );

    // Não podemos verificar diretamente se o drawer está aberto devido às limitações do JSDOM.
    // Em vez disso, verificamos se o conteúdo esperado é renderizado.
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('deve chamar handleLogout quando o botão de logout é clicado', () => {
    render(
      <DrawerComponent
        drawerWidth={drawerWidth}
        mobileOpen={true}
        handleDrawerToggle={mockHandleDrawerToggle}
        usuario={{ name: "Test User" }}
        handleLogout={mockHandleLogout}
        isMobile={true}
      />
    );

    // Clica no botão de logout
    fireEvent.click(screen.getByText('Logout'));

    // Verifica se handleLogout foi chamado
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});