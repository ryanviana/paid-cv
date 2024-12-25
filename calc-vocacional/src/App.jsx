import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './styles/index.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Instructions from "./pages/Instructions";
import Questions from "./pages/Questions";

function App() {

    return (
        <div className='text-center h-screen flex flex-col justify-between'>
            <Header />

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/questions" element={<Questions />} />
                </Routes>
            </Router>

            <Footer />
        </div>
    )
}

export default App
