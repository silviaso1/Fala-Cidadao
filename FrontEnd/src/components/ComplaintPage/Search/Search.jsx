import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './Search.scss';

function Filter({ onSearch }) {
  const [searchOpen, setSearchOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchTerm('');
      if (onSearch) onSearch('');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
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
          <button className="close-search" onClick={toggleSearch} aria-label="Fechar pesquisa">
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}

export default Filter;