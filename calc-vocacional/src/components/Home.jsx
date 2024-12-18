import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      <h1>Home hehe</h1>
      <Link to="/landing" className="bg-gray-300 p-3 w-fit">Ir para a Landing Page</Link>
    </div>
  );
}

export default Home;