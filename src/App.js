import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
