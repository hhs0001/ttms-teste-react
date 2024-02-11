import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AutenticacaoContext = createContext();

export function useAutenticacao() {
  return useContext(AutenticacaoContext);
}

export const AutenticacaoProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, senha) => {
    try {
      console.log('Tentando logar com', email, senha);
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        senha
      });
      console.log('Resposta do login:', response);
      const { token } = response.data;
      console.log('Token recebido:', token);
      setToken(token);
      setUsuario({ email });
      console.log('Stando token no localStorage');
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error("Erro de login", error.response.data);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    usuario,
    token,
    login,
    logout,
  };

  return <AutenticacaoContext.Provider value={value}>{children}</AutenticacaoContext.Provider>;
};
