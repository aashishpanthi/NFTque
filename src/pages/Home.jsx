import About from "../components/About";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Items from "../components/Items";
import Ready from "../components/Ready";

const Home = ({ Connection }) => {

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