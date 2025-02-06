import PropTypes from 'prop-types';

function ExplicacaoSelect({ updatePagina }) {
	return (
		<div className="flex flex-col h-full items-center justify-center gap-6 lg:gap-10 px-12 w-full lg:w-2/3 xl:w-1/2">
			<h1 className="text-3xl md:text-5xl font-bold">Parte 2 - Avaliação de interesses</h1>
			<p className="text-lg md:text-2xl">Nesta etapa, você encontrará várias afirmações sobre diferentes temas. Escolha aquelas que mais têm a ver com você!</p>
			<p className="text-lg md:text-2xl"><strong>Importante: selecione exatamente 3 frases</strong> que mais se conectem com seus interesses.</p>

			<button onClick={() => updatePagina(1)}
				className="
						md:text-xl mt-7 w-48 sm:w-56 md:w-64 bg-jornadas-blue
                        rounded-lg text-black font-questrial font-semibold py-2 px-4 shadow-xg
                        focus:ring-2 focus:ring-white focus:ring-opacity-75 focus:outline-none 
                        transition-all hover:bg-jornadas-blue-dark hover:scale-110">
				Começar agora!
			</button>
		</div>

	);
}

ExplicacaoSelect.propTypes = {
    updatePagina: PropTypes.func.isRequired,
};

export default ExplicacaoSelect;