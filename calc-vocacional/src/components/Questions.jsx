import { useState } from 'react'

import P1 from "./perguntas/P1";
import P2 from "./perguntas/P2";
import P3 from "./perguntas/P3";

function Questions() {

    const [pontuacaoTotal, setPontuacaoTotal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [perguntaAtual, setperguntaAtual] = useState(0);

    const updatePontuacaoTotal = (pontuacao) => {
        let updatedPontuacao = [...pontuacaoTotal]
        updatedPontuacao = updatedPontuacao.map((x, i) => x + pontuacao[i])

        console.log("Pontuação final total: " + updatedPontuacao)
        setPontuacaoTotal(updatedPontuacao)
    }

    const updatePerguntaAtual = () => {
        setperguntaAtual(perguntaAtual + 1)
    }

    // Cada fase indica qual "parte" o usuário está do teste
    const perguntas = [
        <P1 key="q1" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P2 key="q2" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P3 key="q3"/>
    ];

    return (
        <div className='flex flex-col w-full items-center text-center'>
            {perguntas[perguntaAtual]}
        </div>
    )
}

export default Questions;
