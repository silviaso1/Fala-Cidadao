
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Dropdown({ showUserDropdown, closeUserMenu }) {
  return (
    <div className={`dropdown-menu ${showUserDropdown ? 'show' : ''} p-2`}
      style={{
        position: 'absolute',
        right: 0,
        top: '50px',
        backgroundColor: 'var(--cor-card)',
        borderRadius: '10px',
        width: '200px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        zIndex: 100,
        display: showUserDropdown ? 'block' : 'none'
      }}>
      <a className="dropdown-item d-flex align-items-center py-2 px-2"
        href="#"
        onClick={closeUserMenu}
        style={{
          color: 'var(--cor-texto)',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
        <FaUser className="me-2" />
        Meu Perfil
      </a>
      <a className="dropdown-item d-flex align-items-center py-2 px-2"
        href="#"
        onClick={closeUserMenu}
        style={{
          color: 'var(--cor-texto)',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
        <FaCog className="me-2" />
        Configurações
      </a>
      <a className="dropdown-item d-flex align-items-center py-2 px-2"
        href="#"
        onClick={closeUserMenu}
        style={{
          color: 'var(--cor-texto)',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
        <FaSignOutAlt className="me-2" />
        Sair
      </a>
    </div>
  );
}

export default Dropdown;