import { useState } from 'react'

import * as Defines from '../data/Defines';

function SelectQuestion({ weight_question, statement_question, updatePerguntaAtual }) {

    const [checkedItems, setCheckedItems] = useState([]);


    const handleCheckboxChange = (index) => {
        setCheckedItems((prev) => {
            if (prev.includes(index)) return prev.filter((item) => item !== index);
            if (prev.length < 3) return [...prev, index];
            alert("Não é possível selecionar mais de 3 frases")
            return prev;
        });
    };

    const calculaPontuacaoQuestao = () => {
        let pontuacao = Array(Defines.numAreas).fill(0)
        weight_question.forEach((valor, index) => {
            if (checkedItems.includes(index)) pontuacao = pontuacao.map((x, i) => x + valor[i])
            else pontuacao = pontuacao.map((x, i) => x - valor[i])
        });

        // normalizando os valores
        const menorValor = Math.min(...pontuacao);
        if (menorValor < 0) pontuacao = pontuacao.map(x => x + Math.abs(menorValor));

        return pontuacao
    }

    const proxPergunta = () => {
        const pontuacao = calculaPontuacaoQuestao()

        updatePerguntaAtual(pontuacao, 1)
    }


    return (
        <div className='h-fit lg:h-full w-full flex flex-col justify-between items-center p-7'>
            <div>
                <h2 className="font-montserrat text-black font-semibold text-2xl">Escolha as três frases que mais combinam com você:</h2>
            </div>

            <div className='flex flex-col gap-5 items-start w-fit font-questrial text-xl mt-5'>
                <h1 className='font-montserrat text-xl'>{statement_question['title']}</h1>

                {statement_question['phrases'].map((label, index) => (
                    <div
                        key={index}
                        className={`p-2 transition hover:bg-gray-100 ${checkedItems.includes(index) ? "bg-blue-100" : ""} cursor-pointer`}
                        onClick={() => handleCheckboxChange(index)} // Habilita o clique na div inteira
                    >
                        <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            readOnly
                            className="cursor-pointer mr-5 w-6 h-6 transition-all duration-500 ease-in-out hover:scale-110"
                        />
                        <label className='cursor-pointer'>{label}</label>
                    </div>
                ))}
            </div>

            <div className='flex gap-5'>
                <button onClick={() => updatePerguntaAtual(null, -1)}
                    className="font-bold text-white font-montserrat p-3 px-5 mt-12 bg-jornadas-blue rounded-lg lg:mt-10 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105">
                    Voltar Pergunta
                </button>
                <button onClick={proxPergunta}
                    className="font-bold text-white font-montserrat p-3 px-5 mt-12 bg-jornadas-blue rounded-lg lg:mt-10 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105">
                    Próxima Pergunta
                </button>
            </div>
        </div>
    );
}

export default SelectQuestion;
