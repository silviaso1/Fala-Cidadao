import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import Acesso from './components/Acesso/Acesso';
import Principal from './Pages/Principal/Principal';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

function AppContent() {
  const location = useLocation();
  
  // Oculta o layout (Navbar e Footer) nas rotas /auth e /posts
  const noLayoutRoutes = ['/auth', '/posts'];
  const noLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <section id="app">
      {!noLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Principal />} />
        <Route path="/auth" element={<Acesso />} />
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
