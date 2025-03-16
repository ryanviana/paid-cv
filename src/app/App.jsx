// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/index.css";
import Header from "../components/Header";
import LandingPage from "../pages/LandingPage";
import Questions from "../pages/Questions";
import Payment from "../pages/Payment";
import Result from "../pages/Result";
import ResultToken from "../pages/results/ResultToken";
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
            <Route path="/payment" element={<Payment />} />
            {/* Preview results route: shows partial (type="parcial") results */}
            <Route
              path="/results/preview"
              element={
                <Result
                  type="parcial"
                  updatePagina={() => {
                    // When the user clicks “Próxima pergunta” on the preview page,
                    // we want to continue the test at question index 5.
                    localStorage.setItem("questions_perguntaAtual", 5);
                    window.location.href = "/questions";
                  }}
                  pontuacaoTotal={[]}
                />
              }
            />
            {/* Final results route: shows final (type="total") results */}
            <Route
              path="/results"
              element={
                <Result
                  type="total"
                  updatePagina={() => {}}
                  pontuacaoTotal={[]}
                />
              }
            />
            <Route
              path="/results/:token"
              element={
                <ResultToken
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
