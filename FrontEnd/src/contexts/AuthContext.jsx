import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState(null);
  const [usuarioRole, setUsuarioRole] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('usuarioId');
    const nome = localStorage.getItem('usuarioNome');
    const role = localStorage.getItem('usuarioRole');

    if (id && nome && role) {
      setUsuarioId(id);
      setUsuarioNome(nome);
      setUsuarioRole(role);
    }
  }, []);

  const login = ({ id, nome, role }) => {
    setUsuarioId(id);
    setUsuarioNome(nome);
    setUsuarioRole(role);
    localStorage.setItem('usuarioId', id);
    localStorage.setItem('usuarioNome', nome);
    localStorage.setItem('usuarioRole', role);
  };

  const logout = () => {
    setUsuarioId(null);
    setUsuarioNome(null);
    setUsuarioRole(null);
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNome');
    localStorage.removeItem('usuarioRole');
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ usuarioId, usuarioNome, usuarioRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
