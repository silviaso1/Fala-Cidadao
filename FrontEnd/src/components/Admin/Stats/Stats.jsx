import { FaFlag, FaClock, FaSearch, FaCheck, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Stats.scss';

const Stats = ({ reports }) => {
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'denunciado').length;
  const analysisReports = reports.filter(r => r.status === 'analise').length;
  const resolvedReports = reports.filter(r => r.status === 'resolvido').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-title">Total de Denúncias</div>
          <div className="stat-icon">
            <FaFlag />
          </div>
        </div>
        <div className="stat-value">{totalReports}</div>
        <div className="stat-change positive">
          <FaArrowUp /> {Math.floor(totalReports/3)} esta semana
        </div>
      </div>
      
      <div className="stat-card pendente">
        <div className="stat-header">
          <div className="stat-title">Pendentes</div>
          <div className="stat-icon">
            <FaClock />
          </div>
        </div>
        <div className="stat-value">{pendingReports}</div>
        <div className="stat-change negative">
          <FaArrowUp /> {Math.floor(pendingReports/2)} hoje
        </div>
      </div>
      
      <div className="stat-card analise">
        <div className="stat-header">
          <div className="stat-title">Em Análise</div>
          <div className="stat-icon">
            <FaSearch />
          </div>
        </div>
        <div className="stat-value">{analysisReports}</div>
        <div className="stat-change positive">
          <FaArrowDown /> {Math.floor(analysisReports/2)} esta semana
        </div>
      </div>
      
      <div className="stat-card resolvido">
        <div className="stat-header">
          <div className="stat-title">Resolvidos</div>
          <div className="stat-icon">
            <FaCheck />
          </div>
        </div>
        <div className="stat-value">{resolvedReports}</div>
        <div className="stat-change positive">
          <FaArrowUp /> {Math.floor(resolvedReports/3)} este mês
        </div>
      </div>
    </div>
  );
};

export default Stats;