import { useState } from 'react'
import './styles/index.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import P1 from "./components/perguntas/P1";
import P2 from "./components/perguntas/P2";
import P3 from "./components/perguntas/P3";

function App() {

    // Cada fase indica qual "parte" o usuário está do teste
    const [faseAtual, setfaseAtual] = useState(0);
    const fases = [
        <P1 key="q1" />,
        <P2 key="q2" />,
        <P3 key="q3" />
    ];

    return (
        <div className='text-center h-screen'>

            <Header />

            <h1 className='m-5'>Questionário</h1>
            <div>{fases[faseAtual]}</div>
            <button onClick={() => setfaseAtual(faseAtual + 1)} 
                    className='p-1 bg-gray-300 rounded-lg m-5'>
                Próxima Pergunta
            </button>
            
            <Footer />

        </div>
    )
}

export default App
