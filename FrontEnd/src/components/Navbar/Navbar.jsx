import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="cabecalho-logo">
          <img src="" alt="Logo" />
        </div>
        <Link to="/posts" className="botao botao-secundario">Denúncia</Link>
        <nav className="navbar-menu">
          <Link to="/auth" className="botao botao-primario">Entrar</Link>
          <Link to="/auth" className="botao botao-primario">Criar conta</Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;