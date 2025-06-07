import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../../assets/logo2.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`menu ${menuAberto ? 'aberto' : ''}`}>
          <Link to="/auth/login" className="botao botao-primario" onClick={fecharMenu}>Entrar</Link>
          <Link to="/auth/register" className="botao botao-primario" onClick={fecharMenu}>Criar conta</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
