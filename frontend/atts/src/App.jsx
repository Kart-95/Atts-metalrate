import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PurityManagement from "./pages/PurityManagement";
import MetalRateManagement from "./pages/MetalRateManagement";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/purities" style={{ marginRight: "10px" }}>Purity Management</Link>
        <Link to="/rates">Metal Rate Management</Link>
      </nav>
      <Routes>
        <Route path="/purities" element={<PurityManagement />} />
        <Route path="/rates" element={<MetalRateManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
