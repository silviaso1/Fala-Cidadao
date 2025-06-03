
import Header from "../../components/HomePage/Header/Header";
import Features from '../../components/HomePage/Features/Features';
import CTA from '../../components/HomePage/Diferenca/Diferenca';
import FAQ from "../../components/HomePage/FAQ/FAQ";

function HomePage() {

  return (
    <section id='home'>
      <Header />
      <Features />
      <FAQ />
      <CTA />
    </section>
  )
}

export default HomePage;