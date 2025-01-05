import { useState } from 'react'

function SelectQuestion({ updatePerguntaAtual, updatePontuacaoTotal, weight_question, statement_question }) {

    const [checkedItems, setCheckedItems] = useState([]);
    const [pontuacaoQuestao, setPontuacaoQuestao] = useState([]) // vai ter tamanho igual ao numero de profissões

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

    const updatePontuacao = (pontuacaoAtual) => {
        let pontuacaoUpdated = [...pontuacaoAtual]
        if (pontuacaoQuestao.length !== 0) pontuacaoUpdated = pontuacaoAtual.map((x, i) => x - pontuacaoQuestao[i])

        setPontuacaoQuestao(pontuacaoAtual)
        updatePontuacaoTotal(pontuacaoUpdated)
    }

    const proxPergunta = () => {
        if (!validacaoNumFrases()) return

        const pontuacao = calculaPontuacaoQuestao()
        updatePontuacao(pontuacao)

        updatePerguntaAtual()
    }


    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            <div>
                <h2>Parte 2 - Avaliação de interesses </h2>
                <h3>Escolha as três frases com as quais você mais se identifica</h3>
            </div>

            <div className='flex flex-col gap-5 items-start w-fit text-2xl'>

                <h1 className='font-bold text-3xl'>{statement_question['title']}</h1>

                {statement_question['phrases'].map((label, index) => (
                    <div key={index} className={`p-3 transition hover:bg-gray-100 ${checkedItems.includes(index) ? "bg-blue-100" : ""}`}>
                        <input type="checkbox" checked={checkedItems.includes(index)} onChange={() => handleCheckboxChange(index)} className="cursor-pointer mr-5 w-6 h-6 transition-all duration-500 ease-in-out hover:scale-110" />
                        <label>{label}</label>
                    </div>
                ))}

            </div>

            <button onClick={proxPergunta}
                className='p-1 px-5 bg-gray-300 rounded-lg m-5 transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default SelectQuestion;
