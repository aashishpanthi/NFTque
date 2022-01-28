import About from "../components/About";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Items from "../components/Items";
import Navbar from "../components/Navbar";
import Ready from "../components/Ready";
import MetaMaskAuth from "../components/wallets/Connection";

const Home = () => {

  return (
    <>
      <Navbar MetaMaskAuth={MetaMaskAuth} />
      <HeroSection />
      <About />
      <Items />
      <Ready MetaMaskAuth={MetaMaskAuth} />
      <Footer />
    </>
  );
};

export default Home;