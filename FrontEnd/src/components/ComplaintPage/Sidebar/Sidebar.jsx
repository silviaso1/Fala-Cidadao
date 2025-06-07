import { FiChevronLeft, FiChevronRight, FiHome, FiBell, FiUser, FiX, FiMail, FiLock, FiLogOut, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../../contexts/useAuth';
import { useState, useEffect, useRef } from 'react';
import "./Sidebar.scss";
import Logo from "../../../assets/logo2.png";

const Sidebar = ({ sidebarOpen, toggleSidebar, onSearch }) => {
  const { usuarioNome, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);
  
  // Dados de notificações
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nova mensagem recebida', time: '2 horas', unread: true },
    { id: 2, text: 'Sua denúncia foi resolvida', time: '1 hora', unread: true }
  ]);

  // Verifica se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1090);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fecha notificações e busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (isMobile) return;
    setShowSearch(false);
    if (!sidebarOpen) toggleSidebar();
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const clearNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    setShowNotifications(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Lógica para atualizar perfil
    setShowProfileModal(false);
  };

  const toggleNotifications = () => {
    if (!isMobile && !sidebarOpen) {
      toggleSidebar();
      setTimeout(() => setShowNotifications(true), 300);
    } else {
      setShowNotifications(!showNotifications);
    }
    
    if (!showNotifications && notifications.some(n => n.unread)) {
      clearNotifications();
    }
  };

  const toggleSearch = () => {
    if (!isMobile && !sidebarOpen) {
      toggleSidebar();
      setTimeout(() => setShowSearch(true), 300);
    } else {
      setShowSearch(!showSearch);
    }
  };

  const navItems = [
   
    { 
      icon: <FiBell />, 
      label: 'Notificações', 
      active: false, 
      count: notifications.filter(n => n.unread).length,
      action: toggleNotifications
    },
    { 
      icon: <FiSearch />, 
      label: 'Pesquisar', 
      active: false,
      action: toggleSearch
    },
    { 
      icon: <FiUser />, 
      label: 'Perfil', 
      active: false,
      action: () => setShowProfileModal(true)
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
            {sidebarOpen && <h2 className="logo"><img src={Logo} alt="logo" /></h2>}
          </div>

          {/* Campo de Busca Desktop - Visível quando expandido ou quando showSearch é true */}
          {(sidebarOpen || showSearch) && (
            <div className={`sidebar-search ${showSearch ? 'force-show' : ''}`} ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="search-container">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus={showSearch}
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search" onClick={clearSearch}>
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button 
                key={item.label}
                className={`nav-item ${item.active ? 'active' : ''}`}
                onClick={item.action || (() => {})}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.count > 0 && <span className="nav-badge">{item.count}</span>}
                  </>
                )}
              </button>
            ))}
          </nav>

          {sidebarOpen && showNotifications && (
            <div className="sidebar-content">
              <div className="sidebar-section">
                <div className="notifications-header">
                  <h3>Notificações</h3>
                  {notifications.some(n => n.unread) && (
                    <button className="clear-notifications" onClick={clearNotifications}>
                      <FiX size={16} /> Limpar
                    </button>
                  )}
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                      <p>{notification.text}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))}
                </div>
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
        <>
          {/* Campo de Busca Mobile (aparece acima da barra) */}
          <div className="mobile-search-container" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <div className="mobile-search">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" className="clear-search" onClick={clearSearch}>
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

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
                
                {/* Caixa de Notificações */}
                {showNotifications && (
                  <div className="mobile-notifications-box" ref={notificationsRef}>
                    <div className="notifications-header">
                      <h3>Notificações</h3>
                      <button className="clear-notifications" onClick={clearNotifications}>
                        <FiX size={16} />
                      </button>
                    </div>
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.text}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mobile-nav-item" onClick={toggleSearch}>
                <FiSearch className="mobile-nav-icon" />
                <span className="mobile-nav-label">Pesquisar</span>
              </div>
              
              <div className="mobile-nav-item" onClick={logout}>
                <FiLogOut className="mobile-nav-icon" />
                <span className="mobile-nav-label">Sair</span>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Modal de Perfil */}
      {showProfileModal && (
        <div className="profile-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowProfileModal(false)}>
              <FiX />
            </button>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>
                  <FiMail /> Email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Novo email" 
                />
              </div>
              <div className="form-group">
                <label>
                  <FiLock /> Nova Senha
                </label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Nova senha" 
                />
              </div>
              <div className="form-group">
                <label>
                  <FiLock /> Confirmar Senha
                </label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirmar senha" 
                />
              </div>
              <button type="submit" className="save-button">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;