import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CotacoesComponent from './CotacoesComponent';

describe('CotacoesComponent', () => {
  it('deve exibir mensagem de carregamento quando isLoading é true', () => {
    render(<CotacoesComponent cotacoes={{}} isLoading={true} error={null} />);
    expect(screen.getByText(/Carregando cotações.../i)).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando há um erro', () => {
    render(<CotacoesComponent cotacoes={{}} isLoading={false} error="Erro ao buscar cotações" />);
    expect(screen.getByText(/Erro ao buscar cotações/i)).toBeInTheDocument();
  });

  it('deve exibir as cotações quando cotacoes.bpi contém dados', () => {
    const mockCotacoes = {
      bpi: {
        USD: {
          code: "USD",
          rate: "30,000",
          description: "United States Dollar"
        }
      }
    };

    render(<CotacoesComponent cotacoes={mockCotacoes} isLoading={false} error={null} />);
    expect(screen.getByText(/United States Dollar/i)).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/30,000/i)).toBeInTheDocument();
  });
});
