import { useState } from 'react'

import ImageQuestion from "../../components/ImageQuestion";
import { weight_question_1 as weight_question } from '../../data/QuestionsWeight'
import { statement_question_1 as statement_question } from '../../data/QuestionsStatements'


function P1({ proximaPergunta }) {

    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            
            <ImageQuestion proximaPergunta={proximaPergunta} 
                            weight_question={weight_question} statement_question={statement_question} />

        </div>
    );
}

export default P1;
