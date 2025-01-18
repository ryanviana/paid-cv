import { useState } from 'react'

// defines importantes
import * as Defines from '../data/Defines';

function ImageQuestion({ weight_question, statement_question, updatePerguntaAtual }) {

    const [hover, setHover] = useState([false, false, false, false]);
    const [interesse, setInteresse] = useState(['', '', '', '']); // 1 - like <-> -1 - dislike  
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal

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
            setIsModalOpen(true);
            return false;
        }
        return true
    }

    const calculaPontuacaoQuestao = () => {
        let pontuacao = Array(Defines.numAreas).fill(0)
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

        updatePerguntaAtual(pontuacao, 1)
    }

    // Modal Component
    const AlertModal = ({ isOpen, onClose, message }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-[80%] lg:w-1/3">
                    <h3 className="text-xl font-semibold text-center text-gray-800">Atenção!</h3>
                    <p className="text-center text-gray-600 mt-4">{message}</p>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={onClose}
                            className="bg-jornadas-blue text-white px-6 py-2 rounded-lg shadow-lg hover:bg-jornadas-blue-dark transition duration-200"
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-7 h-auto w-full flex flex-col justify-between items-center lg:h-auto">
            <div>
                <h2 className="font-montserrat text-black font-semibold text-lg md:text-xl lg:text-2xl">{statement_question['title']}</h2>
            </div>
            <div className="flex justify-center text-center items-center mt-5">
                <div className="grid grid-cols-1 gap-y-8 h-full place-items-center lg:grid-cols-2">
                    {statement_question['images'].map((img, index) => (
                        <div key={index} className='h-[90%] flex flex-col items-center gap-3 lg:gap-0'>
                            <div className={`relative group w-[70%] lg:w-1/2 border-2 ${getBorderColor(index)}`} onMouseEnter={() => changeHover(index)} onMouseLeave={() => changeHover(index)}>

                                <img src={img['image']} alt={img['label']} className={`w-full h-full object-cover transition duration-200 ${hover[index] ? "blur-lg" : "blur-0"}`} />
                                {hover[index] && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                                        <p className='hidden lg:block font-bold text-lg text-white bg-opacity-25 bg-black py-1 px-3 rounded-3xl'>{img['label']}</p>
                                        <div className='flex flex-col lg:flex-row items-center gap-5'>
                                            <button onClick={() => changeInteresse(index, '1')} className="bg-green-500 hover:bg-green-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded shadow"> Interesso </button>
                                            <button onClick={() => changeInteresse(index, '-1')} className="bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded shadow"> Não interesso </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className='block lg:hidden font-medium bg-gray-100 rounded-3xl py-1 px-3'>{img['label']}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-3 lg:gap-5'>
                <button onClick={() => updatePerguntaAtual(null, -1)}
                    className="font-semibold lg:font-bold text-white font-montserrat py-2 lg:py-3 px-2 md:px-3 lg:px-5 mt-12 bg-jornadas-blue rounded-lg lg:mt-10 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105">
                    Voltar Pergunta
                </button>
                <button onClick={proxPergunta}
                    className="font-semibold lg:font-bold text-white font-montserrat p-2 lg:p-3 px-2 md:px-3 lg:px-5 mt-12 bg-jornadas-blue rounded-lg lg:mt-10 transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105">
                    Próxima Pergunta
                </button>
            </div>

            <AlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message="Necessário votar em todas as fotos."
            />
        </div>
    );
}

export default ImageQuestion;
