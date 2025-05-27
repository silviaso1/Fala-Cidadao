import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import './Filter.scss';

function Filter({ currentFilter, currentSort, filterPosts, sortPosts, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (menuOpen) setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <>
      <div className="strap-filtros">
        <div className={`fab-search ${searchOpen ? 'active' : ''}`} onClick={toggleSearch} title="Pesquisar">
          <FaSearch />
        </div>

        <div className={`search-wrapper ${searchOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus={searchOpen}
          />
          {searchOpen && (
            <button className="close-search" onClick={() => setSearchOpen(false)} aria-label="Fechar pesquisa">
              <FaTimes />
            </button>
          )}
        </div>

        <button className={`button-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Abrir filtros">
          <FaFilter />
        </button>
      </div>

      <aside className={`menu-panel ${menuOpen ? 'open' : ''}`}>
        <button className="close-panel-btn" onClick={() => setMenuOpen(false)} aria-label="Fechar filtros">
          <FaTimes />
        </button>

        <div className="filter-group">
          <div className="title-group">Filtrar por data</div>
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
              onClick={() => filterPosts(filter)}
            >
              {{
                all: 'Todos',
                today: 'Hoje',
                week: 'Esta semana',
                month: 'Este mês'
              }[filter]}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <div className="title-group">Ordenar por</div>
          <button
            className={`filter-btn ${currentSort === 'recent' ? 'active' : ''}`}
            onClick={() => sortPosts('recent')}
          >
            <FaArrowUp className="filter-icon" /> Recentes
          </button>
          <button
            className={`filter-btn ${currentSort === 'oldest' ? 'active' : ''}`}
            onClick={() => sortPosts('oldest')}
          >
            <FaArrowDown className="filter-icon" /> Antigos
          </button>
        </div>
      </aside>
    </>
  );
}

export default Filter;