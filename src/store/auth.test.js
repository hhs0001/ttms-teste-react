import autenticacaoReducer, { loginSuccess, logout } from './auth';

describe('autenticacao reducer', () => {
  const initialState = {
    usuario: null,
    token: null,
    isAuthenticated: false,
    name: null,
  };

  it('deve lidar com o estado inicial', () => {
    expect(autenticacaoReducer(undefined, { type: 'unknown' })).toEqual({
      name: null,
      usuario: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('deve lidar com loginSuccess', () => {
    const actual = autenticacaoReducer(initialState, loginSuccess({
      usuario: 'testUser',
      name: 'Test User',
      token: 'fakeToken'
    }));
    expect(actual.usuario).toEqual({"name": "Test User", "token": "fakeToken", "usuario": "testUser"});
    expect(actual.name).toEqual('Test User');
    expect(actual.token).toEqual('fakeToken');
    expect(actual.isAuthenticated).toBe(true);
  });

  it('deve lidar com logout', () => {
    // Estado inicial modificado para simular um usuário logado
    const loggedInState = {
      usuario: 'testUser',
      name: 'Test User',
      token: 'fakeToken',
      isAuthenticated: true,
    };
    const actual = autenticacaoReducer(loggedInState, logout());
    expect(actual).toEqual(initialState);
  });
});
