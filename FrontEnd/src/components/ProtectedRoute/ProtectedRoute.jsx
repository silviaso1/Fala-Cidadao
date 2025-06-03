import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  let result;
  const token = localStorage.getItem('token');
  token ? result = children : result = <Navigate to="/auth/login" replace />;
  return result;

};

export default ProtectedRoute;
