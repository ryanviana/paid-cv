function P2({ setfaseAtual, faseAtual }) {


    return (
        <div>
            <h2>Pergunta 2</h2>
            <p>22222222222222222222222222222222222222222</p>
            <button onClick={() => setfaseAtual(faseAtual + 1)}
                className='p-1 bg-gray-300 rounded-lg m-5'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default P2;
