
import Header from "../../components/HomePage/Header/Header";
import Features from '../../components/HomePage/Features/Features';
import CTA from '../../components/HomePage/Diferenca/Diferenca';
import FAQ from "../../components/HomePage/FAQ/FAQ";
import Navbar from "../../components/HomePage/Navbar/Navbar";
import Footer from "../../components/HomePage/Footer/Footer";
function HomePage() {

  return (
    <section id='home'>
      <Navbar/>
      <Header />
      <Features />
      <FAQ />
      <CTA />
      <Footer/>
    </section>
  )
}

export default HomePage;