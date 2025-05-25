import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import Acesso from './components/Acesso/Acesso';
import Principal from './Pages/Principal/Principal';

function App() {
  return (
    <Router>
      <section id='app'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/posts' element={<Principal />} />
          <Route path='/auth' element={<Acesso />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
