import Grafico from "../components/Grafico";

function ResultFront({ updatePerguntaAtual, pontuacaoTotal, type }) {

    return (
        <div className="w-full h-full flex flex-col justify-between items-center mb-10">
            <div className="flex justify-center text-center items-center h-full w-full">
                <Grafico pontuacaoTotal={pontuacaoTotal} type={type} />
            </div>

            <button onClick={() => updatePerguntaAtual()}
                className='px-5 bg-gray-300 rounded-lg transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>

    );
}

export default ResultFront;