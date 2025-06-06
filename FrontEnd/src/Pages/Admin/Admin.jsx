import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Admin/Nav/Nav';
import Stats from '../../components/Admin/Stats/Stats';
import Reports from '../../components/Admin/Reports/Reports';
import StatusChart from '../../components/Admin/Charts/StatusChart';
import CategoryChart from '../../components/Admin/Charts/CategoryChart';
import { FaDownload } from 'react-icons/fa';
import "./Admin.scss";

const Admin = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/denuncias'); // ajuste URL da sua API
        const apiData = response.data;

        // Mapear dados da API para formato esperado pelo front
        const mappedReports = apiData.map(item => ({
          id: item.id,
          title: item.titulo,
          content: item.descricao,
          user: {
            avatar: item.usuario.nome ? item.usuario.nome.charAt(0).toUpperCase() : '',
            name: item.usuario.nome,
            username: `@${item.usuario.nome.toLowerCase().replace(/\s+/g, '')}`
          },
          date: '', // Não informado no retorno, deixar vazio ou formatar se disponível
          time: '', // Não informado no retorno
          status: item.status.toLowerCase(), // "DENUNCIADO" para "denunciado"
          comments: 0, // não informado
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

  const getStatusText = (status) => {
    switch(status) {
      case 'denunciado': return 'Denunciado';
      case 'resolvido': return 'Resolvido';
      case 'pendente': return 'Pendente';
      case 'analise': return 'Em Análise';
      default: return status;
    }
  };


  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    alert(`Status da denúncia ${reportId} alterado para ${getStatusText(newStatus)}`);
  };


  return (
    <div className="admin-container">
      <Nav />
      <main className="content">
        <div className="page-header">
          <h1 className="page-title">Painel de Denúncias</h1>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <FaDownload /> Exportar
            </button>
            <button className="btn btn-secondary">
               Remover Denúncia
            </button>
          </div>
        </div>

        <Stats reports={reports} />
        
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Denúncias por Status</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: 'var(--cor-pendente)' }}></div>
                  <span>Pendente</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: 'var(--cor-analise)' }}></div>
                  <span>Em Análise</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: 'var(--cor-resolvido)' }}></div>
                  <span>Resolvido</span>
                </div>
              </div>
            </div>
            <StatusChart reports={reports} />
          </div>
          {/* <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Denúncias por Categoria</h3>
            </div>
            <CategoryChart reports={reports} />
          </div> */}
        </div>

        <Reports 
          reports={reports} 
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
};

export default Admin;
