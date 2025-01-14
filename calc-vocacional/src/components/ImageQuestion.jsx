import { useState } from 'react'

function ImageQuestion({ proximaPergunta, weight_question, statement_question }) {

    // cada index se refere a uma imagem
    const [hover, setHover] = useState([false, false, false, false]);
    const [interesse, setInteresse] = useState(['', '', '', '']) // 1 - like <-> -1 - dislike  


    const getBorderColor = (number) => {
        if (interesse[number] === "1") return "border-green-500 shadow-green-500 shadow-my"
        if (interesse[number] === "-1") return "border-red-600 shadow-red-600 shadow-my"
        return ""
    }

    const changeHover = (number) => {
        setHover((prevHover) => {
            let updatedHover = [...prevHover]
            updatedHover[number] = !updatedHover[number]

            return updatedHover
        });
    };

    const changeInteresse = (number, interesse) => {
        setInteresse((prevInteresse) => {
            let updatedInteresse = [...prevInteresse]
            if (updatedInteresse[number] !== interesse) updatedInteresse[number] = interesse
            else updatedInteresse[number] = ''

            return updatedInteresse
        })
    }

    const validacaoInteresse = () => {
        if (interesse.includes('')) {
            alert('Necessário votar em todas as fotos.')
            return false
        }
        return true
    }

    const calculaPontuacaoQuestao = () => {
        let pontuacao = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        weight_question.forEach((valor, index) => {
            pontuacao = pontuacao.map((x, i) => x + valor[i] * interesse[index])
        });

        // normalizando os valores
        const menorValor = Math.min(...pontuacao);
        if (menorValor < 0) pontuacao = pontuacao.map(x => x + Math.abs(menorValor));

        return pontuacao
    }

    const proxPergunta = () => {

        if (!validacaoInteresse()) return

        const pontuacao = calculaPontuacaoQuestao()
        
        proximaPergunta(pontuacao)
    }

    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            <div>
                <h2 className='font-montserrat text-gray-600 font-bold text-3xl'>Parte I - Preferência Visual </h2>
                <h3 className='font-questrial'>Selecione os campos de atuação que mais  te interessar e menos te interessar</h3>
            </div>
            <div className='flex justify-center text-center items-center mt-10'>
                <div className="grid grid-cols-1 gap-y-8 h-full place-items-center lg:grid-cols-2">

                    {statement_question.map((img, index) => (
                        <div key={index} className={`relative group w-1/2 border-2 ${getBorderColor(index)}`} onMouseEnter={() => changeHover(index)} onMouseLeave={() => changeHover(index)}>

                            <img src={img['image']} alt={img['label']} className={`w-full h-full object-cover transition duration-200 ${hover[index] ? "blur-md" : "blur-0"}`} />
                            {hover[index] && (
                                <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                    <button onClick={() => changeInteresse(index, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                    <button onClick={() => changeInteresse(index, '-1')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            </div>

            <button onClick={proxPergunta}
                className='font-bold text-white font-montserrat p-3 px-5 bg-jornadas-blue rounded-lg m-5 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default ImageQuestion;
