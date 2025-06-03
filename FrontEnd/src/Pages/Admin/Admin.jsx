import React, { useState, useEffect } from 'react';
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
    // Simulação de chamada API
    const fetchData = async () => {
  
      const data = [
        {
          id: "GC-00142",
          title: "Buraco na Rua das Flores",
          content: "Buraco grande na altura do número 120, causando problemas para os carros. Risco de acidente.",
          category: "buraco",
          user: {
            avatar: "JL",
            name: "Joana Lima",
            username: "@joanalima"
          },
          date: "03/06/2025",
          time: "14:32",
          status: "pendente",
          priority: "high",
          supporters: 15,
          comments: 8,
          location: "Rua das Flores, 120 - Centro"
        },
        {
          id: "GC-00143",
          title: "Buraco na Rua das Flores",
          content: "Buraco grande na altura do número 120, causando problemas para os carros. Risco de acidente.",
          category: "buraco",
          user: {
            avatar: "JL",
            name: "Joana Lima",
            username: "@joanalima"
          },
          date: "03/06/2025",
          time: "14:32",
          status: "pendente",
          priority: "high",
          supporters: 15,
          comments: 8,
          location: "Rua das Flores, 120 - Centro"
        },
      
      ];
      setReports(data);
    };
    
    fetchData();
  }, []);

  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    alert(`Status da denúncia ${reportId} alterado para ${getStatusText(newStatus)}`);
  };

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Visualizando denúncia: ${report.title}\n\nDescrição: ${report.content}\n\nLocal: ${report.location}\n\nStatus: ${getStatusText(report.status)}\n\nCategoria: ${getCategoryText(report.category)}`);
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pendente': return 'Pendente';
      case 'analise': return 'Em Análise';
      case 'resolvido': return 'Resolvido';
      default: return status;
    }
  };

  const getCategoryText = (category) => {
    switch(category) {
      case 'iluminacao': return 'Iluminação Pública';
      case 'buraco': return 'Buraco na Via';
      case 'lixo': return 'Lixo Acumulado';
      case 'transito': return 'Problema de Trânsito';
      default: return 'Outros';
    }
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
               Remover Denúnica
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
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Denúncias por Categoria</h3>
            </div>
            <CategoryChart reports={reports} />
          </div>
        </div>

        <Reports 
          reports={reports} 
          onStatusChange={handleStatusChange}
          onViewReport={handleViewReport}
        />
      </main>
    </div>
  );
};

export default Admin;