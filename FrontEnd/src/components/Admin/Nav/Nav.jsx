import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Nav.scss';

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest('.user-menu')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar admnav">
      <div className="navbar-left">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Pesquisar denúncias..." 
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="user-menu">
          <div className="user-avatar" onClick={toggleDropdown}>AD</div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <a href="#"><FaUser /> Meu Perfil</a>
              <a href="#"><FaCog /> Configurações</a>
              <a href="#"><FaSignOutAlt /> Sair</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;