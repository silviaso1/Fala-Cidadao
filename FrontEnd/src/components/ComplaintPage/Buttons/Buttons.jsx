import { useState, useRef, useEffect } from 'react';
import { FaPlus, FaFilter, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Buttons.scss';

function Buttons({ openModal, currentFilter, currentSort, filterPosts, sortPosts }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {

        const fabButtons = document.querySelectorAll('.fab');
        let isFabClick = false;

        fabButtons.forEach(button => {
          if (button.contains(event.target)) {
            isFabClick = true;
          }
        });

        if (!isFabClick) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="floating-buttons">

      <div
        className={`fab ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir filtros"
      >
        <FaFilter />
      </div>


      <div className="fab" onClick={openModal}>
        <FaPlus />
      </div>


      <div
        ref={panelRef}
        className={`filter-panel ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="close-panel-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar filtros"
        >
          <FaTimes />
        </button>

        <div className="filter-group">
          <div className="title-group">Filtrar por data</div>
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
              onClick={() => {
                filterPosts(filter);
                setTimeout(() => setMenuOpen(false), 300);
              }}
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
            onClick={() => {
              sortPosts('recent');
              setTimeout(() => setMenuOpen(false), 300);
            }}
          >
            <FaArrowUp className="filter-icon" /> Recentes
          </button>
          <button
            className={`filter-btn ${currentSort === 'oldest' ? 'active' : ''}`}
            onClick={() => {
              sortPosts('oldest');
              setTimeout(() => setMenuOpen(false), 300);
            }}
          >
            <FaArrowDown className="filter-icon" /> Antigos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buttons;