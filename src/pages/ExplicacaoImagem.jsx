function ExplicacaoImagem({ updatePerguntaAtual }) {
	return (
		<div className="flex flex-col h-full items-center justify-center gap-10 px-12 w-full lg:w-2/3 xl:w-1/2">
			<h1 className="text-3xl md:text-5xl font-bold">Parte 1 - Preferência visual</h1>
			<p className="text-lg md:text-2xl">Nesta etapa, você verá 4 imagens em cada pergunta. Seu desafio é simples: dizer quais delas mais despertam o seu interesse!</p>
			<p className="text-lg md:text-2xl">A primeira parte será sobre diferentes áreas de atuação. Já a segunda mostrará possíveis ambientes de trabalho. Vamos lá?</p>

			<button onClick={() => updatePerguntaAtual()}
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

export default ExplicacaoImagem;