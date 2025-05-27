import React from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './Botoes.scss'

function Botoes({ toggleSearch, openModal }) {
  return (
    <div className="floating-buttons">
      <div className="fab" onClick={openModal}>
        <FaPlus />
      </div>
    </div>
  );
}

export default Botoes;