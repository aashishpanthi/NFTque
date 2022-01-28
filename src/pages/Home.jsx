import About from "../components/About";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Items from "../components/Items";
import Ready from "../components/Ready";

const Home = ({ MetaMaskAuth }) => {

  return (
    <>
      <HeroSection />
      <About />
      <Items />
      <Ready MetaMaskAuth={MetaMaskAuth} />
      <Footer />
    </>
  );
};

export default Home;