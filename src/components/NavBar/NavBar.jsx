import './styles.css';
import logo from './../../logo_b_t.png';
import Menu from './../Menu/Menu';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = ({titulo, descripcion}) => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <a href="#" title={descripcion} className="titulo"><span>{titulo}</span><img src={logo} alt="log" /></a>
            </div>
            <div className='menu'>
                <ul className="navbar-nav">
                    <Menu menuName={'Inicio'} url={'/'} />                    
                    <Menu menuName={'Tienda'} url={'/'} />                    
                    <Menu menuName={'Tallas'} url={'/'} />                    
                    <Menu menuName={'¿Quienes Somos?'} url={'/'} />                    
                    <Menu menuName={'Encuéntranos'} url={'/'} />                    
                    <Menu menuName={'Contacto'} url={'/'} />                                                  
                </ul>
            </div>
            <div className='cart'>
                <CartWidget/>
            </div>
        </div>
    );
};

export default NavBar;