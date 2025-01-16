import Logo from '/jornadas-logo-sem-bordas.png'

function Header() {

    return (
        <nav className="py-2 shadow-lg flex">

            <img src={Logo} alt="Logo Jornadas" className="h-7 md:h-10 px-3 md:px-5" />

            <h1 className="text-black text-1xl md:text-2xl font-montserrat text-center">
                <strong>Jornadas</strong> <i>Educação</i>
            </h1>
        </nav>
    );
}

export default Header;
