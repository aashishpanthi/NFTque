import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import MetaMaskAuth from "./components/wallets/Connection";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";

function App() {
  return (
    <>
      <Router>
        <Navbar MetaMaskAuth={MetaMaskAuth} />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/collections" element={<Collections />} />
          <Route exact path="/" element={<Home MetaMaskAuth={MetaMaskAuth} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
