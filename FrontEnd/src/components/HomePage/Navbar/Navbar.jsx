import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../../assets/logo2.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../contexts/useAuth';

const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const { usuarioNome, logout } = useAuth();

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const handleLogout = () => {
    logout();
    fecharMenu();
  };

  return (
    <nav className="navbar position-fixed">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`menu ${menuAberto ? 'aberto' : ''}`}>
          {usuarioNome ? (
            <div className='d-flex align-items-baseline gap-3'>
              <p>Olá,<span className="fw-bolder"> {usuarioNome.split(' ')[0]}</span>!</p>
              <button className="botao botao-secundario" onClick={handleLogout}>Sair</button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="botao botao-primario" onClick={fecharMenu}>Entrar</Link>
              <Link to="/auth/register" className="botao botao-primario" onClick={fecharMenu}>Criar conta</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
