import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import MintNFT from "./pages/MintNFT";
import { ThirdwebProvider } from "@3rdweb/react";
import MyNFTs from "./pages/MyNFTs";
import MyNFT from "./pages/MyNFT";

function App() {
  const supportedChainIds = [4];

  const connectors = {
    injected: {},
  };

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/collections" element={<Collections />} />
          <Route exact path="/mint" element={<MintNFT />} />
          <Route exact path="/mynfts" element={<MyNFTs />} />
          <Route exact path="/mynfts/:id" element={<MyNFT />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
