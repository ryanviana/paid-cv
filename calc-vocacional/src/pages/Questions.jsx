import { useState } from 'react'

import ImageQuestion from "../components/ImageQuestion";
import SelectQuestion from "../components/SelectQuestion";
import Result from "./ResultFront";
import Email from "./Email";
import ExplicacaoImagem from "./ExplicacaoImagem"
import ExplicacaoSelect from "./ExplicacaoSelect"

// enunciados das perguntas
import { statement_question_1 } from '../data/QuestionsStatements'
import { statement_question_2 } from '../data/QuestionsStatements'
import { statement_question_3 } from '../data/QuestionsStatements'
import { statement_question_4 } from '../data/QuestionsStatements'
import { statement_question_5 } from '../data/QuestionsStatements'
import { statement_question_6 } from '../data/QuestionsStatements'
import { statement_question_7 } from '../data/QuestionsStatements'
import { statement_question_8 } from '../data/QuestionsStatements'
import { statement_question_9 } from '../data/QuestionsStatements'
import { statement_question_10 } from '../data/QuestionsStatements'

// pesos de cada item das perguntas
import { weight_question_1 } from '../data/QuestionsWeight'
import { weight_question_2 } from '../data/QuestionsWeight'
import { weight_question_3 } from '../data/QuestionsWeight'
import { weight_question_4 } from '../data/QuestionsWeight'
import { weight_question_5 } from '../data/QuestionsWeight'
import { weight_question_6 } from '../data/QuestionsWeight'
import { weight_question_7 } from '../data/QuestionsWeight'
import { weight_question_8 } from '../data/QuestionsWeight'
import { weight_question_9 } from '../data/QuestionsWeight'
import { weight_question_10 } from '../data/QuestionsWeight'


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
        <ExplicacaoImagem key="ex1" updatePerguntaAtual={updatePerguntaAtual} />,
        <ImageQuestion key="q1" proximaPergunta={proximaPergunta} weight_question={weight_question_1} statement_question={statement_question_1} />,
        <ImageQuestion key="q2" proximaPergunta={proximaPergunta} weight_question={weight_question_2} statement_question={statement_question_2} />,
        <ImageQuestion key="q3" proximaPergunta={proximaPergunta} weight_question={weight_question_3} statement_question={statement_question_3} />,
        <ImageQuestion key="q4" proximaPergunta={proximaPergunta} weight_question={weight_question_4} statement_question={statement_question_4} />,
        <Result key="res1" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='parcial' />,
        <ExplicacaoSelect key="ex2" updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q5"  proximaPergunta={proximaPergunta} weight_question={weight_question_5} statement_question={statement_question_5} />,
        <SelectQuestion key="q6"  proximaPergunta={proximaPergunta} weight_question={weight_question_6} statement_question={statement_question_6} />,
        <SelectQuestion key="q7"  proximaPergunta={proximaPergunta} weight_question={weight_question_7} statement_question={statement_question_7} />,
        <SelectQuestion key="q8"  proximaPergunta={proximaPergunta} weight_question={weight_question_8} statement_question={statement_question_8} />,
        <SelectQuestion key="q9"  proximaPergunta={proximaPergunta} weight_question={weight_question_9} statement_question={statement_question_9} />,
        <SelectQuestion key="q10"  proximaPergunta={proximaPergunta} weight_question={weight_question_10} statement_question={statement_question_10} />,
        <Result key="res2" updatePerguntaAtual={updatePerguntaAtual} pontuacaoTotal={pontuacaoTotal} type='total' />,
        <Email key="email" pontuacaoTotal={pontuacaoTotal} />,
    ];

    return (
        <div className='flex flex-col w-full h-full items-center text-center'>
            {perguntas[perguntaAtual]}
        </div>
    )
}

export default Questions;
