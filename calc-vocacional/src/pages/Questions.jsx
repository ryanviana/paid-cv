import { useState } from 'react'

import P1 from "./perguntas/P1";
import P2 from "./perguntas/P2";
import P3 from "./perguntas/P3";
import P4 from "./perguntas/P4";
import P5 from "./perguntas/P5";
import P6 from "./perguntas/P6";
import P7 from "./perguntas/P7";
import P8 from "./perguntas/P8";
import P9 from "./perguntas/P9";
import P10 from "./perguntas/P10";
import Result from "./ResultFront";
import Email from "./Email";

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

    const proximaPergunta = (pontuacao) => {
        updatePontuacaoTotal(pontuacao)
        updatePerguntaAtual()
    }

    // Cada fase indica qual "parte" o usuário está do teste
    const perguntas = [
        <P1 key="q1" proximaPergunta={proximaPergunta} />,
        <P2 key="q2" proximaPergunta={proximaPergunta} />,
        <P3 key="q3" proximaPergunta={proximaPergunta} />,
        <P4 key="q4" proximaPergunta={proximaPergunta} />,
        <Result key="res1" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='parcial' />,
        <P5 key="q5" proximaPergunta={proximaPergunta} />,
        <P6 key="q6" proximaPergunta={proximaPergunta} />,
        <P7 key="q6" proximaPergunta={proximaPergunta} />,
        <P8 key="q6" proximaPergunta={proximaPergunta} />,
        <P9 key="q6" proximaPergunta={proximaPergunta} />,
        <P10 key="q6" proximaPergunta={proximaPergunta} />,
        <Result key="res2" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='total' />,
        <Email key="email" pontuacaoTotal={pontuacaoTotal} />,
    ];

    return (
        <div className='flex flex-col w-full items-center text-center h-full'>
            {perguntas[perguntaAtual]}
        </div>
    )
}

export default Questions;
