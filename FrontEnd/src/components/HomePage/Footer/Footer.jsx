import './Footer.scss';
import Logo from "../../../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-conteudo d-grid d-md-flex justify-content-around">
          <div className="rodape-sobre">
            <div className="rodape-logo">
              <img src={Logo} alt="Logo" />
            </div>
            <p>Plataforma dedicada à participação cidadã e <br/>melhoria da comunicação entre população e governo.</p>
          </div>
          <div className="rodape-links">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#recursos">Recursos</a></li>
              <li><a href="#FAQ">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="rodape-copyright">
          <p>© 2025 Fala Cidadão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
