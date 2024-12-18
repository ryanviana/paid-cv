import { useState } from 'react'

const options = [
    "Me interesso por entender a interação de elementos a um nível atômico.",
    "Sinto facilidade em assistir a aulas e ensinar meus colegas.",
    "Entendo facilmente assuntos como álgebra e geometria.",
    "Me interesso pelas áreas de botânica e ecologia.",
    "Busco aprender sobre programação.",
    "Gosto de entender a interpretação física de fenômenos.",
    "Tenho curiosidade sobre como máquinas e dispositivos fun   cionam.",
    "Me interesso em usar a tecnologia para construir algo novo, como aplicativos ou dispositivos.",
];

function P2({ setperguntaAtual, perguntaAtual }) {

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

    const proxPergunta = () => {
        if (validacaoNumFrases()) setperguntaAtual(perguntaAtual + 1)
    }


    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            <div>
                <h2>Parte 2 - Avaliação de interesses </h2>
                <h3>Escolha as três frases com as quais você mais se identifica</h3>
            </div>

            <div className='flex flex-col gap-5 items-start w-fit text-2xl'>
                
                <h1 className='font-bold text-3xl'>Durante a escola, eu:</h1>

                {options.map((label, index) => (
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

export default P2;
