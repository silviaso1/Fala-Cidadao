import './styles/App.scss';
import Header from "./components/Home/Header/Header";
import Topo from "./components/Home/Topo/Topo";
import Features from './components/Home/Features/Features';
import Footer from './components/Home/Footer/Footer';
import CTA from './components/Home/Diferenca/Diferenca';
function App() {

  return (
    <section id='app'>
      <Header />
      <Topo />
      <Features />
      <CTA />
      <Footer />
    </section>
  )
}

export default App
