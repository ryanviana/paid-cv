import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div class="w-full h-screen bg-jornadas-blue flex flex-col items-center  bg-gradient-to-b from-[#353535] via-[#525252] to-[#353535]">
            <div className="mt-28 flex flex-col w-full items-center">
                <div className='flex justify-center'>
                    <img 
                        src='/jornadas-logo.png' 
                        alt='Logo' 
                        className='max-w-[400px] max-h-[400px] object-contain ' 
                    />
                </div>        
                
                <h1 class="font-montserrat font-bold text-7xl text-white" >Cálculo Vocacional</h1>
                <h1 class="font-questrial text-lg text-white">Descubra seu curso ideal</h1>
                    <h1 class="mt-2 font-questrial text-lg text-white">
                    Você está prestes a embarcar em uma <span class="text-jornadas-blue font-bold">jornada </span> 
                    de autoconhecimento e descobertas
                </h1>     
                <Link 
                    to="/instructions"
                    className="
                        mt-7 w-64 font-questrial bg-jornadas-blue 
                        rounded-lg hover:bg-jornadas-blue-dark text-black 
                        font-semibold py-2 px-4 shadow-xg focus:outline-none 
                        focus:ring-2 focus:ring-white focus:ring-opacity-75"
                >
                    Iniciar Teste
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
