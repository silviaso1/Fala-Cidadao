import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer); // limpa o timer se o componente for desmontado
  }, [navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Página não encontrada!</h1>
      <p>A rota acessada não existe.</p>
      <p>Redirecionando para a página inicial...</p>
    </div>
  );
};

export default NotFound;
