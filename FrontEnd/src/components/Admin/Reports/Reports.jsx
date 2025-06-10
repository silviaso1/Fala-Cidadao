import { useState } from 'react';
import axios from 'axios';
import {
  FaEye, FaEdit, FaCheck, FaClock, FaSearch, FaQuestion, FaTrash
} from 'react-icons/fa';
import Pagination from '../Pagination/Pagination';
import './Reports.scss';
import { useAuth } from '../../../contexts/useAuth';

const Reports = ({ reports, onStatusChange, onViewReport, onDeleteReport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const reportsPerPage = 10;
  const { usuarioId } = useAuth();

  const filteredReports = reports.filter(report => {
    const lowerSearch = searchTerm.toLowerCase();

    // Garantindo que os campos existam para evitar erro
    const title = report.title ? report.title.toLowerCase() : '';
    const content = report.content ? report.content.toLowerCase() : '';
    const location = report.location ? report.location.toLowerCase() : '';
    const userName = report.user && report.user.name ? report.user.name.toLowerCase() : '';
    const userUsername = report.user && report.user.username ? report.user.username.toLowerCase() : '';

    const matchesSearch =
      title.includes(lowerSearch) ||
      content.includes(lowerSearch) ||
      location.includes(lowerSearch) ||
      userName.includes(lowerSearch) ||
      userUsername.includes(lowerSearch);

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'denunciado': return 'Pendente';
      case 'em_andamento': return 'Em Análise';
      case 'resolvido': return 'Resolvido';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'denunciado': return <FaClock />;
      case 'em_andamento': return <FaSearch />;
      case 'resolvido': return <FaCheck />;
      default: return <FaQuestion />;
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/denuncias/${reportId}`, {
        usuarioId: Number(usuarioId),
        status: newStatus.toUpperCase(),
      });

      onStatusChange(reportId, newStatus);
      alert(`Status da denúncia ${reportId} atualizado para ${getStatusText(newStatus)}`);
    } catch (error) {
      console.error(`Erro ao atualizar status da denúncia ${reportId}:`, error);
      alert('Erro ao atualizar o status. Tente novamente.');
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (confirm(`Tem certeza que deseja remover a denúncia #${reportId}?`)) {
      try {
        await axios.delete(`http://localhost:3001/denuncias/${reportId}`);
        onDeleteReport(reportId);
        alert(`Denúncia #${reportId} removida com sucesso.`);
      } catch (error) {
        console.error(`Erro ao remover denúncia ${reportId}:`, error);
        alert('Erro ao remover a denúncia. Tente novamente.');
      }
    }
  };

  return (
    <div className="reports-card">
      <div className="table-header">
        <h3 className="table-title">Todas as Denúncias</h3>

        <input
          type="text"
          placeholder="Buscar denúncia, usuário, etc..."
          className="filter-search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="table-filters">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todos Status</option>
            <option value="denunciado">Pendente</option>
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
                  <button className="action-btn view" onClick={() => onViewReport(report.id)}><FaEye /></button>
                  <button className="action-btn edit" onClick={() => handleStatusChange(report.id, 'em_andamento')}><FaEdit /></button>
                  <button className="action-btn resolve" onClick={() => handleStatusChange(report.id, 'resolvido')}><FaCheck /></button>
                  <button className="action-btn delete" onClick={() => handleDeleteReport(report.id)}><FaTrash /></button>
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
