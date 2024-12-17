function P3({ setfaseAtual, faseAtual }) {


    return (
        <div>
            <h2>Pergunta 3</h2>
            <p>3333333333333333333333333333333333</p>
            <button onClick={() => setfaseAtual(faseAtual + 1)}
                className='p-1 bg-gray-300 rounded-lg m-5'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default P3;
