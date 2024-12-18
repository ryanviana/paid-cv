import { Link } from "react-router-dom";


function P3() {

    return (
        <div className="h-fit w-full flex flex-col justify-between items-center lg:h-full">
            <h1>Ultima questão hehe</h1>
            <Link to="/results" className="bg-gray-300 p-3 w-fit">Ir para os resultados</Link>
        </div>
    );
}

export default P3;
