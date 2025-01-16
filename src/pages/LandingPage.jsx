import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4 md:gap-7 p-5">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold">Cálculo Vocacional</h1>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold">Encontre o curso de exatas que combina com você!</h2>
            <p className="font-medium text-base md:text-lg lg:text-xl">Com este teste, você vai explorar suas habilidades, interesses e sonhos para descobrir o curso que tem tudo a ver com você!</p>
            <p className="font-medium text-base md:text-lg lg:text-xl">Ao final do teste, você poderá acessar a aula referente aos cursos mais alinhados com você, e salvar os resultados para rever depois! Boa sorte!</p>
            <Link
                to="/questions"
                className="
                        md:text-xl mt-7 w-48 sm:w-56 md:w-64 bg-jornadas-blue
                        rounded-lg text-black font-questrial font-semibold py-2 px-4 shadow-xg
                        focus:ring-2 focus:ring-white focus:ring-opacity-75 focus:outline-none 
                        transition-all hover:bg-jornadas-blue-dark hover:scale-110"
            >
                Vamos começar!
            </Link>
        </div>
    );
}

export default LandingPage;
