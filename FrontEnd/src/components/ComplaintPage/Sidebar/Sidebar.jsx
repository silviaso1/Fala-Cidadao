import { 
  FiChevronLeft, FiChevronRight, FiBell, FiUser, FiX, FiMail, FiLock, 
  FiLogOut, FiSearch, FiTrash2, FiEdit2, FiCheck, FiEye, FiEyeOff 
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/useAuth';
import { useState, useEffect, useRef } from 'react';
import "./Sidebar.scss";
import Logo from "../../../assets/logo2.png";
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, toggleSidebar, onSearch }) => {
  const { usuarioNome, logout, usuarioId } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  const [profileEditMode, setProfileEditMode] = useState('email');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nova mensagem recebida', time: '2 horas', unread: true },
    { id: 2, text: 'Sua denúncia foi resolvida', time: '1 hora', unread: true }
  ]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1090);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
        onSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (isMobile) {
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const clearNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert('Usuário não identificado');
      return;
    }

    if (profileEditMode === 'email') {
      if (!email.trim()) {
        alert('Informe um email válido.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/usuarios/${usuarioId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error('Erro ao atualizar email');
        alert('Email atualizado com sucesso!');
        setShowProfileModal(false);
        setEmail('');
      } catch (error) {
        alert('Falha ao atualizar email: ' + error.message);
      }

    } else if (profileEditMode === 'password') {
      if (!password || !confirmPassword) {
        alert('Preencha ambos os campos de senha.');
        return;
      }
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/usuarios/${usuarioId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senha: password }),
        });
        if (!res.ok) throw new Error('Erro ao atualizar senha');
        alert('Senha atualizada com sucesso!');
        setShowProfileModal(false);
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        alert('Falha ao atualizar senha: ' + error.message);
      }
    }
  };

  const openProfileModal = async () => {
    if (profileEditMode === 'email' && usuarioId) {
      try {
        const res = await fetch(`http://localhost:3001/usuarios/${usuarioId}`);
        if (!res.ok) throw new Error('Falha ao buscar usuário');
        const userData = await res.json();
        setEmail(userData.email || '');
      } catch (error) {
        console.error('Erro ao carregar email:', error);
      }
    }
    setShowProfileModal(true);
  };

  const toggleNotifications = () => {
    if (notifications.some(n => n.unread)) {
      clearNotifications();
    }
    setShowNotifications(!showNotifications);
  };

  const navItems = [
    { 
      icon: <FiBell />, 
      label: 'Notificações', 
      count: notifications.filter(n => n.unread).length,
      action: toggleNotifications
    },
    { 
      icon: <FiUser />, 
      label: 'Perfil', 
      action: openProfileModal
    }
  ];

  return (
    <>
      {/* Sidebar Desktop */}
      {!isMobile && (
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>
            {sidebarOpen && <h2 className="logo"> <Link to="/"><img src={Logo} alt="logo" /></Link>  </h2>}
          </div>

          <div className={`sidebar-search-container ${sidebarOpen ? 'open' : ''}`} ref={searchRef}>
            {sidebarOpen ? (
              <form onSubmit={handleSearch}>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search" onClick={clearSearch}>
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <button className="search-icon-button" onClick={() => {
                toggleSidebar();
                setTimeout(() => {
                  document.querySelector('.search-container input')?.focus();
                }, 300);
              }}>
                <FiSearch />
              </button>
            )}
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button 
                key={item.label}
                className="nav-item"
                onClick={item.action}
              >
                <div className="nav-icon-wrapper">
                  <span className="nav-icon">{item.icon}</span>
                  {item.count > 0 && <span className="nav-badge">{item.count}</span>}
                </div>
                {sidebarOpen && (
                  <span className="nav-label">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          {sidebarOpen && (
            <div className="sidebar-content">
              <div className="sidebar-section">
                <div className="notifications-header">
                  <h3>Notificações</h3>
                  <button 
                    className="clear-notifications" 
                    onClick={clearNotifications}
                    title="Limpar notificações"
                  >
                    <FiTrash2 size={14} />
                    <span>Limpar</span>
                  </button>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                    >
                      <p>{notification.text}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!sidebarOpen && showNotifications && (
            <div className="sidebar-notifications" ref={notificationsRef}>
              <div className="notifications-header">
                <h3>Notificações</h3>
                <button 
                  className="clear-notifications" 
                  onClick={clearNotifications}
                  title="Limpar notificações"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <p>{notification.text}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-footer">
            {sidebarOpen ? (
              <div className="user-profile">
                <div className="avatar">
                  {usuarioNome ? usuarioNome.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-info">
                  <span className="username">{usuarioNome || 'Usuário'}</span>
                  <span className="user-status">Online</span>
                </div>
                <button className="logout-btn" onClick={logout} title="Sair">
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button className="logout-btn" onClick={logout} title="Sair">
                <FiLogOut />
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Barra Inferior Mobile */}
      {isMobile && (
        <div className="mobile-bottom-bar">
          <nav className="mobile-nav">
            <div className="mobile-nav-item" onClick={toggleNotifications}>
              <div className="notification-wrapper">
                <FiBell className="mobile-nav-icon" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="mobile-badge">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </div>
              <span className="mobile-nav-label">Notificações</span>
              {showNotifications && (
                <div className="mobile-notifications-box" ref={notificationsRef}>
                  <div className="notifications-header">
                    <h3>Notificações</h3>
                    <button 
                      className="clear-notifications" 
                      onClick={clearNotifications}
                      title="Limpar notificações"
                    >
                      <FiTrash2 size={14} />
                      <span>Limpar</span>
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                      >
                        <p>{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mobile-nav-item" onClick={openProfileModal}>
              <FiUser className="mobile-nav-icon" />
              <span className="mobile-nav-label">Perfil</span>
            </div>

            <div className="mobile-nav-item" onClick={logout}>
              <FiLogOut className="mobile-nav-icon" />
              <span className="mobile-nav-label">Sair</span>
            </div>
          </nav>
        </div>
      )}

      {/* Modal de Perfil Atualizado */}
      {showProfileModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>
                  Editar Perfil
                </h2>
                <button 
                  className="close-modal" 
                  onClick={() => setShowProfileModal(false)}
                  aria-label="Fechar modal"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="edit-mode-tabs">
                <button
                  type="button"
                  className={`tab-btn ${profileEditMode === 'email' ? 'active' : ''}`}
                  onClick={() => setProfileEditMode('email')}
                >
                  <FiMail className="tab-icon" />
                  <span>Email</span>
                  {profileEditMode === 'email' && <div className="active-indicator" />}
                </button>
                <button
                  type="button"
                  className={`tab-btn ${profileEditMode === 'password' ? 'active' : ''}`}
                  onClick={() => setProfileEditMode('password')}
                >
                  <FiLock className="tab-icon" />
                  <span>Senha</span>
                  {profileEditMode === 'password' && <div className="active-indicator" />}
                </button>
              </div>

              <form onSubmit={handleProfileUpdate} className="profile-form">
                {profileEditMode === 'email' && (
                  <div className="form-group">
                    <label htmlFor="email">
                      <FiMail className="input-icon" />
                      Novo Email
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Digite seu novo email"
                        required
                        autoFocus
                        className="profile-input"
                      />
                      <FiEdit2 className="edit-icon" />
                    </div>
                  </div>
                )}

                {profileEditMode === 'password' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="password">
                        <FiLock className="input-icon" />
                        Nova Senha
                      </label>
                      <div className="input-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Digite sua nova senha"
                          required
                          autoFocus
                          className="profile-input"
                        />
                        <button 
                          type="button" 
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <FiLock className="input-icon" />
                        Confirmar Senha
                      </label>
                      <div className="input-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Confirme sua nova senha"
                          required
                          className="profile-input"
                        />
                        <button 
                          type="button" 
                          className="password-toggle"
                          onClick={toggleConfirmPasswordVisibility}
                          aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" className="save-btn">
                  <FiCheck className="btn-icon" />
                  Salvar Alterações
                </button>
              </form>

              <div className="modal-footer">
                <button 
                  className="logout-btn"
                  onClick={() => {
                    setShowProfileModal(false);
                    logout();
                  }}
                >
                  <FiLogOut className="btn-icon" />
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Mobile Atualizado */}
      {isMobile && (
        <div className="mobile-search-container" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <div className="mobile-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mobile-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search"
                  onClick={clearSearch}
                  aria-label="Limpar busca"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Sidebar;