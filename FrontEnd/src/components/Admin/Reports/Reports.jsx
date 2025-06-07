import React, { useState } from 'react';
import { FaEye, FaEdit, FaCheck, FaClock, FaSearch, FaQuestion } from 'react-icons/fa';
import Pagination from '../Pagination/Pagination';
import './Reports.scss';

const Reports = ({ reports, onStatusChange, onViewReport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const reportsPerPage = 10;

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pendente': return 'Pendente';
      case 'analise': return 'Em Análise';
      case 'resolvido': return 'Resolvido';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pendente': return <FaClock />;
      case 'analise': return <FaSearch />;
      case 'resolvido': return <FaCheck />;
      default: return <FaQuestion />;
    }
  };

  const getCategoryText = (category) => {
    switch(category) {
      case 'iluminacao': return 'Iluminação Pública';
      case 'buraco': return 'Buraco na Via';
      case 'lixo': return 'Lixo Acumulado';
      case 'transito': return 'Problema de Trânsito';
      // Caso não queira mostrar nada se for diferente:
      default: return '';
    }
  };

  return (
    <div className="reports-card">
      <div className="table-header">
        <h3 className="table-title">Todas as Denúncias</h3>
        <div className="table-filters">
          <select 
            className="filter-select" 
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todas Categorias</option>
            <option value="iluminacao">Iluminação Pública</option>
            <option value="buraco">Buraco na Via</option>
            <option value="lixo">Lixo Acumulado</option>
            <option value="transito">Problema de Trânsito</option>
          </select>
          <select 
            className="filter-select" 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todos Status</option>
            <option value="pendente">Pendente</option>
            <option value="analise">Em Análise</option>
            <option value="resolvido">Resolvido</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Denúncia</th>
              <th>Usuário</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map(report => (
              <tr key={report.id}>
                <td className="report-id">#{report.id}</td>
                <td>
                  <div className="report-title">{report.title}</div>
                  <div className="report-content">{report.content}</div>
                  <span className="report-category">{getCategoryText(report.category)}</span>
                </td>
                <td>
                  <div className="report-user">
                    <div className="user-avatar-sm">{report.user.avatar}</div>
                    <div className="user-info">
                      <div className="user-name">{report.user.name}</div>
                      <div className="user-username">{report.user.username}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="report-date">{report.date}</div>
                  <div className="report-time">{report.time}</div>
                </td>
                <td>
                  <span className={`status-badge status-${report.status}`}>
                    {getStatusIcon(report.status)} {getStatusText(report.status)}
                  </span>
                </td>
                <td>
                  <button 
                    className="action-btn view" 
                    title="Visualizar" 
                    onClick={() => onViewReport(report.id)}
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="action-btn edit" 
                    title="Editar status" 
                    onClick={() => onStatusChange(report.id, 'analise')}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn resolve" 
                    title="Marcar como resolvido" 
                    onClick={() => onStatusChange(report.id, 'resolvido')}
                  >
                    <FaCheck />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={reportsPerPage}
        totalItems={filteredReports.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Reports;
