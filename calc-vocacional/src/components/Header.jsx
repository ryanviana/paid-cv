import Logo from '/react.svg'

function Header() {

    return (
        <nav className="bg-jornadas-blue py-1 px-6 shadow-lg flex justify-between items-center">
        
        <img src={Logo} alt="Logo Jornadas" className="h-5 md:h-10" />

        <h1 className="text-white text-1xl md:text-2xl font-montserrat font-bold text-center">
            Cálculo Vocacional
        </h1>
    </nav>
    );
}

export default Header;
