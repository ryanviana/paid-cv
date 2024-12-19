import { useState } from 'react'

import P1 from "../components/perguntas/P1";
import P2 from "../components/perguntas/P2";
import P3 from "../components/perguntas/P3";
import P4 from "../components/perguntas/P4";
import P5 from "../components/perguntas/P5";
import P6 from "../components/perguntas/P6";
import P7 from "../components/perguntas/P7";
import P8 from "../components/perguntas/P8";
import P9 from "../components/perguntas/P9";
import P10 from "../components/perguntas/P10";
import Result from "../components/Result";

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
        <P3 key="q3" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P4 key="q4" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <Result key="res1" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='parcial'/>,
        <P5 key="q5" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P6 key="q6" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P7 key="q6" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P8 key="q6" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P9 key="q6" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <P10 key="q6" updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} />,
        <Result key="res2" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='total'/>,
    ];

    return (
        <div className='flex flex-col w-full items-center text-center'>
            {perguntas[perguntaAtual]}
        </div>
    )
}

export default Questions;
