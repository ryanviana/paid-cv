import React, { useState, useEffect } from "react";
import axios from "axios";


function ResultBack({ updatePerguntaAtual, pontuacaoTotal, type }) {

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchPlot = async () => {

            try {
                const response = await axios.post("http://3.12.246.4:4000/generate-plot", {
                    score: pontuacaoTotal,
                    result_type: type
                });
                setImage(response.data.image);
                
            } catch (error) {
                console.error("Erro ao gerar o gráfico:", error);
            }
        };

        fetchPlot();
    }, []);

    return (
        <div className="w-full flex flex-col justify-between items-center">
            <h1>Resultados hehe</h1>

            {image && (
                <div className="flex justify-center text-center items-center h-full">
                    <img src={`data:image/png;base64,${image}`} alt="Gráfico de resultado" />
                </div>
            )}

            <button onClick={() => updatePerguntaAtual()}
                className='px-5 bg-gray-300 rounded-lg transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>

    );
}

export default ResultBack;