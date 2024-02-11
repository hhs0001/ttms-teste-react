import cotacoesReducer, {
    fetchCotacoesStart,
    fetchCotacoesSuccess,
    fetchCotacoesFailure,
  } from './cotacoes';
  
  describe('cotacoes reducer', () => {
    const initialState = {
      cotacoes: [],
      isLoading: false,
      error: null,
    };
  
    it('deve lidar com fetchCotacoesStart', () => {
      const actual = cotacoesReducer(initialState, fetchCotacoesStart());
      expect(actual.isLoading).toBe(true);
    });
  
    it('deve lidar com fetchCotacoesSuccess', () => {
      const mockCotacoes = [{ id: 1, valor: '1000' }, { id: 2, valor: '2000' }];
      const actual = cotacoesReducer(
        { ...initialState, isLoading: true }, 
        fetchCotacoesSuccess(mockCotacoes)
      );
      expect(actual.isLoading).toBe(false);
      expect(actual.cotacoes).toEqual(mockCotacoes);
      expect(actual.error).toBeNull();
    });
  
    it('deve lidar com fetchCotacoesFailure', () => {
      const error = 'Erro ao buscar cotações';
      const actual = cotacoesReducer(
        { ...initialState, isLoading: true },
        fetchCotacoesFailure(error)
      );
      expect(actual.isLoading).toBe(false);
      expect(actual.error).toEqual(error);
      expect(actual.cotacoes).toEqual([]);
    });
  });
  