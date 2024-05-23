import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import GradePage from "./pages/GradePage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/grade/:id" element={<GradePage />} />
      </Routes>
    </Router>
  );
}

export default App;
