
import './Header.scss';

const Header = () => {
  return (
    <header className="cabecalho">
      <div className="container">
        <div className="cabecalho-logo">
          <img src="" alt="Logo" />
        </div>
        <nav className="cabecalho-menu">
          <a href="login.html" className="botao botao-primario">Entrar</a>
          <a href="login.html" className="botao botao-primario">Criar conta</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;