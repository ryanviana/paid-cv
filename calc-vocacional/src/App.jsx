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
        <P1 key="q1" setfaseAtual={setfaseAtual} faseAtual={faseAtual}/>,
        <P2 key="q2" setfaseAtual={setfaseAtual} faseAtual={faseAtual}/>,
        <P3 key="q3" setfaseAtual={setfaseAtual} faseAtual={faseAtual}/>
    ];

    return (
        <div className='text-center h-screen flex flex-col justify-between'>
            <Header />

            {fases[faseAtual]}
            
            <Footer/>
        </div>
    )
}

export default App
