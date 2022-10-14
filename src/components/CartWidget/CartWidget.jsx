import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './../../context/CartContext'

import './styles.css'

const CartWidget = () => {  
  const {totalCartCount, userBool} = useContext(CartContext)
  return (        
      <div className="cartWidget">
          <Link to='/users'  >
            <span className='cartUser'>
              <img className="cartUserImage" id="usuario" src={ UserIcon } alt="user icon" title={ userBool ? `Hola, ${JSON.parse(localStorage.getItem('user')).displayName}` : "Iniciar Sesión"} />
              <span className='cartUserName'>{ userBool && `Hola, ${JSON.parse(localStorage.getItem('user')).displayName.substring(0,JSON.parse(localStorage.getItem('user')).displayName.indexOf(" "))}`}</span>
            </span>       
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