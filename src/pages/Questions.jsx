import { useState } from 'react'

import ImageQuestion from "../components/ImageQuestion";
import SelectQuestion from "../components/SelectQuestion";
import Result from "./Result";
import ExplicacaoImagem from "./ExplicacaoImagem"
import ExplicacaoSelect from "./ExplicacaoSelect"

// defines das areas
import * as Defines from '../data/Defines';

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

    const [pontuacaoTotal, setPontuacaoTotal] = useState(Array(Defines.numAreas).fill(0))
    const [perguntaAtual, setperguntaAtual] = useState(0);

    const updatePontuacao = (pontuacao) => {
        // calcula pontuação da questão
        let updatedPontuacaoQuestaoAtual = [...pontuacaoQuestao[perguntaAtual]]
        updatedPontuacaoQuestaoAtual = updatedPontuacaoQuestaoAtual.map((x, i) => pontuacao[i] - x)

        // calcula pontuação total
        let updatedPontuacao = [...pontuacaoTotal]
        updatedPontuacao = updatedPontuacao.map((x, i) => x + updatedPontuacaoQuestaoAtual[i])
        console.log("Pontuação total: " + updatedPontuacao)
        setPontuacaoTotal(updatedPontuacao)

        // atualiza as pontuações das questoes
        let updatedPontuacaoQuestao = [...pontuacaoQuestao]
        updatedPontuacaoQuestao[perguntaAtual] = pontuacao
        console.log("Pontuação questao: " + pontuacao)
        setPontuacaoQuestao(updatedPontuacaoQuestao)
    }

    const updatePagina = (dir) => {
        setperguntaAtual(perguntaAtual + dir)
    }
    
    const updatePerguntaAtual = (pontuacao, dir) => {
        if (dir === 1) updatePontuacao(pontuacao)
        updatePagina(dir)
    }
    
    const paginas = [
        <ExplicacaoImagem key="ex1" updatePagina={updatePagina} />,
        <ImageQuestion key="q1" weight_question={weight_question_1} statement_question={statement_question_1} updatePerguntaAtual={updatePerguntaAtual} />,
        <ImageQuestion key="q2" weight_question={weight_question_2} statement_question={statement_question_2} updatePerguntaAtual={updatePerguntaAtual} />,
        <ImageQuestion key="q3" weight_question={weight_question_3} statement_question={statement_question_3} updatePerguntaAtual={updatePerguntaAtual} />,
        <ImageQuestion key="q4" weight_question={weight_question_4} statement_question={statement_question_4} updatePerguntaAtual={updatePerguntaAtual} />,
        <Result key="res1" pontuacaoTotal={pontuacaoTotal} type='parcial' updatePagina={updatePagina} />,
        <ExplicacaoSelect key="ex2" updatePagina={updatePagina} />,
        <SelectQuestion key="q5" weight_question={weight_question_5} statement_question={statement_question_5} updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q6" weight_question={weight_question_6} statement_question={statement_question_6} updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q7" weight_question={weight_question_7} statement_question={statement_question_7} updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q8" weight_question={weight_question_8} statement_question={statement_question_8} updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q9" weight_question={weight_question_9} statement_question={statement_question_9} updatePerguntaAtual={updatePerguntaAtual} />,
        <SelectQuestion key="q10" weight_question={weight_question_10} statement_question={statement_question_10} updatePerguntaAtual={updatePerguntaAtual} />,
        <Result key="res2" pontuacaoTotal={pontuacaoTotal} type='total' updatePagina={updatePagina} />,
    ];

    const [pontuacaoQuestao, setPontuacaoQuestao] = useState(Array(paginas.length).fill(Array(Defines.numAreas).fill(0)))

    return (
        <div className='flex flex-col w-full h-full items-center text-center'>
            {paginas[perguntaAtual]}
        </div>
    )
}

export default Questions;
