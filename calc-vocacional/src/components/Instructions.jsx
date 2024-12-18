import { Link } from "react-router-dom";

function Instructions() {
  return (
    <div className="flex flex-col w-full items-center">
      <h1>Instruções hehe</h1>
      <Link to="/questions" className="bg-gray-300 p-3 w-fit">Ir para as Perguntas</Link>
    </div>
  );
}

export default Instructions;