import { useState } from 'react';
import PropTypes from 'prop-types';

import Grafico from "../components/Grafico";
import Email from "./Email";
import areasConhecimento from '../data/areas_cursos.json'

function Result({ pontuacaoTotal, type, updatePagina }) {

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState(null);

    let button_content;
    if (type == 'total') {
        button_content = "Exportar resultados";
    } else {
        button_content = "Próxima pergunta";
    }

    // abre curso modal (popup)
    const openCourseModal = (curso) => {
        setCursoSelecionado(curso);
        setIsCourseModalOpen(true);
    };

    // fecha curso modal (popup) 
    const closeCourseModal = () => {
        setIsCourseModalOpen(false);
        setCursoSelecionado(null);
    };

    const handleButton = async () => {
        if (type === 'parcial') {
            updatePagina(1)
        } else {
            setIsExportModalOpen(true)
        }
    }

    // array com áreas e pontuações 
    const areasComPontuacao = areasConhecimento.map((area, index) => ({
        area,
        pontuacao: pontuacaoTotal[index],
    }));

    // ordenação em ordem decrescente 
    areasComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

    return (
        <div id='result_id' className="w-full h-auto flex flex-col justify-between items-center mb-10 p-4">
            <div>
                <h1 className="mt-5 text-black text-6xl font-bold font-montserrat">Resultados</h1>
                <h2 className="text-black text-3xl font-bold font-questrial">Pronto, seus resultados estão na mão!</h2>
            </div>
            <div className="flex justify-center text-center items-center h-[40%] w-[40%]">
                <Grafico pontuacaoTotal={pontuacaoTotal} type={type} />
            </div>

            { /* The code only shows if all question has ended */}
            {type === 'total' && (
                <>
                    <div className="mt-5 flex justify-center text-center items-center h-full w-full font-questrial">
                        <h1 className="text-2xl">Para aprender mais a respeito de cada área e se direcionar na plataforma, dê uma olhada no nosso guia: </h1>
                    </div>

                    <div className="mt-5 w-[98%]">
                        {areasComPontuacao.map((item, index) => (
                            <div key={index} className="mt-4 bg-cyan-50 py-5 px-12">
                                <h2 className="text-3xl font-bold text-black text-justify font-montserrat">{index + 1}. {item.area.area}</h2>
                                <ul className="mt-4 list-disc pl-5 text-justify">
                                    {item.area.cursos.map((curso, cursoIndex) => (
                                        <li key={cursoIndex} className="mb-4 text-justify">
                                            <span className="text-xl text-black font-bold font-montserrat">{curso.nome}</span>
                                            <p className="text-xl text-black font-questrial mt-2">{curso.resumo}</p>
                                            <p
                                                onClick={() => openCourseModal(curso)}
                                                className="text-xl font-bold text-blue-400 font-questrial mt-2 cursor-pointer"
                                            >
                                                Ver mais...
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </>
            )}


            <button onClick={handleButton}
                className='mt-5 mb-5 px-5 py-3 font-bold bg-jornadas-blue rounded-lg transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105'>
                {button_content}
            </button>

            {isCourseModalOpen && cursoSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-cyan-50 px-7 py-5 sm:px-12 sm:py-10 lg:px-20 lg:py-20 leading-relaxed hyphens-auto break-words text-base rounded-lg max-w-[70%] max-h-[90%] overflow-auto">
                        <h3 className="text-2xl font-bold text-black mb-4 font-montserrat">{cursoSelecionado.nome}</h3>
                        <p className="text-lg text-gray-700 mb-4 text-left sm:text-justify font-questrial">{cursoSelecionado.descricao}</p>

                        {/* cargos dentro do curso selecionado */}
                        <p className="text-lg text-black mb-4 text-left sm:text-justify font-bold font-montserrat">Cargos típicos para graduados em {cursoSelecionado.nome}</p>
                        <ul className="list-disc pl-6 mb-4 text-left sm:text-justify font-questrial">
                            {cursoSelecionado.cargos.map((cargo, index) => (
                                <li key={index} className="text-gray-700 text-lg">
                                    <strong>{cargo.cargo}:</strong> {cargo.descricao}
                                </li>
                            ))}
                        </ul>

                        {/* média salarial */}
                        <p className="text-lg text-justify">
                            <strong className="font-montserrat text-black">Média salarial: </strong>
                            <span className="font-questrial text-gray-700">{cursoSelecionado.media_salarial}</span>
                        </p>

                        {/* perfil do estudante */}
                        <p className="text-lg text-justify">
                            <strong className="font-montserrat text-black">Perfil do estudante: </strong>
                            <span className="font-questrial text-gray-700">{cursoSelecionado.perfil_estudante}</span>
                        </p>

                        {/* botão para fechar popup*/}
                        <button
                            onClick={closeCourseModal}
                            className='mt-5 px-5 py-3 bg-jornadas-blue rounded-lg transition-all duration-100 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105'
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {isExportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-cyan-50 w-[40%] px-7 py-5 sm:px-12 sm:py-10 leading-relaxed hyphens-auto break-words text-base rounded-lg *:max-h-[90%] overflow-auto">
                        <div className='flex flex-row content-between justify-between items-center'>
                            <div></div>
                            <h1 className='font-bold text-2xl'>Exportar Resultados</h1>
                            <button
                                onClick={() => setIsExportModalOpen(false)}
                                className='font-extrabold text-xl px-3 py-1 bg-gray-300 rounded-lg transition-all duration-100 ease-in-out hover:bg-gray-400 hover:scale-105'
                            >X</button>
                        </div>
                        <Email />
                    </div>
                </div>
            )}
        </div>
    )
}

Result.propTypes = {
    pontuacaoTotal: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    updatePagina: PropTypes.func.isRequired
};

export default Result;