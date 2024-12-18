import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col w-full items-center">
      <h1>LandingPage hehe</h1>
      <Link to="/instructions" className="bg-gray-300 p-3 w-fit">Ir para as Intruções</Link>
    </div>
  );
}

export default LandingPage;