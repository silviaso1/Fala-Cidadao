import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import Acesso from './components/Acesso/Acesso';
import Principal from './Pages/Principal/Principal';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

function AppContent() {
  const location = useLocation();
  const authLayout = location.pathname == '/auth';

  return (
    <section id="app">
      {!authLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Principal />} />
        <Route path="/auth" element={<Acesso />} />
      </Routes>

      {!authLayout && <Footer />}
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
