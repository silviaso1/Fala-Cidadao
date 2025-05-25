import React, { useState } from 'react';

function Pesquisa({ showSearch, toggleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`search-sidebar ${showSearch ? 'active' : ''}`}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Pesquisar posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="search-results">
        {/* Search results would appear here */}
      </div>
    </div>
  );
}

export default Pesquisa;