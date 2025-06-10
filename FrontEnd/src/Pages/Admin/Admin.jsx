import { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from '../../components/Admin/Stats/Stats';
import Reports from '../../components/Admin/Reports/Reports';
import StatusChart from '../../components/Admin/Charts/StatusChart';
// import CategoryChart from '../../components/Admin/Charts/CategoryChart';
import "./Admin.scss";

const Admin = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/denuncias'); 
        const apiData = response.data;

        const mappedReports = apiData.map(item => ({
          id: item.id,
          title: item.titulo,
          content: item.descricao,
          user: {
            avatar: item.usuario.nome ? item.usuario.nome.charAt(0).toUpperCase() : '',
            name: item.usuario.nome,
            username: `@${item.usuario.nome.toLowerCase().replace(/\s+/g, '')}`
          },
          date: '',
          time: '',
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


  return (
    <div className="admin-container">
      <main className="content">
        <div className="page-header">
          <h1 className="page-title">Olá! Bom te ter aqui novamente!</h1>
        </div>

       <div className='stats'>
         <Stats reports={reports} />
        
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Denúncias por Status</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" ></div>
                  <span>Pendente</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color"></div>
                  <span>Em Análise</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color"></div>
                  <span>Resolvido</span>
                </div>
              </div>
            </div>
            <StatusChart reports={reports} />
            {console.log(reports)}
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
       </div>
      </main>
    </div>
  );
};

export default Admin;
