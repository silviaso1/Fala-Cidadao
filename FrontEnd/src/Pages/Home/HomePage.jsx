
import Header from "../../components/Home/Header/Header";
import Features from '../../components/Home/Features/Features';
import CTA from '../../components/Home/Diferenca/Diferenca';
import FAQ from "../../components/Home/FAQ/FAQ";
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