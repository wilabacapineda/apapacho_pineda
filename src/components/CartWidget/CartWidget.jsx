import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './../../context/CartContext'

import './styles.css'

const CartWidget = () => {  
  const {totalCartCount,idToken} = useContext(CartContext)
  return (        
      <div className="cartWidget">
          <Link to='/users/login'  >
            <img className="cartIcon" id={ localStorage.getItem('user') ? "imagenUsuario" : "usuario" } src={ localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).photoURL : UserIcon } alt="Icono de Usuario"/>
          </Link>          
          {totalCartCount > 0 && (
            <Link to='/cart' className='cartWidget'>
              <img className="cartIcon" src={CartIcon} alt="Icono de Carro" />
              <span id="cartNumber"><CartNumber /></span>
            </Link>
            )
          }                   
      </div>
  )
}
export default CartWidget