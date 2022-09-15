import './styles.css';
import logo from './../../logo_b_t.png';
import Menu from './../Menu/Menu';
import CartWidget from '../CartWidget/CartWidget';
import {NavLink} from 'react-router-dom'

const NavBar = ({titulo, descripcion, totalCartCount, setTotalCartCount}) => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <NavLink to={'/'} title={descripcion} className="titulo"><span>{titulo}</span><img src={logo} alt="log" /></NavLink>            
            </div>
            <div className='menu'>
                <ul className="navbar-nav">
                    <Menu menuName={'Inicio'} url={'/'} />                    
                    <Menu menuName={'Tienda'} url={'/tienda'} />
                    <Menu menuName={'Poleron con Capucha'} url={'/tienda/categoria/poleron-capucha'} />   
                    { /*}                 
                    <Menu menuName={'Tallas'} url={'/'} />                    
                    <Menu menuName={'¿Quienes Somos?'} url={'/'} />                    
                    <Menu menuName={'Encuéntranos'} url={'/'} />                    
                    <Menu menuName={'Contacto'} url={'/'} />                                                  
                    */ }
                </ul>
            </div>
            <div className='cart'>
                <CartWidget totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} />
            </div>
        </div>
    );
};

export default NavBar;