import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import './Diferenca.scss';

const Diferenca = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-conteudo" data-anime="top">
          <h3>Pronto para fazer a diferença?</h3>
          <p>Junte-se a milhares de cidadãos ativos que estão transformando suas cidades através da participação coletiva.</p>
          <div className="cta-botoes">
            <a href="login.html" className="botao botao-primario">
              <FaUserPlus /> Criar conta gratuita
            </a>
          </div>
          <div className="cta-participantes">
            <div className="participantes-avatars">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Participante" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Participante" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Participante" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Participante" />
              <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Participante" />
            </div>
            <div className="participantes-texto">
              <p><strong>+5.000 cidadãos</strong> já estão transformando suas cidades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diferenca;