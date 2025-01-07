import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import '../styles/index.css'

import Header from "../components/Header";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Questions from "../pages/Questions";

function App() {

    return (
        <div className='text-center h-screen flex flex-col justify-between'>
            <Header />

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/questions" element={<Questions />} />
                </Routes>
            </Router>

        </div>
    )
}

export default App
