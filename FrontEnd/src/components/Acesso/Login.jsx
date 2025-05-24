import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Acesso.scss'; 
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Acesso() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return (
    <>
      <div className="container-fluid min-vh-100 d-md-flex align-items-center acesso-wrapper p-0">
        <div className="col-md-6 d-flex flex-column justify-content-center p-5 welcome-section text-white " >
        <img src="/logo.png" alt="logo" className="mb-4" width={60} />
        <h1 className="fw-bold mb-3">Bem-vindo</h1>
        <p className="text-light">
          Conecte-se com outros cidadãos para reportar problemas urbanos e acompanhar soluções em tempo real.
        </p>
      </div>

      <section className="login-section">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Entrar na conta</h2>

            <form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">E-mail</label>
                <div className="input-field">
                  <FontAwesomeIcon icon={faEnvelope}  className='icon'/>
                  <input type="email" id="email" placeholder="seu@email.com" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="senha" className="form-label">Senha</label>
                <div className="input-field">
                  <FontAwesomeIcon icon={faLock} className='icon' />
                  <input
                    type={senhaVisivel ? 'text' : 'password'}
                    id="senha"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={alternarVisibilidadeSenha}
                  >
                    <FontAwesomeIcon icon={senhaVisivel ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" id="lembrar" />
                  <span>Lembrar de mim</span>
                </label>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
              </div>

              <button type="submit" className="login-button">Entrar</button>

              <div className="signup-link">
                Não tem uma conta? <a href="#">Cadastre-se</a>
              </div>
            </form>
          </div>
        </div>
      </section>
     </div>
    </>
  );
}

export default Acesso;