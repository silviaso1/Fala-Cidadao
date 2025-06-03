import React from 'react';
import './Pagination.scss';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button 
        className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`page-link ${currentPage === number ? 'active' : ''}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      
      <button 
        className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage !== totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;