import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './filtro.scss';

function Filtro({ currentFilter, currentSort, filterPosts, sortPosts }) {
  return (
    <div className="filter-section" id="filterSection">
      <div>
        <button 
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} 
          onClick={() => filterPosts('all')}
        >
          Todos
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'today' ? 'active' : ''}`} 
          onClick={() => filterPosts('today')}
        >
          Hoje
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'week' ? 'active' : ''}`} 
          onClick={() => filterPosts('week')}
        >
          Esta semana
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'month' ? 'active' : ''}`} 
          onClick={() => filterPosts('month')}
        >
          Este mês
        </button>
      </div>
      <div>
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
    </div>
  );
}

export default Filtro;