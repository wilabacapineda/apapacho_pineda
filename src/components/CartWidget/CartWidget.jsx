import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import {Link} from 'react-router-dom'

import './styles.css'

const CartWidget = () => {  
  return (    
    
      <div className="cartWidget">  
          <img className="cartIcon" id="usuario" src={UserIcon} alt="Icono de Usuario"/>
          <Link to='/carrito' className='cartWidget'>
            <img className="cartIcon" src={CartIcon} alt="Icono de Carro" />
            <span id="cartNumber"><CartNumber /></span>
          </Link>         
      </div>
    
    
  )
}

export default CartWidget