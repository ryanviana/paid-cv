import { useState } from 'react'

import img0 from '/perg0-img0.jpeg'
import img1 from '/perg0_img1.jpeg'
import img2 from '/perg0_img2.jpeg'
import img3 from '/perg0_img3.jpeg'

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
        <div className='h-full w-full'>
            <h2>Parte I - Preferência Visual </h2>
            <h3>Selecione os campos de atuação que mais  te interessar e menos te interessar</h3>
            <div className='flex justify-center text-center items-center'>
                <div className="grid grid-cols-1 gap-y-8 h-full place-items-center md:grid-cols-2">
                    <div className={`relative group w-1/2 border-2 ${getBorderColor(0)}`} 
                        onMouseEnter={() => changeHover(0)} onMouseLeave={() => changeHover(0)}>

                        <img src={img0} alt="Grandes construções"
                            className={`w-full h-full object-cover transition duration-300 ${hover[0] ? "blur-md" : "blur-0"}`}/>
                        {hover[0] && (
                            <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                <button onClick={() => changeInteresse(0, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                <button onClick={() => changeInteresse(0, '0')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                            </div>
                        )}

                    </div>
                    <div className={`relative group w-1/2 border-2 ${getBorderColor(1)}`} 
                        onMouseEnter={() => changeHover(1)} onMouseLeave={() => changeHover(1)}>

                        <img src={img1} alt="Programação e computação"
                            className={`w-full h-full object-cover transition duration-300 ${hover[1] ? "blur-md" : "blur-0"}`}/>
                        {hover[1] && (
                            <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                <button onClick={() => changeInteresse(1, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                <button onClick={() => changeInteresse(1, '0')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                            </div>
                        )}
                        
                    </div>
                    <div className={`relative group w-1/2 border-2 ${getBorderColor(2)}`} 
                        onMouseEnter={() => changeHover(2)} onMouseLeave={() => changeHover(2)}>

                        <img src={img2} alt="Problemas teóricos"
                            className={`w-full h-full object-cover transition duration-300 ${hover[2] ? "blur-md" : "blur-0"}`}/>
                        {hover[2] && (
                            <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                <button onClick={() => changeInteresse(2, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                <button onClick={() => changeInteresse(2, '0')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                            </div>
                        )}
                        
                    </div>
                    <div className={`relative group w-1/2 border-2 ${getBorderColor(3)}`} 
                        onMouseEnter={() => changeHover(3)} onMouseLeave={() => changeHover(3)}>

                        <img src={img3} alt="Desenvolvimento sustentável"
                            className={`w-full h-full object-cover transition duration-300 ${hover[3] ? "blur-md" : "blur-0"}`}/>
                        {hover[3] && (
                            <div className="absolute inset-0 flex items-center justify-center space-x-4">
                                <button onClick={() => changeInteresse(3, '1')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"> Interesso </button>

                                <button onClick={() => changeInteresse(3, '0')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"> Não interesso </button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            <button onClick={proxPergunta}
                className='p-1 bg-gray-300 rounded-lg m-5'>
                Próxima Pergunta
            </button>
        </div>
    );
}

export default P1;
