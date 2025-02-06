import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4 md:gap-7 p-5">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold">Cálculo Vocacional</h1>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold">Encontre o curso de exatas ideal para você!</h2>
            <div className="space-y-2">
                <p className="font-medium text-base md:text-lg lg:text-xl">✅ Explore as diferentes áreas e carreiras;</p>
                <p className="font-medium text-base md:text-lg lg:text-xl">✅ Insira suas habilidades, interesses e sonhos;</p>
                <p className="font-medium text-base md:text-lg lg:text-xl">✅ E receba um mapa dos cursos de exatas que mais combinam com você.</p>
            </div>

            <Link
                to="/questions"
                className="
                        md:text-xl mt-7 w-48 sm:w-56 md:w-64 bg-jornadas-blue
                        rounded-lg text-black font-questrial font-semibold py-2 px-4 shadow-xg
                        focus:ring-2 focus:ring-white focus:ring-opacity-75 focus:outline-none 
                        transition-all hover:bg-jornadas-blue-dark hover:scale-110"
            >
                Quero começar!
            </Link>
        </div>
    );
}

export default LandingPage;
