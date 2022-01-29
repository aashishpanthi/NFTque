import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Connection from "./components/wallets/Connection";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import MintNFT from "./pages/MintNFT";
import { ThirdwebProvider } from "@3rdweb/react";

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
        <Navbar Connection={Connection} />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/collections" element={<Collections />} />
          <Route exact path="/mint" element={<MintNFT />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route
            exact
            path="/"
            element={<Home Connection={Connection} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
