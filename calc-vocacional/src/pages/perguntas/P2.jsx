import { useState } from 'react'

import ImageQuestion from "../ImageQuestion";
import { weight_question_2 as weight_question } from '../../data/QuestionsWeight'
import { statement_question_2 as statement_question } from '../../data/QuestionsStatements'


function P1({ updatePerguntaAtual, updatePontuacaoTotal }) {

    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            
            <ImageQuestion updatePerguntaAtual={updatePerguntaAtual} updatePontuacaoTotal={updatePontuacaoTotal} 
                            weight_question={weight_question} statement_question={statement_question} />
            
        </div>
    );
}

export default P1;
