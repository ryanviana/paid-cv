import { useState } from 'react'

function SelectQuestion({ proximaPergunta, weight_question, statement_question }) {

    const [checkedItems, setCheckedItems] = useState([]);

    
    const handleCheckboxChange = (index) => {
        setCheckedItems((prev) => {
            if (prev.includes(index)) return prev.filter((item) => item !== index);
            if (prev.length < 3) return [...prev, index];
            alert("Não é possível selecionar mais de 3 frases")
            return prev;
        });
    };

    const validacaoNumFrases = () => {
        if (checkedItems.length !== 3) {
            alert('Necessário selecionar 3 frases.')
            return false
        }
        return true
    }

    const calculaPontuacaoQuestao = () => {
        let pontuacao = [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        if (!validacaoNumFrases()) return

        const pontuacao = calculaPontuacaoQuestao()
        
        proximaPergunta(pontuacao)
    }


    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full px-10 py-10'>
            <div>
                <h2 className='font-montserrat text-gray-600 font-bold text-3xl'>Parte 2 - Avaliação de interesses </h2>
                <h3 className='font-questrial'>Escolha as três frases com as quais você mais se identifica</h3>
            </div>

            <div className='flex flex-col gap-5 items-start w-fit font-questrial text-xl mt-5'>

                <h1 className='font-montserrat text-xl'>{statement_question['title']}</h1>

                {statement_question['phrases'].map((label, index) => (
                    <div key={index} className={`p-2 transition hover:bg-gray-100 ${checkedItems.includes(index) ? "bg-blue-100" : ""}`}>
                        <input type="checkbox" checked={checkedItems.includes(index)} onChange={() => handleCheckboxChange(index)} className="cursor-pointer mr-5 w-6 h-6 transition-all duration-500 ease-in-out hover:scale-110" />
                        <label>{label}</label>
                    </div>
                ))}

            </div>

            <button onClick={proxPergunta}
                className='font-bold text-white font-montserrat p-3 px-5 bg-jornadas-blue rounded-lg m-5 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default SelectQuestion;
