import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './styles/index.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Instructions from "./components/Instructions";
import Questions from "./components/Questions";
import Result from "./components/Result";

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
                    <Route path="/results" element={<Result />} />
                </Routes>
            </Router>

            <Footer />
        </div>
    )
}

export default App
