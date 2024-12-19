import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="
            w-full h-screen flex flex-col justify-center items-center
            bg-gradient-to-b from-[#353535] via-[#525252] to-[#353535] ">
            <div className="flex justify-center mt-0 mb-0">
                <img 
                    src="/jornadas-logo.png" 
                    alt="Logo" 
                    className="w-[80%] sm:w-[60%] md:w-[40%] max-w-[500px] object-contain"
                />
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className=
                        "font-montserrat font-bold text-4xl 
                        sm:text-5xl md:text-7xl text-white text-center mt-6">
                    Cálculo Vocacional
                </h1>
                <h2 className="font-questrial text-base sm:text-lg md:text-xl text-white text-center mt-2">
                    Descubra seu curso ideal
                </h2>
                <p className="mt-2 font-questrial text-sm sm:text-base md:text-lg text-white text-center">
                    Você está prestes a embarcar em uma{" "}
                    <span className="text-jornadas-blue font-bold">jornada</span> 
                    de autoconhecimento e descobertas
                </p>
                <Link 
                    to="/instructions"
                    className="
                        mt-7 w-48 sm:w-56 md:w-64 bg-jornadas-blue 
                        rounded-lg hover:bg-jornadas-blue-dark text-black 
                        font-questrial font-semibold py-2 px-4 shadow-xg focus:outline-none 
                        focus:ring-2 focus:ring-white focus:ring-opacity-75"
                >
                    Iniciar Teste
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
