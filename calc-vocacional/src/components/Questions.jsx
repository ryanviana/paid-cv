import { useState } from 'react'

import P1 from "./perguntas/P1";
import P2 from "./perguntas/P2";
import P3 from "./perguntas/P3";

function Questions() {

    // Cada fase indica qual "parte" o usuário está do teste
    const [perguntaAtual, setperguntaAtual] = useState(0);
    const perguntas = [
        <P1 key="q1" setperguntaAtual={setperguntaAtual} perguntaAtual={perguntaAtual}/>,
        <P2 key="q2" setperguntaAtual={setperguntaAtual} perguntaAtual={perguntaAtual}/>,
        <P3 key="q3"/>
    ];

    return (
        <div className='flex flex-col w-full items-center text-center'>
            {perguntas[perguntaAtual]}
        </div>
    )
}

export default Questions;
