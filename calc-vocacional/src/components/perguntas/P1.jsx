import { useState } from 'react'

import img0 from '/perg0-img0.jpeg'
import img1 from '/perg0_img1.jpeg'
import img2 from '/perg0_img2.jpeg'
import img3 from '/perg0_img3.jpeg'

const images = [
    { image: img0, label: 'Grandes construções' },
    { image: img1, label: 'Programação e computação' },
    { image: img2, label: 'Problemas teóricos' },
    { image: img3, label: 'Desenvolvimento sustentável' }
]

function P1({ setfaseAtual, faseAtual }) {

    // cada index se refere a uma imagem
    const [hover, setHover] = useState([false, false, false, false]);
    const [interesse, setInteresse] = useState(['', '', '', '']) // 1 - like <-> 0 - dislike
    

    const getBorderColor = (number) => {
        if (interesse[number] === "1") return "border-green-500 shadow-green-500 shadow-lg"
        if (interesse[number] === "0") return "border-red-600 shadow-red-600 shadow-lg"
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

    const proxPergunta = () => {
        if (validacaoInteresse()) setfaseAtual(faseAtual + 1)
    }

    return (
        <div className='h-fit w-full flex flex-col justify-between items-center lg:h-full'>
            <div>
                <h2>Parte I - Preferência Visual </h2>
                <h3>Selecione os campos de atuação que mais  te interessar e menos te interessar</h3>
            </div>
            <div className='flex justify-center text-center items-center'>
                <div className="grid grid-cols-1 gap-y-8 h-full place-items-center lg:grid-cols-2">

                    {images.map((img, index) => (
                        <div key={index} className={`relative group w-1/2 border-2 ${getBorderColor(index)}`} onMouseEnter={() => changeHover(index)} onMouseLeave={() => changeHover(index)}>

                            <img src={img['image']} alt={img['label']} className={`w-full h-full object-cover transition duration-200 ${hover[index] ? "blur-md" : "blur-0"}`} />
                            {hover[index] && (
                                <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                    <button onClick={() => changeInteresse(index, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                    <button onClick={() => changeInteresse(index, '0')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            </div>

            <button onClick={proxPergunta}
                className='p-1 px-5 bg-gray-300 rounded-lg m-5 transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default P1;
