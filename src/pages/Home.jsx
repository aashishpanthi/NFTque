import About from "../components/About";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Items from "../components/Items";
import Ready from "../components/Ready";
import Connection from "../components/wallets/Connection";

const Home = () => {

  return (
    <>
      <HeroSection />
      <About />
      <Items />
      <Ready Connection={Connection} />
      <Footer />
    </>
  );
};

export default Home;