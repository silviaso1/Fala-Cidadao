import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.scss';
import { faEnvelope, faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

function Auth() {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [modoLogin, setModoLogin] = useState(true); // true = login, false = registro

    const alternarVisibilidadeSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const alternarModo = () => {
        setModoLogin(!modoLogin);
        setSenhaVisivel(false);
    };

    return (
        <div className="container-fluid min-vh-100 d-md-flex align-items-center p-0">

            <div className="col-md-6 d-flex flex-column justify-content-center p-5 text-white text-center lado">
                <div>
                    <img src="/logo.png" alt="logo" className="mb-4" width={60} />
                </div>
                
                <h1 className="fw-bold mb-3">Bem-vindo</h1>
                <p className="text-light">
                    Conecte-se com outros cidadãos para reportar problemas urbanos e acompanhar soluções em tempo real.
                </p>
            </div>

            <section className="d-flex justify-content-center flex-fill px-5">
                <div className="w-75 auth-container">
                    <div className="auth-card p-4">
                        <h5 className="text-center fw-semibold mb-3">{modoLogin ? 'Entrar na conta' : 'Criar nova conta'}</h5>

                        <form className='d-flex flex-column gap-3'>
                            {!modoLogin && (
                                <div>
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <div className='position-relative'>
                                        <FontAwesomeIcon icon={faUser} className="icon" />
                                        <input className='w-100' type="text" id="nome" placeholder="Seu Nome" required />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <div className='position-relative'>
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <input className='w-100' type="email" id="email" placeholder="seu@email.com" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="senha" className="form-label">Senha</label>
                                <div className='position-relative'>
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input className='w-100'
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

                            {modoLogin && (
                                <div className="form-options">
                                    <label className="remember-me d-flex align-items-center gap-3 ps-1">
                                        <input className='' type="checkbox" id="lembrar" />
                                        <span>Lembrar de mim</span>
                                    </label>
                                    <a href="#" className="forgot-password">Esqueceu a senha?</a>
                                </div>
                            )}

                            <button type="submit" className="auth-button">
                                {modoLogin ? 'Entrar' : 'Cadastrar'}
                            </button>

                            <div className="text-center">
                                {modoLogin ? 'Não tem uma conta' : 'Já tem uma conta'}
                                
                                <button type="button" className="link-button" onClick={alternarModo}>
                                    {modoLogin ? 'Cadastre-se' : 'Entrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Auth;
