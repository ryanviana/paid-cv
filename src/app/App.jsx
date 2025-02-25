// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/index.css";
import Header from "../components/Header";
import LandingPage from "../pages/LandingPage";
import Questions from "../pages/Questions";
import Result from "../pages/Result";
import { ResultProvider } from "../context/ResultContext";

function App() {
  return (
    <div className="text-center h-screen flex flex-col justify-between">
      <ResultProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/questions" element={<Questions />} />
            <Route
              path="/results"
              element={
                // For /results, we rely entirely on the context data.
                // Ensure that Questions calls setResult() with a non-empty array when done.
                <Result
                  type="total"
                  updatePagina={() => {}}
                  pontuacaoTotal={[]}
                />
              }
            />
          </Routes>
        </Router>
      </ResultProvider>
    </div>
  );
}

export default App;
