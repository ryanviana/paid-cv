import { Link } from 'react-router-dom';
import Logo from '/jornadas-logo-sem-bordas.png'

function Header() {

    return (
        <nav className="py-2 shadow-lg flex">

            <Link to="/">
                <img src={Logo} alt="Logo Jornadas" className="h-7 md:h-10 px-3 md:px-5" />
            </Link>

            <Link to="/">
                <h1 className="text-black text-1xl md:text-2xl font-montserrat text-center">
                    Método <strong>Decisão Exata</strong>
                </h1>
            </Link>
        </nav>
    );
}

export default Header;
