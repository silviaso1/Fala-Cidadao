import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import Auth from './Pages/Auth/Auth';
import Complaint from './Pages/Complaint/Complaint';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

function AppContent() {
  const location = useLocation();
  
  const noLayoutRoutes = ['/auth', '/posts'];
  const noLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <section id="app">
      {!noLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Complaint />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {!noLayout && <Footer />}
    </section>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
