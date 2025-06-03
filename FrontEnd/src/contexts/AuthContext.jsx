import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('usuarioId');
    const nome = localStorage.getItem('usuarioNome');

    if (id && nome) {
      setUsuarioId(id);
      setUsuarioNome(nome);
    }
  }, []);

  const login = ({ id, nome }) => {
    setUsuarioId(id);
    setUsuarioNome(nome);
    localStorage.setItem('usuarioId', id);
    localStorage.setItem('usuarioNome', nome);
  };

  const logout = () => {
    setUsuarioId(null);
    setUsuarioNome(null);
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNome');
    localStorage.removeItem('token');
    navigate('/auth/login')
  };

  return (
    <AuthContext.Provider value={{ usuarioId, usuarioNome, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
