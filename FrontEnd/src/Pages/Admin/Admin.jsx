import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import Stats from '../../components/Admin/Stats/Stats';
import Reports from '../../components/Admin/Reports/Reports';
import StatusChart from '../../components/Admin/Charts/StatusChart';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import "./Admin.scss";

const Admin = () => {
  const [reports, setReports] = useState([]);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/denuncias'); 
        const apiData = response.data;

        const mappedReports = apiData.map(item => ({
          id: item.id,
          title: item.titulo,
          content: item.descricao,
          category: item.categoria || 'outros',
          user: {
            avatar: item.usuario.nome ? item.usuario.nome.charAt(0).toUpperCase() : '',
            name: item.usuario.nome,
            username: `@${item.usuario.nome.toLowerCase().replace(/\s+/g, '')}`
          },
          date: new Date(item.dataCriacao).toLocaleDateString(),
          time: new Date(item.dataCriacao).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          status: item.status.toLowerCase(),
          comments: 0,
          location: item.bairro,
          likes: item.likes,
        }));

        setReports(mappedReports);
      } catch (error) {
        console.error('Erro ao buscar denúncias:', error);
      }
    };

    fetchReports();
  }, []);

  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-actions">
          <div className="user-profile">
            <span className="user-avatar">
              <FaUser />
            </span>
            <span className="user-name">{user?.name || 'Administrador'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </header>

      <div className="admin-content">
        <main className="content">
          <div className="page-header">
            <h1 className="page-title">Olá! Bom te ter aqui novamente!</h1>
            <p className="page-subtitle">Aqui está o resumo das atividades recentes</p>
          </div>

          <div className="stats-section">
            <Stats reports={reports} />
          </div>

          <div className="charts-section">
            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Denúncias por Status</h3>
                </div>
                <div className="chart-container">
                  <StatusChart reports={reports} />
                </div>
              </div>
              
            </div>
          </div>

          <div className="reports-section">
            <Reports 
              reports={reports} 
              onStatusChange={handleStatusChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;