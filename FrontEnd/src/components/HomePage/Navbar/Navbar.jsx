import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/useAuth'; 
import { BiSolidUserCircle } from "react-icons/bi";
import './Navbar.scss';

const Navbar = () => {
  const { usuarioNome } = useAuth();
  const { logout } = useAuth();
  return (
    <nav className="navbar py-3 position-fixed z-3">
      <div className="container">
        <div className="cabecalho-logo">
          <img src="" alt="Logo" />
        </div>
        <Link to="/posts" className="botao botao-secundario">Denúncia</Link>
        <nav className="navbar-menu">
          {usuarioNome ? (
            <div className='d-flex gap-3 align-items-baseline'>
              <p className='p-0 m-0'>{usuarioNome}</p>
              <BiSolidUserCircle className='icon' />
              <button className="botao botao-primario ms-5" onClick={logout}>Sair</button>
            </div>

          ) : (
            <>
              <Link to="/auth/login" className="botao botao-primario">Entrar</Link>
              <Link to="/auth/register" className="botao botao-primario">Criar conta</Link>
            </>
          )}
        </nav>

      </div>
    </nav>
  );
};

export default Navbar;