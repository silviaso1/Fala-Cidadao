import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import Login from './components/Acesso/Login'
import Cadastrar from './components/Acesso/Cadastrar'

function App() {
  return (
    <Router>
      <section id='app'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registrar' element={<Cadastrar />} />

        </Routes>
      </section>
    </Router>
  );
}

export default App;
