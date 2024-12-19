
function Result({ updatePerguntaAtual, pontuacaoTotal, type }) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1>Resultados hehe</h1>

      <button onClick={() => updatePerguntaAtual()}
        className='p-1 px-5 bg-gray-300 rounded-lg m-5 transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'>
        Próxima Pergunta
      </button>
    </div>

  );
}

export default Result;