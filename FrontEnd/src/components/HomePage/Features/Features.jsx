import { FaMapMarkedAlt, FaBullhorn, FaUsers } from 'react-icons/fa';
import './Features.scss';

const Features = () => {
  return (
    <section id="recursos" className="recursos">
      <div className="container">
        <div className="recursos-titulo" data-anime="top">
          <h3>Como o Fala Cidadão funciona</h3>
          <p>Uma plataforma simples e poderosa para transformação urbana</p>
        </div>
        <div className="recursos-grid">
          <div className="recurso-card" data-anime="left">
            <div className="recurso-icone">
              <FaMapMarkedAlt />
            </div>
            <h4>Mapa Interativo</h4>
            <p> Filtre por praças e parques, principais espaços urbanos, ou selecione qualquer qualquer local da cidade no mapa.</p>
          </div>
          <div className="recurso-card" data-anime="top">
            <div className="recurso-icone">
              <FaBullhorn />
            </div>
            <h4>Reporte Fácil</h4>
            <p>Reporte problemas urbanos em poucos cliques. Seu relato é geolocalizado automaticamente.</p>
          </div>
          <div className="recurso-card" data-anime="right">
            <div className="recurso-icone">
              <FaUsers />
            </div>
            <h4>Comunidade Ativa</h4>
            <p>Apoie denúncias e acompanhe as soluções.</p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Features;