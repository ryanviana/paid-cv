import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-10">
      <h1>HOME</h1>
      <Link to="/calculoVocacional" className="bg-gray-300 p-3 w-fit">Ir para a Landing Page</Link>
    </div>
  );
}

export default Home;