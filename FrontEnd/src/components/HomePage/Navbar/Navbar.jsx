import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from "../../../assets/logo2.png";

const Navbar = () => {

  return (
    <nav className="navbar py-3 position-fixed z-3">
      <div className="container">
        <div className="cabecalho-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="navbar-menu">
            <>
              <Link to="/auth/login" className="botao botao-primario">Entrar</Link>
              <Link to="/auth/register" className="botao botao-primario">Criar conta</Link>
            </>
       
        </nav>

      </div>
    </nav>
  );
};

export default Navbar;