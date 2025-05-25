import './Header.scss';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="cabecalho">
      <div className="container">
        <div className="cabecalho-logo">
          <img src="" alt="Logo" />
        </div>
        <nav className="cabecalho-menu">
          <Link to="/posts" className="botao botao-primario">Entrar</Link>
          <Link to="/auth" className="botao botao-primario">Criar conta</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;