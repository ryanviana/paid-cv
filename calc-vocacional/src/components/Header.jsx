import Logo from '/react.svg'

function Header() {

    return (
        <nav className='bg-gray-200'>
            <img src={Logo} alt="Logo Jornadas" />
            <h1>Cálculo Vocacional </h1>
        </nav>
    );
}

export default Header;
