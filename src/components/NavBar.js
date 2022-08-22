import './NavBar.css';
import logo from './../logo_b_t.png';
const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <a href="#"><img src={logo} alt="log" /></a>
            </div>
            <div className='menu'>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Tienda</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Tallas</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">¿Quienes Somos?</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Encuéntranos</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Contacto</a>
                    </li>                                
                </ul>
            </div>
            <div className='login'>
                <button><a href="#">Login</a></button>
            </div>
        </div>
    );
};

export default NavBar;