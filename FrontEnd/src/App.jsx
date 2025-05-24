import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import Acesso from './components/Acesso/Acesso';

function App() {
  return (
    <Router>
      <section id='app'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<Acesso />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
