import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import Auth from './pages/Auth/Auth';
import Complaint from './pages/Complaint/Complaint';
import Admin from './pages/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';


import './styles/App.scss';

function AppContent() {

  return (
    <section id="app">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:mode" element={<Auth />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <ProtectedRoute adminOnly={true}></ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

    </section>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
